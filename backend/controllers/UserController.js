import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

// REGISTER
export const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);

        const doc = new UserModel({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: await bcrypt.hash(req.body.password, salt),
            avatarUrl: req.body.avatarUrl,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            console.log('!user');
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.password);

        if (!isValidPass) {
            console.log('!isValidPass');
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userData } = user._doc;
        return res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};


// GET ME
export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        //  req.userId = checkAuth-dan gelen tokene gore userModelin(userin) _id-si

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};