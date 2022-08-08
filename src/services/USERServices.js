import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

import * as EmailValidator from 'email-validator';

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
                        attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'], // lấy ra những column cần lấy
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

    async createNewUser(data) {
        return new Promise(async (resolve, reject) => {
            if (
                (await EmailValidator.validate(data.email)) &&
                data.password &&
                data.firstName &&
                data.lastName &&
                data.address &&
                data.gender &&
                data.roleId &&
                data.phonenumber
            ) {
                try {
                    // check email is exit

                    // if(data.image && data.image.size > 1000000) {

                    // }

                    const checkEmailExit = await this.handleCheckEmailUser(data.email);

                    if (!checkEmailExit) {
                        const hashPasswordFromBcrypt = await this.hasUserPassword(data.password);
                        await db.User.create({
                            email: data.email,
                            password: hashPasswordFromBcrypt,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            address: data.address,
                            gender: data.gender,
                            roleId: data.roleId,
                            phonenumber: data.phonenumber,
                            image: data.image,
                            positionId: data.positionId || null,
                        });

                        // thoát ra khỏi promises
                        resolve({
                            errCode: 0,
                            errMessage: 'Create Successfully new user',
                            user: {},
                        });
                    } else {
                        resolve({
                            errCode: 1,
                            errMessage: 'Email already exists in the system',
                            user: {},
                        });
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `An error occurred while creating a new user because you passed a missing parameter, please double check that the parameters like 'Email ' is in the correct format ending in '@gmail.com ' ?`,
                    user: {},
                });
            }
        });
    }

    async updateUserData(dataBody) {
        return new Promise(async (resolve, reject) => {
            if (
                dataBody.id &&
                dataBody.firstName &&
                dataBody.lastName &&
                dataBody.address &&
                dataBody.firstName.length > 0 &&
                dataBody.lastName.length > 0 &&
                dataBody.address.length > 0
            ) {
                try {
                    const user = await this.getAllUser(dataBody.id);

                    if (user) {
                        if (dataBody.password && dataBody.password.length >= 8) {
                            const hasPassword = await this.hasUserPassword(dataBody.password);

                            if (dataBody.image) {
                                const data = await db.User.update(
                                    {
                                        phonenumber: dataBody.phonenumber,
                                        positionId: dataBody.position || dataBody.positionId,
                                        roleId: dataBody.roleId,
                                        gender: dataBody.gender,
                                        firstName: dataBody.firstName,
                                        lastName: dataBody.lastName,
                                        address: dataBody.address,
                                        password: hasPassword,
                                        image: dataBody.image,
                                    },
                                    { where: { id: dataBody.id } },
                                );
                            } else {
                                const data = await db.User.update(
                                    {
                                        phonenumber: dataBody.phonenumber,
                                        positionId: dataBody.position || dataBody.positionId,
                                        roleId: dataBody.roleId,
                                        gender: dataBody.gender,
                                        firstName: dataBody.firstName,
                                        lastName: dataBody.lastName,
                                        address: dataBody.address,
                                        password: hasPassword,
                                    },
                                    { where: { id: dataBody.id } },
                                );
                            }

                            return resolve({
                                errCode: 0,
                                errMessage: 'Update Successfully by account',
                            });
                        }

                        if (!dataBody.password) {
                            if (dataBody.image) {
                                const data = await db.User.update(
                                    {
                                        phonenumber: dataBody.phonenumber,
                                        positionId: dataBody.position || dataBody.positionId,
                                        roleId: dataBody.roleId,
                                        gender: dataBody.gender,
                                        firstName: dataBody.firstName,
                                        lastName: dataBody.lastName,
                                        address: dataBody.address,
                                        image: dataBody.image,
                                    },
                                    { where: { id: dataBody.id } },
                                );
                            } else {
                                const data = await db.User.update(
                                    {
                                        phonenumber: dataBody.phonenumber,
                                        positionId: dataBody.position || dataBody.positionId,
                                        roleId: dataBody.roleId,
                                        gender: dataBody.gender,
                                        firstName: dataBody.firstName,
                                        lastName: dataBody.lastName,
                                        address: dataBody.address,
                                    },
                                    { where: { id: dataBody.id } },
                                );
                            }

                            return resolve({
                                errCode: 0,
                                errMessage: 'Update Successfully by account',
                            });
                        }

                        if (dataBody.password && dataBody.password.length < 8) {
                            return resolve({
                                errCode: 1,
                                errMessage: 'password your required 8 key ...',
                            });
                        }
                    } else {
                        return resolve({
                            errCode: 1,
                            errMessage: `Couldn't find an account to do it`,
                        });
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                return resolve({
                    errCode: 2,
                    errMessage: `You have transport or missing parameter 'this is the binding of the field'`,
                });
            }
        });
    }

    async deleteUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const User = await db.User.findOne({ where: { id: id } });

                if (User) {
                    await db.User.destroy({
                        where: { id },
                    });

                    resolve({ errCode: 0, errMessage: `Delete Successfully` });
                } else {
                    resolve({ errCode: 2, errMessage: `Couldn't find an account to do it` });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    hasUserPassword(password) {
        return new Promise(async (resolve, reject) => {
            try {
                const hashPassword = await bcrypt.hashSync(password, salt);
                resolve(hashPassword);
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

    async getAllCodeServices(type) {
        return new Promise(async (resolve, reject) => {
            try {
                if (type) {
                    const data = {};

                    let Allcode = await db.Allcode.findAll({
                        where: {
                            type, // ES6 syntax
                        },
                    });

                    if (Allcode && Allcode.length > 0) {
                        (data.errCode = 0), (data.data = Allcode), (data.errMessage = 'Successfully');
                    } else {
                        (data.errCode = 1), (data.data = {}), (data.errMessage = `Couldn't find an account to do it`);
                    }

                    return resolve(data);
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameters',
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default new USERServices();
