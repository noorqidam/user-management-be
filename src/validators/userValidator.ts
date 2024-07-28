import { body } from "express-validator";

export const userValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("birthday").isDate().withMessage("Invalid birthday date"),
    body("gender").isIn(["male", "female"]).withMessage("Invalid gender"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("roles").optional().isArray().withMessage("Roles should be an array"),
  ];
};

export const roleValidationRules = () => {
  return [body("name").notEmpty().withMessage("Role name is required")];
};
