import express from 'express';
import APIUserController from '../controller/APIUserController';
import APIAllCodeController from '../controller/APIAllCodeController';
const router = express.Router();

const initAPIRoute = (app) => {
    router.get('/get-all-users', APIUserController.handleGetAllUsers);
    router.post('/login', APIUserController.handleLogin);
    router.post('/create-new-user', APIUserController.handleCreateNewUser);
    router.put('/edit-user', APIUserController.handleEditUser);
    router.delete('/delete-user', APIUserController.handleDeleteUser);

    // all code
    router.get('/all/code', APIAllCodeController.getAllCode);

    return app.use('/api/v1', router);
};

export default initAPIRoute;
