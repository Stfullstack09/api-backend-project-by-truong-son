import express from 'express';
import SiteController from '../controller/SiteController';
const router = express.Router()

const initWebRoute = (app) => {
    router.get('/',  SiteController.getHomePage)

    return app.use('/', router)
}

export default initWebRoute