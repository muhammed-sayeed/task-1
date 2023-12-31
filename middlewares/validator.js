import { check } from "express-validator";

export const loginValidator = [
  check("username")
    .isLength({ min: 5 })
    .withMessage("is invalid, must contain minimum of 5 letters")
    .isLength({ max: 15 })
    .withMessage("is invalid, must contain maximum of 15 letters")
    .trim(),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("is invalid, must be a valid email!")
    .trim(),
  check("password")
    .isLength({ min: 5 })
    .withMessage("password must be 5 charectere"),
];
