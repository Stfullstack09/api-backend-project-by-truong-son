import express from 'express';
import SiteController from '../controller/SiteController';
const router = express.Router()

const initWebRoute = (app) => {
    router.post('/post-crud',  SiteController.createUserPOSTCRUD)
    router.get('/',  SiteController.getHomePage)
    router.get('/crud',  SiteController.getCRUD)

    return app.use('/', router)
}

export default initWebRoute