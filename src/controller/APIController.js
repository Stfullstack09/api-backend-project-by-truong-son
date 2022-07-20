class APIController {
    async getAllUsers(req, res, next) {
        res.render('index.ejs');
    }
}

export default new APIController();
