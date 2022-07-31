import db from '../models';
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

class CRUDService {
    async createNewUser(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const hashPasswordFromBcrypt = await this.hasUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                    phonenumber: data.phonenumber,
                });

                // thoát ra khỏi promises
                resolve('Create Successfully new user');
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

    async getAllUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.User.findAll();
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getUserInfoById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const User = await db.User.findOne({ where: { id: id } });

                if (User) {
                    resolve(User);
                } else {
                    resolve({
                        error: 'Not Found Users',
                    });
                }
            } catch (error) {}
        });
    }

    async UpDateUserInfoById(ID, dataBody) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.User.update(
                    {
                        id: dataBody.id,
                        firstName: dataBody.firstName,
                        lastName: dataBody.lastName,
                        address: dataBody.address,
                    },
                    { where: { id: ID } },
                );

                if (data) {
                    resolve(data);
                } else {
                    resolve({});
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async DeleteUserInfoById(ID) {
        return new Promise(async (resolve, reject) => {
            try {
                const state = await db.User.destroy({
                    where: { id: ID },
                });

                if (state === 1) {
                    resolve();
                } else {
                    resolve({ message: 'record not found' });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async testTing() {
        const data = await db.User.findAll();

        return data;
    }
}

export default new CRUDService();
