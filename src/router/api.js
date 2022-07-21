import express from 'express';
import APIUserController from '../controller/APIUserController';
const router = express.Router();

const initAPIRoute = (app) => {
    router.post('/login', APIUserController.handleLogin);

    return app.use('/api/v1/', router);
};

export default initAPIRoute;
