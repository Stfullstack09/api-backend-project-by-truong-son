import { raw } from 'body-parser';
import db from '../models';
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

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
                if (
                    !info.doctorId ||
                    !info.contentHTML ||
                    !info.contentMarkdown ||
                    !info.action ||
                    !info.selectedPrice ||
                    !info.selectedPayment ||
                    !info.selectedPrince ||
                    !info.nameClinic ||
                    !info.addRessClinic ||
                    !info.note
                ) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters',
                    });
                } else {
                    // update , insert data (upsert)

                    if (info.action === 'CREATE') {
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
                            errMessage: 'successfully create information',
                        });
                    } else if (info.action === 'EDIT') {
                        const dataMarkDown = await db.Markdown.findOne({
                            where: { doctorId: info.doctorId },
                        });

                        if (dataMarkDown) {
                            await db.Markdown.update(
                                {
                                    contentHTML: info.contentHTML,
                                    contentMarkdown: info.contentMarkdown,
                                    description: info.description,
                                    specialtyId: info.specialtyId,
                                    clinicId: info.clinicId,
                                },
                                { where: { doctorId: info.doctorId } },
                            );

                            resolve({
                                errCode: 0,
                                errMessage: 'successfully saved information',
                            });
                        } else {
                            resolve({
                                errCode: 1,
                                errMessage: 'cound not found saved information',
                            });
                        }
                    }

                    // up date and inser doctor_info

                    let doctorInfo = await db.Doctor_Infor.findOne({
                        where: {
                            doctorId: info.doctorId,
                        },
                    });

                    if (doctorInfo) {
                        // update
                        await db.Doctor_Infor.update(
                            {
                                priceId: info.selectedPrice,
                                provinceId: info.selectedPayment,
                                paymentId: info.selectedPrince,
                                addressClinic: info.addRessClinic,
                                nameClinic: info.nameClinic,
                                note: info.note,
                                doctorId: info.doctorId,
                            },
                            {
                                where: {
                                    doctorId: info.doctorId,
                                },
                            },
                        );
                    } else {
                        // create

                        await db.Doctor_Infor.create({
                            priceId: info.selectedPrice,
                            provinceId: info.selectedPayment,
                            paymentId: info.selectedPrince,
                            addressClinic: info.addRessClinic,
                            nameClinic: info.nameClinic,
                            note: info.note,
                            doctorId: info.doctorId,
                        });
                    }
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
                                exclude: ['password'],
                            },
                            include: [
                                {
                                    model: db.Markdown,
                                    attributes: ['description', 'contentMarkdown', 'contentHTML', 'updatedAt'],
                                },
                                { model: db.Allcode, as: 'positionData', attributes: ['valueEN', 'valueVI'] },
                            ],
                            raw: true, // Không có lỗi ( requiered)
                            nest: true, // Không có lỗi ( requiered)
                        });

                        if (data && data.image) {
                            data.image = Buffer.from(data.image, 'base64').toString('binary');
                        }

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

    async getInfoDoctorMarkDownByID(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (id) {
                    const data = await db.User.findOne({
                        where: { id }, // ES6

                        attributes: ['email'],

                        include: [
                            { model: db.Markdown, attributes: ['description', 'contentMarkdown', 'contentHTML'] },
                        ],
                        raw: true, // Không có lỗi ( requiered)
                        nest: true,
                    });

                    if (data) {
                        return resolve({
                            errCode: 0,
                            errMessage: 'successfully',
                            data,
                        });
                    } else {
                        return resolve({
                            errCode: 0,
                            errMessage: `Coundn't`,
                            data: {},
                        });
                    }
                } else {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameter',
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async bunkCreateSchedule(data) {
        return new Promise(async function (resolve, reject) {
            try {
                if (data && data.length > 0) {
                    let Schedule = [];

                    Schedule = data.map((data) => {
                        data.maxNumber = MAX_NUMBER_SCHEDULE;
                        return data;
                    });

                    let exiting = await db.schedule.findAll({
                        where: {
                            doctorId: Schedule[0].doctorId,
                            date: Schedule[0].date,
                        },
                        attributes: ['date', 'timeType', 'doctorId', 'maxNumber'],
                        raw: true,
                    });

                    const Result = Schedule.filter(
                        (item) => !exiting.find((data) => data.timeType === item.timeType && data.date === item.date),
                    );

                    if (Result && Result.length > 0) {
                        await db.schedule.bulkCreate(Result);
                        return resolve({
                            errCode: 0,
                            errMessage: 'Successfully',
                        });
                    } else {
                        return resolve({
                            errCode: 1,
                            errMessage: 'The calendar is full',
                        });
                    }
                } else {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters',
                        data: [],
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async getScheduleDoctorByDate(doctorId, date) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!doctorId || !date) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters',
                    });
                } else {
                    const data = await db.schedule.findAll({
                        where: {
                            doctorId: doctorId,
                            date: date,
                        },
                        include: [{ model: db.Allcode, as: 'timeTypeData', attributes: ['valueEN', 'valueVI'] }],
                        raw: true, // Không có lỗi ( requiered)
                        nest: true, // Không có lỗi ( requiered)
                    });

                    if (!data) {
                        data = [];
                    }

                    return resolve({
                        errCode: 0,
                        data,
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default new doctorService();
