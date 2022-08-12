import db from '../models';
require('dotenv').config();
import _ from 'lodash';
import EmailService from './EmailService';
import { v4 as uuidv4 } from 'uuid';

let letBuildUrlEmail = (doctorId, token) => {
    let result = `${process.env.LOCAL_HOST}/verify-booking/?token=${token}&doctorId=${doctorId}`;
    return result;
};
class PatientServices {
    postBookAppointment(data) {
        return new Promise(async function (resolve, reject) {
            try {
                if (!data.email || !data.timeType || !data.date || !data.doctorId || !data.fullName) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters',
                    });
                } else {
                    let Token = uuidv4();

                    console.log('Token :', Token);

                    await EmailService.sendSimpleEmail({
                        email: data.email,
                        patientName: data.fullName,
                        time: data.TimeString,
                        doctorName: data.doctorName,
                        language: data.language,
                        redirectLink: letBuildUrlEmail(data.doctorId, Token),
                    });

                    // upsert

                    const [user, boolean] = await db.User.findOrCreate({
                        where: { email: data.email },
                        defaults: {
                            email: data.email,
                            roleId: 'R3',
                            token: Token,
                        },
                        raw: false,
                    });

                    // create a booking record

                    if (user) {
                        const [bookingData, booleanBooking] = await db.Booking.findOrCreate({
                            where: { id: user.id },
                            defaults: {
                                statusId: 'S1',
                                doctorId: data.doctorId,
                                patientId: user.id,
                                date: data.date,
                                timeType: data.timeType,
                                timeTypeData: data.timeTypeData,
                                token: Token,
                            },
                        });

                        if (bookingData) {
                            await db.Booking.update(
                                {
                                    statusId: 'S1',
                                    doctorId: data.doctorId,
                                    patientId: user.id,
                                    date: data.date,
                                    timeType: data.timeType,
                                    timeTypeData: data.timeTypeData,
                                },
                                {
                                    where: {
                                        id: bookingData.id,
                                    },
                                },
                            );
                        }
                    }

                    resolve({
                        errCode: 0,
                        errMessage: 'Save successfully',
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async VerifyBookAppointment(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.token || !data.doctorId) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'missing token and doctorId',
                    });
                } else {
                    let Token = await db.Booking.findOne({
                        where: {
                            doctorId: data.doctorId,
                            token: data.token,
                            statusId: 'S1',
                        },
                    });

                    if (Token) {
                        await db.Booking.update(
                            {
                                statusId: 'S2',
                            },
                            {
                                where: {
                                    doctorId: data.doctorId,
                                    token: data.token,
                                },
                            },
                        );

                        return resolve({
                            errCode: 0,
                            errMessage: 'Update Successfully',
                        });
                    } else {
                        return resolve({
                            errCode: 2,
                            errMessage: 'Appointment already exists',
                        });
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default new PatientServices();
