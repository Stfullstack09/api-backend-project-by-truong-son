import db from '../models';
require('dotenv').config();
import _ from 'lodash';

class PatientServices {
    postBookAppointment(data) {
        return new Promise(async function (resolve, reject) {
            try {
                if (!data.email || !data.timeType || !data.date || !data.doctorId) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters',
                    });
                } else {
                    // upsert

                    const [user, boolean] = await db.User.findOrCreate({
                        where: { email: data.email },
                        defaults: {
                            email: data.email,
                            roleId: 'R3',
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
}

export default new PatientServices();
