import express from 'express';
import APIController from '../controller/APIController';
const router = express.Router()

const initAPIRoute = (app) => {
    router.get('/',  APIController.getAllUsers)

    return app.use(router)
}

export default initAPIRoute