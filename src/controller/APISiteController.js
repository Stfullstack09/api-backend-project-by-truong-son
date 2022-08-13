import SiteService from '../services/SiteService';

class APISiteController {
    async CreateNewSite(req, res, next) {
        try {
            const data = await SiteService.CreateNewSite(req.body);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                errMessage: 'error from server',
            });
        }
    }

    async getAllSite(req, res, next) {
        try {
            const data = await SiteService.getAllSite(req.query.type);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                errMessage: 'error from server',
            });
        }
    }

    async getDetailSiteById(req, res, next) {
        try {
            const data = await SiteService.getDetailSiteById(req.query.type, req.query.id);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errCode: -1,
                errMessage: 'error from server',
            });
        }
    }
}

export default new APISiteController();
