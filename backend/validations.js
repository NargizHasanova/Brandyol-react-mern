import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать как минимум 3 символа').isLength({ min: 3 }),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать как минимум 3 символа').isLength({ min: 3 }),
    body('firstName', 'Укажите имя').isLength({ min: 3 }),
    body('lastName', 'Укажите имя').isLength({ min: 3 }),
]