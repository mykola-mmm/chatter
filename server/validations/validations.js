import {body} from 'express-validator';

export const registerValidation = [
    body('email', 'not an email').isEmail(),
    body('password', 'min length is 6 symbols').isLength({min: 6}),
    body('fullName', 'min length is 2 words').custom((value, { req }) => {
        const words = value.split(' ');
        if (words.length < 2) {
            throw new Error('Full name should have at least 2 words');
        }
        return true;
    }),
    body('fullName', 'min length is 6 symbols').isLength({min: 6}),
    body('avatarURL', 'not a URL').optional().isURL(),
];

export const loginValidation = [
    body('email', 'not an email').isEmail(),
    body('password', 'min length is 6 symbols').isLength({min: 6})
];

export const postCreateValidation = [
    body('title', 'The title could not be empty').isLength({min: 1}),
    body('text', 'The post could not be empty').isLength({min: 1}),
    body('tags', 'The tags should be an array').optional().isArray(),
    body('imageURL', 'The image url should be a valid URL').optional().isString()
];


