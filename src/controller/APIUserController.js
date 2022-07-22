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

    async handleGetAllUsers(req, res, next) {
        const id = req.body.id; // All || ID

        if (!id) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing required parameters',
                user: [],
            });
        }

        const user = await USERServices.getAllUser(id);

        return res.status(200).json({
            errCode: 0,
            message: 'successfully',
            user: user,
        });
    }
}

export default new APIUserController();
