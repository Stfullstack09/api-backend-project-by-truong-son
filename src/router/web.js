import express from 'express';
import SiteController from '../controller/SiteController';
const router = express.Router();

const initWebRoute = (app) => {
    router.get('/delete-crud', SiteController.deleteCRUD);
    router.post('/put-crud/:id', SiteController.updateUser);
    router.get('/edit-crud', SiteController.getEditCRUD);
    router.post('/post-crud', SiteController.createUserPOSTCRUD);
    router.get('/', SiteController.getHomePage);
    router.get('/crud', SiteController.getCRUD);
    router.get('/get-crud', SiteController.displayGetCRUD);

    return app.use('/', router);
};

export default initWebRoute;
