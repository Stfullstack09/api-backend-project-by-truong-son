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

    async GetLimitAllSpeciatly(limit) {
        return new Promise(async function (resolve, reject) {
            try {
                if (!limit) {
                    limit = 10;
                }

                let Limit = Number(limit);

                let data = await db.specialty.findAll({
                    limit: Limit,

                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                    raw: false,
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

    async getDetailSpeciatlyById(id, location) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id || !location) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters',
                    });
                } else {
                    let data = await db.specialty.findOne({
                        where: {
                            id,
                        },

                        attributes: ['descriptionHTML', 'descriptionMarkDown'],
                    });

                    if (!data) {
                        data = {};
                    }

                    if (data) {
                        let DoctorSpecialty = [];

                        if (location === 'All') {
                            DoctorSpecialty = await db.Doctor_Infor.findAll({
                                where: {
                                    specialtyId: id,
                                },
                                attributes: ['doctorId', 'provinceId'],
                            });
                        } else {
                            // find doctor
                            DoctorSpecialty = await db.Doctor_Infor.findAll({
                                where: {
                                    specialtyId: id,
                                    provinceId: location,
                                },
                                attributes: ['doctorId', 'provinceId'],
                            });
                        }

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

export default new SpeciatlyService();
