import db from "../models"
import CRUDService from "../services/CRUDService";
class SiteController {
    async getHomePage(req, res, next) {

        try {
            let data = await db.User.findAll();

            return res.render('index.ejs', {
                data: JSON.stringify(data),
            })

        } catch (error) {
            console.log(error);
        }
    }

    async getCRUD(req, res, next) {
        res.render('layout/crud.ejs')
    }

    async createUserPOSTCRUD(req , res, next) {
       try {
           const Message = await CRUDService.createNewUser(req.body)
            res.send(Message)
       } catch (error) {
            next
       }
    }
    
}

export default new SiteController