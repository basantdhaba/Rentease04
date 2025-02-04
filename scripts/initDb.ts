import sequelize from "../lib/db"
import User from "../models/User"
import Property from "../models/Property"
import bcrypt from "bcryptjs"

async function initDb() {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")

    // Sync all models
    await User.sync({ alter: true })
    await Property.sync({ alter: true })

    console.log("Database synchronized successfully.")

    // Add some initial data if needed
    // For example, create an admin user
    const hashedPassword = await bcrypt.hash("admin123", 10)
    await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    })

    console.log("Initial data added successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  } finally {
    await sequelize.close()
  }
}

initDb()

