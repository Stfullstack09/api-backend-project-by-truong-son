import db from '../models';

class doctorService {
    getTopDoctorHome(limit) {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await db.User.findAll({
                    where: { roleId: 'R2' },
                    limit: limit,
                    order: [['createdAt', 'DESC']],
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEN', 'valueVI'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEN', 'valueVI'] },
                    ],
                    raw: true, // Không có lỗi ( requiered)
                    nest: true, // Không có lỗi ( requiered)
                });

                return resolve({ errCode: 0, errMessage: 'Successfully get top doctor home', data: users });
            } catch (error) {
                reject(error);
            }
        });
    }

    getAllDoctorSerVice() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.User.findAll({
                    where: { roleId: 'R2' },
                    attributes: { exclude: ['password', 'image'] },
                });

                if (data) {
                    return resolve({
                        errCode: 0,
                        errMessage: 'Successfully get all doctor',
                        data: data,
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async saveInfoDoctor(info) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!info.doctorId || !info.contentHTML || !info.contentMarkdown) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters',
                    });
                } else {
                    await db.Markdown.create({
                        contentHTML: info.contentHTML,
                        contentMarkdown: info.contentMarkdown,
                        description: info.description,
                        doctorId: info.doctorId,
                        specialtyId: info.specialtyId,
                        clinicId: info.clinicId,
                    });

                    resolve({
                        errCode: 0,
                        errMessage: 'successfully saved information',
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async getInfoDoctorByID(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameter',
                    });
                } else {
                    const user = await db.User.findOne({ where: { id } });

                    if (user) {
                        const data = await db.User.findOne({
                            where: { id },
                            attributes: {
                                exclude: ['password', 'image'],
                            },
                            include: [
                                { model: db.Markdown, attributes: ['description', 'contentMarkdown', 'contentHTML'] },
                                { model: db.Allcode, as: 'positionData', attributes: ['valueEN', 'valueVI'] },
                            ],
                            raw: true, // Không có lỗi ( requiered)
                            nest: true, // Không có lỗi ( requiered)
                        });

                        return resolve({
                            errCode: 0,
                            errMessage: 'Successfully getInfoDoctorByID',
                            data: data,
                        });
                    } else {
                        return resolve({
                            errCode: 2,
                            errMessage: 'cound search error getInfoDoctorByID',
                            data: [],
                        });
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default new doctorService();
