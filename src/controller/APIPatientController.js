import PatientServices from '../services/PatientServices';

class APIPatientController {
    async postBookAppointment(req, res, next) {
        try {
            const data = await PatientServices.postBookAppointment(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: 1,
                errMessage: 'Error from server',
            });
        }
    }
}

export default new APIPatientController();
