import db from '../models';
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

class CRUDService {
    async createNewUser(data) {

        return new Promise(async(resolve, reject) => {
            try {
                const hashPasswordFromBcrypt = await this.hasUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address : data.address,
                    gender: data.gender === '1' ? true : false,
                    roleId : data.roleId,
                    phonenumber : data.phonenumber,
                })

                // thoát ra khỏi promises
                resolve('Create Successfully new user')
                
            } catch (error) {
                reject(error);
            }
        })
    }

    hasUserPassword(password) {
        return new Promise(async(resolve, reject) => {
            try {
                const hashPassword = await bcrypt.hashSync(password, salt);
                resolve(hashPassword)
            } catch (error) {
                reject(error);
            }
        })
    }

    async getAllUsers() {
       return new Promise(async(resolve, reject) => {
            try {
                const data = await db.User.findAll()
                resolve(data)
            } catch (error) {
                reject(error)
            }
       });
    }
    
}

export default new CRUDService