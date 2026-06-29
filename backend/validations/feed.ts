import { body, type ValidationChain } from 'express-validator';

export const createPostValidation: ValidationChain[] = [
  body('title')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 characters long.'),
  body('content')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Content must be at least 5 characters long.'),
];

export const updatePostValidation: ValidationChain[] = [
  body('title')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 characters long.'),
  body('content')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Content must be at least 5 characters long.'),
];
