import {body} from "express-validator";

export const registerValidation = [
    body('email', "not an email").isEmail(),
    body('password', "min length is 6 symbols").isLength({min: 6}),
    body('fullName', "min length is 2 words").custom((value, { req }) => {
        const words = value.split(' ');
        if (words.length < 2) {
            throw new Error('Full name should have at least 2 words');
        }
        return true;
    }),
    body('fullName', "min length is 6 symbols").isLength({min: 6}),
    body('avatarURL', "not a URL").optional().isURL(),
];

