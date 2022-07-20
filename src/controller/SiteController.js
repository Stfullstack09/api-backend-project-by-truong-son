import db from '../models';
import CRUDService from '../services/CRUDService';
class SiteController {
    async getHomePage(req, res, next) {
        try {
            let data = await CRUDService.getAllUsers();

            return res.render('index.ejs', {
                data: JSON.stringify(data),
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getCRUD(req, res, next) {
        res.render('layout/crud.ejs');
    }

    async createUserPOSTCRUD(req, res, next) {
        try {
            const Message = await CRUDService.createNewUser(req.body);
            res.send(Message);
        } catch (error) {
            next;
        }
    }

    async displayGetCRUD(req, res, next) {
        try {
            let data = await CRUDService.getAllUsers();
            res.render('displatGetCRUD.ejs', { data });
        } catch (error) {}
    }

    async getEditCRUD(req, res, next) {
        const ID = req.query.id;

        if (ID) {
            const userData = await CRUDService.getUserInfoById(ID);

            res.render('editCRUD.ejs', { data: userData });
        } else {
            res.json({
                Message: 'Error retrieving',
            });
        }
    }

    async updateUser(req, res, next) {
        const ID = req.params.id;
        const dataBody = req.body;

        if (ID && dataBody) {
            const userData = await CRUDService.UpDateUserInfoById(ID, dataBody);

            res.redirect('/get-crud');
        } else {
            res.json({
                Message: 'Error updating user',
            });
        }
    }

    async deleteCRUD(req, res, next) {
        const ID = req.query.id;

        if (ID) {
            const userData = await CRUDService.DeleteUserInfoById(ID);

            // return res.json(userData);

            res.redirect('/get-crud');
        } else {
            res.json({
                Message: 'Error Deleting user',
            });
        }
    }
}

export default new SiteController();
