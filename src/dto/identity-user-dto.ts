import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateRequestBody = [
    // Specify the validation rules using express-validator's `body` function
    body('email').isEmail().notEmpty().withMessage('Invalid email address'),
    body('phoneNumber').notEmpty().withMessage('phoneNumber is required'),

    // // Custom validation
    // body('age')
    //     .custom((value) => {
    //         if (isNaN(value)) {
    //             throw new Error('Age must be a number');
    //         }
    //         return true;
    //     }),

    // Check for validation errors and respond with 400 if any errors exist
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];