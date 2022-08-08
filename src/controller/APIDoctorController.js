import USERServices from '../services/USERServices';

import doctorService from '../services/doctorService';

class APIDoctorController {
    async getTopDoctorHome(req, res, next) {
        let limit = req.query.limit || 10;
        ('Nếu không truyền lên lấy bằng 10');

        try {
            const doctor = await doctorService.getTopDoctorHome(+limit);

            return res.status(200).json(doctor);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                errMessage: 'Error From server',
            });
        }
    }

    async getAllDoctor(req, res, next) {
        try {
            const doctor = await doctorService.getAllDoctorSerVice();

            res.status(200).json(doctor);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                errMessage: 'Error From server',
            });
        }
    }

    async postInfoDoctor(req, res, next) {
        try {
            const Res = await doctorService.saveInfoDoctor(req.body);

            return res.status(200).json(Res);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                errMessage: 'Error From server',
            });
        }
    }

    async getInfoDoctorByID(req, res, next) {
        try {
            const data = await doctorService.getInfoDoctorByID(req.query.id);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                errMessage: 'Error From server',
            });
        }
    }
}

export default new APIDoctorController();
