const route = require('express').Router()
const adminController = require('../controller/admin')
const { check, body } = require("express-validator");

const isAdmin = require('../middleware/isAdmin')

route.get('/dashboard', isAdmin, adminController.getDashboard)

//route.get('/students', adminController.getStudents);

route.get("/add-student", isAdmin, adminController.getAddStudent);

route.post(
  "/add-student",
  isAdmin,
  [
    check("email")
      .isEmail()
      .withMessage("الرجاء إدخال بريد إلكتروني صالح")
      .normalizeEmail(),

    body("userName")
      .notEmpty()
      .withMessage("اسم المستخدم فارغ")
      .isLength({ min: 3 })
      .withMessage("اسم المستخدم يجب ألا يقل عن 3 أحرف"),

    body("password")
      .isLength({ min: 5 })
      .withMessage("الرجاء إدخال كلمة مرور بطول 5 محارف على الأقل")
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
  adminController.postAddStudent
);


route.post(
  '/edit-student',isAdmin ,
  [
    body('username').isLength({ min: 4 }).withMessage('يجب أن يكون اسم المستخدم 4 أحرف على الأقل.'),
    body('password').isLength({ min: 5 }).withMessage('يجب أن تكون كلمة المرور 5أحرف على الأقل.'),
    body('email').isEmail().withMessage('البريد الإلكتروني غير صحيح.'),
    body('isAdmin').isBoolean().withMessage('يجب أن تكون قيمة الأدمن صحيحة.')
  ],
  adminController.postEditStudent
);

route.post('/delete-student', isAdmin, adminController.postDeleteStudent);




route.get('/student-feedbacks', isAdmin, adminController.getStudentFeedbacks);
route.get('/api/student-feedbacks', /* isAdmin */ adminController.getStudentFeedbacksData);


module.exports = route
