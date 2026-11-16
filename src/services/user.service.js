const userRepository = require('../repositories/user.repository');
const { USER_ROLES } = require('../constants');

class UserService {
    async getAll({ role } = {}) {
        if (role && !Object.values(USER_ROLES).includes(role)) {
            const error = new Error(`Rol inválido: '${role}'. Valores permitidos: ${Object.values(USER_ROLES).join(', ')}`);
            error.statusCode = 400;
            throw error;
        }
        return userRepository.findAll({ role });
    }

    async getById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            const error = new Error('Usuario no encontrado');
            error.statusCode = 404;
            throw error;
        }
        return user;
    }

    async create({ name, email, role = USER_ROLES.USER }) {
        const existing = await userRepository.findByEmail(email);
        if (existing) {
            const error = new Error('Ya existe un usuario con ese email');
            error.statusCode = 409;
            throw error;
        }
        return userRepository.create({ name, email, role });
    }
}

module.exports = new UserService();
