import express, { Router } from 'express';
import userRoutes from '../routes/user';
import postRoutes from '../routes/post';
import cors from 'cors';

import db from '../db/connection';

class Server {

    private app: express.Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        posts: '/api/posts'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Database Connection
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async dbConnection() {
        try {

            await db.authenticate();
            console.log('Database is online');

        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Body read
        this.app.use(express.json());

        // Public folder
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.posts, postRoutes)

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }

}

export default Server;