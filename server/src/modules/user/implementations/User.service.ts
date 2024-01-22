import User from '../../../database/models/UserModel';
import ServiceResponse from '../../interfaces/ServiceResponse';
import IUserService  from './IUserService';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'default';

export default class UserService implements IUserService {
    async create(data: any): Promise<ServiceResponse> {
        const { name, email, password, telephone, profileImage } = data;
        const errors = [];

        const userExists = await this.findByEmail(email);

        if (userExists.status === 200) {
            errors.push({ message: 'User already exists', name: 'email' });
        }

        const telephoneExists = await this.findByTelephone(telephone);

        if (telephoneExists.status === 200) {
            errors.push({ message: 'Telephone already exists', name: 'telephone' });
        }

        if (errors.length > 0) {
            return { status: 400, data: { errors } };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword, telephone, profileImage });

        return { status: 201, data: user };
    }
    
    async login(data: any): Promise<ServiceResponse> {
        const { email, password } = data;

        const user = await this.validateLogin(email, password);

        if (user.status === 401 || user.status === 404) {
            return user;
        }

        const token = sign({id: user.data.id, name: user.data.name, isUser: true}, secret);

        return { status: 200, data: { token: token, isUser: true  } };
    }
    
    async findByEmail(email: string): Promise<ServiceResponse> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return { status: 404, data: { message: 'User not found' } };
        }

        return { status: 200, data: user };
    }

    async findByTelephone(telephone: string): Promise<ServiceResponse> {
        const user = await User.findOne({ where: { telephone } });

        if (!user) {
            return { status: 404, data: { message: 'User not found' } };
        }

        return { status: 200, data: user };
    }
    
    async validateLogin(email: string, password: string): Promise<ServiceResponse> {
        const user = await this.findByEmail(email);

        if (user.status === 404) {
            return user;
        }

        const passwordMatched = await bcrypt.compare(password, user.data.password);

        if (!passwordMatched) {
            return { status: 401, data: { message: 'Incorrect email/password combination' } };
        }

        return { status: 200, data: user.data };
    }

    async getUser(id: string): Promise<ServiceResponse> {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return { status: 404, data: { message: 'User not found' } };
        }

        const { password, ...userWithoutPassword } = user.dataValues;

        return { status: 200, data: userWithoutPassword };
    }
}