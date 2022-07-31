import USERServices from '../services/USERServices';

class APIAllCodeController {
    async getAllCode(req, res, next) {
        try {
            const data = await USERServices.getAllCodeServices(req.query.type);

            return res.status(200).json(data);
        } catch (error) {
            console.log('Get All Code error:', error);

            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server',
            });
        }
    }
}

export default new APIAllCodeController();
