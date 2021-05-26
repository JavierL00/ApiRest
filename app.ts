import dotenv from 'dotenv';
import Server from './models/server';

// Condifurar dot.env
dotenv.config();

const server = new Server();

server.listen();