const route = require("express").Router();
const authController = require("../controller/auth");
const userController = require("../controller/user");
const valid = require('../middleware/validate')

const { guestRout, protectedRoute } = require("../middleware/authMiddleWare");
const { check, body } = require("express-validator");

route.get("/register", guestRout, authController.getSign);
route.post(
  "/register",
  guestRout,
  [
    check("email")
      .isEmail()
      .withMessage("الرجاء أدخل إيميل صالح")
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("هذا الإيميل منسي بالفعل");
        }
        return true;
      })
      .normalizeEmail(),

    body("userName")
      .notEmpty()
      .withMessage("اسم المستخدم فارغ")
      .isLength({ min: 3 })
      .withMessage("اسم المستخدم يجب ألّا يقل عن 3 احرف")
      .custom((value, { req }) => {
        if (value === "test") {
          throw new Error("اسم المستخدم غير صالح");
        }
        return true;
      }),

    body("password", "الرجاء ادخل  كلمة سر بطول 5 محارف على الاقل") // برامتر تاني مشان ما نكرر رسالة الخطأ
      .isLength({ min: 5 })
      .isUppercase()
      .trim(),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("كلمة المرور غير مطابقة");
        }
        return true;
      }),
  ],
  authController.postSign
);

route.get("/login", guestRout, authController.getLogIn);
route.post(
  "/login",
  guestRout,
  [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty().trim(),
  ],
  authController.postLogIn
);


route.post("/logout", authController.logout);
route.get("/logout", authController.logout);


route.get("/forgotPassword", /* guestRout, */ authController.getForgotPassword);
route.post(
  "/forgotPassword",
  [body("email").notEmpty().withMessage("الايميل فارغ !!")],
  authController.postForgotPassword
);

route.get(
  "/reset-password/:token",
  /* protectedRoute */ authController.getResetPassword
);
route.post(
  "/reset-password",
   /* [
    body("password", "الرجاء ادخل  كلمة سر بطول 5 محارف على الاقل") // برامتر تاني مشان ما نكرر رسالة الخطأ
      .isLength({ min: 5 })
      .isUppercase()
      .trim(),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("كلمة المرور غير مطابقة");
        }
        return true;
      }),
  ], */ valid, authController.postResetPassword 
);

module.exports = route;
