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

    async getLimitAllClinic(limit) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!limit) {
                    limit = 20;
                }

                let Limit = Number(limit);

                let data = await db.clinnic.findAll({
                    limit: Limit,

                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                });

                let Result;

                if (data && data.length > 0) {
                    Result = data.map((item) => {
                        item.image = Buffer.from(item.image, 'base64').toString('binary');
                        return item;
                    });
                }

                return resolve({
                    errCode: 0,
                    errMessage: 'Successfully',
                    data: Result,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async getDetailClinicById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameter',
                    });
                } else {
                    let data = await db.clinnic.findOne({
                        where: {
                            id,
                        },

                        attributes: ['image', 'name', 'address', 'descriptionHTML', 'descriptionMarkDown'],
                    });

                    if (!data) {
                        data = {};
                    }

                    if (data) {
                        let DoctorSpecialty = [];

                        DoctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                clinicId: id,
                            },
                            attributes: ['doctorId', 'provinceId'],
                        });

                        if (DoctorSpecialty) {
                            data.doctorSpecialty = DoctorSpecialty;
                        } else {
                            data.doctorSpecialty = {};
                        }
                    }

                    return resolve({
                        errCode: 0,
                        errMessage: ' Successfully',
                        data,
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default new ClinicService();
