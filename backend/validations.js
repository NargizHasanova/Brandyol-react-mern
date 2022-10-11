import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать как минимум 3 символа').isLength({ min: 3 }),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать как минимум 3 символа').isLength({ min: 3 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(), // optional-yeni avatarUrl olada biler olmayada biler,olsa ama yoxlayarsan
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];