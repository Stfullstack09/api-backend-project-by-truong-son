import bcrypt from 'bcrypt';

import db from '../models';

class USERServices {
    async handleUserLogin(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const userData = {};
                const isExist = await this.handleCheckEmailUser(email);

                if (isExist) {
                    const user = await db.User.findOne({
                        where: { email: email },
                        attributes: ['email', 'roleId', 'password'], // lấy ra những column cần lấy
                        raw: true, // nó sẽ trả luôn luôn cho ta một Object
                    });

                    if (user) {
                        //compare password
                        const check = await bcrypt.compareSync(password, user.password);

                        if (check) {
                            userData.errCode = 0;
                            userData.errMessage = 'Successfully';
                            delete user.password;
                            userData.user = user;
                        } else {
                            userData.errCode = 3;
                            userData.errMessage = 'Wrong password';
                        }
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = `User isn't not found`;
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = `Your 'email' isn't exit in your system. Plz try other email`;
                }

                resolve(userData);
            } catch (error) {
                reject(error);
            }
        });
    }

    async handleCheckEmailUser(userEmail) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.User.findOne({ where: { email: userEmail } }); // {email = email } syntax ES6

                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async getAllUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let user = '';
                if (id) {
                    if (id === 'All') {
                        user = await db.User.findAll({
                            attributes: {
                                exclude: ['password'], // Không trả password ra
                            },
                        });
                    } else {
                        user = await db.User.findOne({
                            where: { id: id },
                            attributes: {
                                exclude: ['password'], // Không trả password ra
                            },
                        });
                    }
                }
                resolve(user);
            } catch (err) {
                reject(err);
            }
        });
    }
}

export default new USERServices();
