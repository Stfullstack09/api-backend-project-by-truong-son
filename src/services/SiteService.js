import db from '../models';

class SiteService {
    async CreateNewSite(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.case || !data.contentHTML || !data.contentMarkdown || !data.name || !data.image) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameter',
                    });
                } else {
                    await db.Site.create({
                        case: data.case,
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        name: data.name,
                        image: data.image,
                    });

                    return resolve({
                        errCode: 0,
                        errMessage: 'Successfully',
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async getAllSite(type) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!type) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameter',
                    });
                }

                const data = await db.Site.findAll({
                    where: {
                        case: type,
                    },
                });

                if (data && data.length > 0) {
                    return resolve({
                        errCode: 0,
                        errMessage: 'Successfully',
                        data,
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async getDetailSiteById(type, id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!type || !id) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameter',
                    });
                }

                const data = await db.Site.findOne({
                    where: {
                        case: type,
                        id: id,
                    },
                });

                return resolve({
                    errCode: 0,
                    errMessage: 'Successfully',
                    data,
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default new SiteService();
