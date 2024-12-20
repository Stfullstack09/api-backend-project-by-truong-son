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
        const id = req.query.id; // All || ID

        if (!id) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing required parameters',
                user: [],
            });
        } else {
            const user = await USERServices.getAllUser(id);

            if (user) {
                return res.status(200).json({
                    errCode: 0,
                    message: 'successfully',
                    user: user,
                });
            } else {
                return res.status(200).json({
                    errCode: 1,
                    message: `Couldn't find an account to do it`,
                    user: user,
                });
            }
        }
    }

    async handleCreateNewUser(req, res, next) {
        try {
            if (!req.body.email) {
                return res.status(500).json({ errCode: 1, message: 'You are missing email', user: {} });
            }

            const Message = await USERServices.createNewUser(req.body);

            return res.status(200).json(Message);
        } catch (error) {
            console.log(error);
        }
    }

    async handleEditUser(req, res, next) {
        const dataBody = req.body;

        if (dataBody) {
            const Message = await USERServices.updateUserData(dataBody);

            return res.status(200).json(Message);
        } else {
            return res.json({
                errCode: 1,
                message: 'Missing required parameters',
            });
        }
    }

    async handleDeleteUser(req, res, next) {
        const id = req.body.id;

        if (id) {
            try {
                const check = await USERServices.deleteUser(id);

                return res.status(200).json(check);
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameters',
                user: {},
            });
        }
    }
}

export default new APIUserController();
