const userService = require('../services/user.service');

class UserController {
    async getAll(req, res, next) {
        try {
            const users = await userService.getAll({ role: req.query.role });
            res.status(200).json({ data: users });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const user = await userService.getById(req.params.id);
            res.status(200).json({ data: user });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const user = await userService.create(req.body);
            res.status(201).json({ data: user });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
