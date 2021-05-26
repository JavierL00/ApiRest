import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Post = db.define('Post', {
    titulo: {
        type: DataTypes.STRING
    },
    contenido: {
        type: DataTypes.STRING
    },
    imagen: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER
    },
});

export default Post;