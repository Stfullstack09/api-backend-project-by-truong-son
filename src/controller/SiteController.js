import db from "../models"

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
}

export default new SiteController