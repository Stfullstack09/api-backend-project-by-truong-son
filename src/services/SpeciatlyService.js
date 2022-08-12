import db from '../models';

class SpeciatlyService {
    CreateSpeciatlyBooking(data) {
        return new Promise(async function (resolve, reject) {
            try {
                if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkDown) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters',
                    });
                } else {
                    await db.specialty.create({
                        name: data.name,
                        image: data.imageBase64,
                        descriptionHTML: data.descriptionHTML,
                        descriptionMarkDown: data.descriptionMarkDown,
                    });

                    return resolve({
                        errCode: 0,
                        errMessage: ' Successfully',
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default new SpeciatlyService();
