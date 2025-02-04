import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface RoleAttributes {
  id?: number;
  roleName?: string | null;
  active?: boolean | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleInput extends Optional<RoleAttributes, "id"> {}
export interface RoleOutput extends Required<RoleAttributes> {}

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  public id!: number;
  public roleName!: string;
  public active!: boolean;

  public readonly createdAt?: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
      get() {
        const value = this.getDataValue("id");
        return value === null ? null : Number(value);
      },
    },
    roleName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    active: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

export default Role;
