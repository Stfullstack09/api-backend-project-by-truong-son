import express from 'express';
import APIUserController from '../controller/APIUserController';
import APIAllCodeController from '../controller/APIAllCodeController';
import APIDoctorController from '../controller/APIDoctorController';
import APIPatientController from '../controller/APIPatientController';
import APISpeciatlyController from '../controller/APISpeciatlyController';
import APIClinicController from '../controller/APIClinicController';
import APISiteController from '../controller/APISiteController';
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
    router.get('/get-info-doctor-markdowns', APIDoctorController.getInfoDoctorMarkDownByID);
    router.post('/bulk-create-schedule', APIDoctorController.bulkCreateSchedule);
    router.get('/get-schedule-doctor-by-date', APIDoctorController.getScheduleDoctorByDate);
    router.get('/get-extra-doctor-info-by-id', APIDoctorController.getExtraDoctorInfoByID);
    router.get('/get-profile-doctor-by-id', APIDoctorController.getProfileDoctorByID);
    router.post('/api-send-remedy', APIDoctorController.SenRemedy);

    // manage - patient
    router.get('/get-list-patient-for-doctor', APIDoctorController.getListPatientForDoctor);

    // patient booking

    router.post('/patient-booking-appointment', APIPatientController.postBookAppointment);

    // send email

    // verify email

    router.post('/verify-booking', APIPatientController.VerifyBookAppointment);

    //specialty booking

    router.post('/create-specialty-booking', APISpeciatlyController.CreateSpeciatlyBooking);
    router.get('/get-limit-all-speciatly', APISpeciatlyController.getLimitAllSpeciatly);
    router.get('/get-details-speciatly-by-id', APISpeciatlyController.getDetailSpeciatlyById);

    // clinic

    router.post('/create-new-clinic', APIClinicController.CreateNewClinic);
    router.post('/save-clinic-edit', APIClinicController.saveClinicEdit);
    router.get('/get-limit-all-clinic', APIClinicController.getLimitAllClinic);
    router.get('/get-details-clinic-by-id', APIClinicController.getDetailClinicById);

    // sites
    router.post('/create-site', APISiteController.CreateNewSite);
    router.get('/get-all-site', APISiteController.getAllSite);
    router.get('/get-details-site-by-id', APISiteController.getDetailSiteById);

    return app.use('/api/v1', router);
};

export default initAPIRoute;
