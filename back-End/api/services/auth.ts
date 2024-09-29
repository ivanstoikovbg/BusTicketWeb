import { IUser } from './../../interfaces/User';
import bcrypt from 'bcrypt';
import { RegisterPayload } from '../../interfaces/RegisterPayload';
import User from '../../models/userModel';
import { ISession } from '../../interfaces/Session';
import jsonwebtoken from 'jsonwebtoken';
import { AuthContext } from '../../interfaces/AuthContext';
const JWT_SECRET = process.env.JWT_SECRET || 'process.env.JWT_SECRET;';

async function validatePassword(inputPassword: string, storedPassword: string) {
    const match = await bcrypt.compare(inputPassword, storedPassword);
    if (!match) {
        throw new Error('Invalid password');
    }
}

async function hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function registerUser(userPayload: RegisterPayload) {
    const alUser = await User.findOne({ firstName: userPayload.firstName });
    if (alUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await hashPassword(userPayload.password);
    const user = new User({
        firstName: userPayload.firstName,
        lastName: userPayload.lastName,
        hashedPassword: hashedPassword,
    });
    await user.save();
    return createSession(user);
}

async function loginUser(userPayload: RegisterPayload) {
    const userFound = await User.findOne<IUser>({
        firstName: userPayload.firstName,
    });

    const user = userFound;

    if (!user) {
        throw new Error('User not found');
    }

    await validatePassword(userPayload.password, user.hashedPassword);
    return createSession(user);
}

async function getUserById(id: string) {
    return await User.findById(id);
}

function createSession(user: IUser | any): ISession {
    // fix tipization later
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        accessToken: jsonwebtoken.sign({ _id: user._id }, JWT_SECRET),
    };
}

function verifySession(token: string) {
    const data = jsonwebtoken.verify(token, JWT_SECRET) as {
        _id: string;
        firstName: string;
        lastName: string;
    };
    const session: ISession = {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        accessToken: token,
    };
    return session;
}

function checkAuthorization(c: AuthContext): ISession | any {
    if (c.user) {
        return c.user;
    } else {
        throw new Error('Unauthorized');
    }
}

export {
    registerUser,
    loginUser,
    getUserById,
    verifySession,
    checkAuthorization,
};
