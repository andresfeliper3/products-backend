import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false,
  }
);
