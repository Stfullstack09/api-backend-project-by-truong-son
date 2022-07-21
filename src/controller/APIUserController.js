import USERServices from '../services/USERServices';

class APIUserController {
    async handleLogin(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing inputs parameters',
            });
        }

        const UserData = await USERServices.handleUserLogin(email, password);

        res.status(200).json({
            errCode: UserData.errCode,
            message: UserData.errMessage,
            user: UserData.user ? UserData.user : {},
        });
    }
}

export default new APIUserController();
