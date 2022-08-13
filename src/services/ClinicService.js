import db from '../models';

class ClinicService {
    async CreateNewClinic(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    !data.name ||
                    !data.imageBase64 ||
                    !data.descriptionHTML ||
                    !data.descriptionMarkDown ||
                    !data.address
                ) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters',
                    });
                } else {
                    await db.clinnic.create({
                        name: data.name,
                        image: data.imageBase64,
                        descriptionHTML: data.descriptionHTML,
                        descriptionMarkDown: data.descriptionMarkDown,
                        address: data.address,
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

    async saveClinicEdit(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    !data.id ||
                    !data.name ||
                    !data.imageBase64 ||
                    !data.descriptionHTML ||
                    !data.descriptionMarkDown ||
                    !data.address
                ) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters',
                    });
                } else {
                    const Check = await db.clinnic.findOne({
                        where: {
                            id: data.id,
                        },
                    });

                    if (Check) {
                        await db.clinnic.update(
                            {
                                id: data.id,
                                name: data.name,
                                image: data.imageBase64,
                                descriptionHTML: data.descriptionHTML,
                                descriptionMarkDown: data.descriptionMarkDown,
                                address: data.address,
                            },
                            {
                                where: {
                                    id: data.id,
                                },
                            },
                        );

                        return resolve({
                            errCode: 0,
                            errMessage: 'Update Successfully',
                        });
                    } else {
                        return resolve({
                            errCode: 1,
                            errMessage: ' Cound Update Successfully',
                        });
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default new ClinicService();
