const User = require('../model/user');
const bcrypt = require('bcryptjs');

const { mailerReset } = require('../utils/mailer');
const { validationResult, body } = require('express-validator'); //بتجمع كل الاخطاء من الروتر
const { Op } = require('sequelize');

exports.getSign = (req, res, next) => {
  //console.log(req.session)
  res.render('auth/signup', {
    pageTitle: 'SignUP',
    oldInput: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationErrors: [],
  });
};

exports.postSign = async (req, res, next) => {
  const { userName, email, password, confirmPassword } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('auth/signup', {
      pageTitle: 'sign-up',
      errorMessage: errors.array()[0].msg, // [{type: 'field',value: 'tes',msg: 'Invalid value',path: 'email',location: 'body'}]
      oldInput: {
        userName: userName,
        confirmPassword: confirmPassword,
        email: email,
        password: password,
      },
      validationErrors: errors.array(), //نغيير الستايل المشروط كل الاخطاء مرتبطة بالفيو بشرط
    });
  }
  try {
    const userExist = await User.findOne({
      where: { email },
    });
    if (userExist) {
      req.flash('error', 'الايميل موجود بالفعل');
      return res.redirect('/register');
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await user.save();
    req.flash('success', ' تم تسجيلك بنجاح  بإمكانك المتابعة');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'some thing went error');
    res.redirect('/register');
  }
};

exports.getLogIn = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'login page',
    //errorMessage:
    oldInput: {
      email: '',
      password: '',
    },
  });
};

exports.postLogIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(user);
      req.session.user = user;
      req.session.save();
      res.redirect('/profile');
    } else {
      //req.flash("error", " إحدى المدخلات غير صحيحة ");
      //res.redirect("/login");
      res.status(422).render('auth/login', {
        pageTitle: 'login page',
        errorMessage: 'إحدى المدخلات غير صحيحة', // هي هيي تبع الفلاش
        oldInput: {
          email: email,
          password: password,
        },
      });
    }
  } catch (error) {
    console.error(error);
    req.flash('error', 'some thing went wrong');
    res.redirect('/login');
  }
};

exports.getForgotPassword = (req, res, next) => {
  res.render('auth/forgotPassword', {
    pageTitle: 'forgot Passwod',
    validationErrors: [],
    message: { error: req.flash('error'), success: req.flash('success') },
  });
};

exports.postForgotPassword1 = async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    /* req.flash('error', errors.array()[0].msg); // تمت اضافته
    return res.status(422).render("auth/forgotPassword", {
      pageTitle: "forgotPassword",
      errorMessage: errors.array()[0].msg, // [{type: 'field',value: 'tes',msg: 'Invalid value',path: 'email',location: 'body'}]
      validationErrors: errors.array(), //نغيير الستايل المشروط كل الاخطاء مرتبطة بالفيو بشرط
    }); */
    return res.status(422).render('auth/forgotPassword', {
      pageTitle: 'Forgot Password',
      errorMessage: req.flash('error'),
      validationErrors: errors.array(),
    });
  } else {
    try {
      const user = await User.findByEmail(email);
      console.log(user);
      if (user === null) {
        req.flash('error', 'لا يوجد مستخدم بهذا الايميل');
        /* res.render("auth/forgotPassword",{
          pageTitle: "forgotPassword",
          validationErrors: [],
        }); */
      }
      const token = Math.random().toString(32).slice(2);
      user.token = token;
      await user.save();
    } catch (error) {
      console.error('error', 'some thing went wrong');
      res.redirect('/forgotPassword');
    }
  }
};

exports.postForgotPassword = async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  if (req.session.user && email !== req.session.user.email) {
    //console.log (email+'-------------------------'+ req.session.user.email)
    return res.json({ errorMessage: 'هذا الايميل ليس مخصص لك' });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(422).json({
        errorMessage: 'لا يوجد مستخدم بهذا الايميل',
        validationErrors: [],
      });
    }

    const token = Math.random().toString(36).slice(2);
    user.resetToken = token;
    user.resetTokenExpration = Date.now() + 3600000;
    await user.save();
    console.log('---------- token is ----------' + token);
    console.log('------------user is -----------' + user);
    console.log(
      '------------tokenExpirarion is -----------' + user.resetTokenExpration
    );

    await mailerReset(email, token);

    return res.status(200).json({
      successMessage:
        'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني',
    });
  } catch (error) {
    console.error('Error', error);
    return res
      .status(500)
      .json({ errorMessage: 'حدث خطأ ما، يرجى المحاولة مرة أخرى' });
  }
};

exports.getResetPassword = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpration: { [Op.gt]: Date.now() },
    },
  });
  if (!user) {
    req.flash('error', 'انتهت فترة صلاحية هذا الرابط');
    return res.redirect('/forgotPassword');
  }
  res.render('auth/resetPassword', {
    pageTitle: 'Reset Password',
    token: token,
    oldInput: { password: '' },
    validationErrors: [],
    message: { error: req.flash('error'), success: req.flash('success') },
  });
};

exports.postResetPassword = async (req, res) => {
  const { password, confirmPassword, token } = req.body;
  /*  if (!password || !confirmPassword) {
    req.flash("error", "جميع الحقول مطلوبة");
    return res.redirect(`/reset-password/${token}`);
    //return res.status(422).json({ errorMessage: 'جميع الحقول مطلوبة!' });
  }
  if (password !== confirmPassword) {
    //return res.status(422).json({errorMessage: 'كلمة المرور غير مطابقة' })
    req.flash("error", "كلمة المرور غير مطابقة !");
    return res.redirect(`/reset-password/${token}`);
  } */
  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpration: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      req.flash('error', 'الرمز غير صالح !');
      return res.status(422).json({ errorMessage: 'الرمز غير صالح !' });
    }

    user.password = await bcrypt.hash(password, 8);
    user.resetToken = null;
    user.resetTokenExpration = null;
    await user.save();
    req.flash('success', 'تم تغيير كلمة المرور بنجاح');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Some thing went wrong');
    res.redirect(`/reset-password/${token}`);
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
};
