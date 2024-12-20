import ClinicService from '../services/ClinicService';

class APIClinicController {
    async CreateNewClinic(req, res, next) {
        try {
            const data = await ClinicService.CreateNewClinic(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Error from server',
            });
        }
    }

    async saveClinicEdit(req, res, next) {
        try {
            const data = await ClinicService.saveClinicEdit(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Error from server',
            });
        }
    }

    async getLimitAllClinic(req, res, next) {
        try {
            const data = await ClinicService.getLimitAllClinic(req.query.limit);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server',
            });
        }
    }

    async getDetailClinicById(req, res, next) {
        try {
            const data = await ClinicService.getDetailClinicById(req.query.id);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Error from server',
            });
        }
    }
}

export default new APIClinicController();
