import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('User', {
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    celular: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    tableName: 'users'
});

export default User;