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
}

export default new doctorService();
