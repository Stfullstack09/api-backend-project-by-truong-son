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

    async getInfoDoctorMarkDownByID(req, res, next) {
        try {
            const data = await doctorService.getInfoDoctorMarkDownByID(req.query.id);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                errMessage: 'Error From server',
            });
        }
    }

    async bulkCreateSchedule(req, res, next) {
        try {
            const data = await doctorService.bunkCreateSchedule(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                errMessage: 'Error From server',
            });
        }
    }

    async getScheduleDoctorByDate(req, res, next) {
        try {
            const data = await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                errMessage: 'Error From server',
            });
        }
    }

    async getExtraDoctorInfoByID(req, res) {
        try {
            const data = await doctorService.getExtraDoctorInfoByID(req.query.doctorId);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                errMessage: 'Error From server',
            });
        }
    }

    async getProfileDoctorByID(req, res) {
        try {
            const data = await doctorService.getProfileDoctorByID(req.query.doctorId);

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
