import SpeciatlyService from '../services/SpeciatlyService';

class APISpeciatlyController {
    async CreateSpeciatlyBooking(req, res, next) {
        try {
            const data = await SpeciatlyService.CreateSpeciatlyBooking(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server',
            });
        }
    }

    async getLimitAllSpeciatly(req, res, next) {
        try {
            const data = await SpeciatlyService.GetLimitAllSpeciatly(req.query.limit);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server',
            });
        }
    }

    async getDetailSpeciatlyById(req, res, next) {
        try {
            const data = await SpeciatlyService.getDetailSpeciatlyById(req.query.id, req.query.location);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server',
            });
        }
    }
}

export default new APISpeciatlyController();
