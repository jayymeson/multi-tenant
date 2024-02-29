import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

interface UserAttributes {
  name: string;
  email: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public name!: string;
  public email!: string;
}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;
