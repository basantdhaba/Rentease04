import { DataTypes, Model } from "sequelize"
import sequelize from "../lib/db"

class Property extends Model {
  public id!: number
  public title!: string
  public type!: string
  public bedrooms!: number
  public bathrooms!: number
  public area!: number
  public rent!: number
  public location!: string
  public pinCode!: string
  public nearbyPlaces!: string[]
  public interestedTenants!: number
  public youtubeLink?: string
  public availableFrom!: Date
  public liftAvailable!: boolean
  public furnishingStatus!: string
  public furnishings?: object
  public tenantPreferences!: object
  public acceptableReligions!: string[]
  public additionalFacilities!: object
  public ownerWhatsApp!: string
}

Property.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    rent: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nearbyPlaces: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    interestedTenants: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    youtubeLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availableFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    liftAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    furnishingStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    furnishings: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    tenantPreferences: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    acceptableReligions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    additionalFacilities: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    ownerWhatsApp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "properties",
    sequelize,
  },
)

export default Property

