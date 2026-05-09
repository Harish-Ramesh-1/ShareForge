import dotenv from 'dotenv';
import express from 'express';
import app from './app.js';
import { createServer } from 'http';
import connectDB from './Config/db.js';
import './Cron/deleteFiles.js';

dotenv.config();

const basePort = Number(process.env.PORT) || 5000;

connectDB();

const startServer = (port) => {
    const httpServer = createServer(app);

    httpServer.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.warn(`Port ${port} is busy, trying ${port + 1}...`);
            startServer(port + 1);
            return;
        }

        throw err;
    });

    httpServer.listen(port,() => {
        console.log(`The app is listening on ${port}`);
    });
};

startServer(basePort);