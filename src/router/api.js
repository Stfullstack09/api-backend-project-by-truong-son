import express from 'express';
import APIUserController from '../controller/APIUserController';
import APIAllCodeController from '../controller/APIAllCodeController';
import APIDoctorController from '../controller/APIDoctorController';
const router = express.Router();

const initAPIRoute = (app) => {
    router.get('/get-all-users', APIUserController.handleGetAllUsers);
    router.post('/login', APIUserController.handleLogin);
    router.post('/create-new-user', APIUserController.handleCreateNewUser);
    router.put('/edit-user', APIUserController.handleEditUser);
    router.delete('/delete-user', APIUserController.handleDeleteUser);

    // all code
    router.get('/all/code', APIAllCodeController.getAllCode);

    // home doctor

    router.get('/top/doctor-home', APIDoctorController.getTopDoctorHome);
    router.get('/get-all-doctor', APIDoctorController.getAllDoctor);
    router.post('/save-info-doctor', APIDoctorController.postInfoDoctor);
    router.get('/get-info-doctor', APIDoctorController.getInfoDoctorByID);

    return app.use('/api/v1', router);
};

export default initAPIRoute;
