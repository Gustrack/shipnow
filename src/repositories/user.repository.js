const User = require('../models/user.model');

class UserRepository {
    async findAll({ role } = {}) {
        const filter = role ? { role } : {};
        return User.find(filter).select('-__v').lean();
    }

    async findById(id) {
        return User.findById(id).select('-__v').lean();
    }

    async findByEmail(email) {
        return User.findOne({ email: email.toLowerCase() }).select('-__v').lean();
    }

    async create(data) {
        const user = await User.create(data);
        return user.toObject({ versionKey: false });
    }
}

module.exports = new UserRepository();
