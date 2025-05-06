import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLowercase()
      .withMessage("name must be lowercase")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters long"),

    body("password")
      .trim()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password at least 8 character long"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password").trim().isEmpty().withMessage("Password is required"),
  ];
};

export { userRegisterValidator, userLoginValidator };
