import { DataTypes, Model } from "sequelize"
import sequelize from "../lib/db"

class User extends Model {
  public id!: number
  public name!: string
  public email!: string
  public password!: string
  public role!: "user" | "admin"
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    sequelize,
  },
)

export default User

