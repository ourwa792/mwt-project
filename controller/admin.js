// controllers/adminController.js
const { validationResult, buildCheckFunction } = require('express-validator');
const {User, FeedBack, Lesson} = require('../model/association');
const bcrypt = require("bcryptjs");

exports.getDashboard = (req, res, next) => {
  User.findAll()
    .then(students => {
      res.render('admin/dashboard', {
        pageTitle: 'لوحة القيادة',
        students: students,
      });
    })
    .catch(err => {
      console.error(err);
      req.flash('error', 'حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى لاحقاً.');
      res.status(500).redirect('/admin/dashboard');
    });
};

exports.getStudents = (req, res, next) => {
  User.findAll()
    .then(students => {
      res.render('admin/students', {
        pageTitle: 'قائمة الطلاب',
        students: students
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).render('error', { error: err, pageTitle: 'خطأ' });
    });
};

//--------------------------



exports.getAddStudent = (req, res, next) => {
  res.render("admin/add-student", {
    pageTitle: "Add Student",
    oldInput: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};


exports.postAddStudent = async (req, res, next) => {
  const { userName, email, password, confirmPassword } = req.body;
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/add-student", {
      pageTitle: "Add Student",
      errorMessage: errors.array()[0].msg,
      oldInput: { userName, email, password, confirmPassword },
      validationErrors: errors.array(),
    });
  }
  try {
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(422).render("admin/add-student", {
        pageTitle: "اضافة طالب",
        errorMessage: "البريد الإلكتروني موجود بالفعل.",
        oldInput: { userName, email, password, confirmPassword },
        validationErrors: [],
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ userName, email, password: hashedPassword });
    await user.save();
    req.flash("success", "تم إضافة الطالب بنجاح");
    res.redirect("/admin/dashboard"); // إعادة التوجيه لنفس الصفحة مع رسالة تأكيد
  } catch (error) {
    console.error(error);
    req.flash("error", "حدث خطأ ما، يرجى المحاولة مرة أخرى");
    res.redirect("/admin/add-student");
  }
};


//-------------------------


exports.postEditStudent = (req, res, next) => {
  const { studentId, password, username, email, isAdmin } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', errors.array().map(err => err.msg));
    return res.redirect('/admin/dashboard');
  }

  User.findByPk(studentId)
    .then(student => {
      if (!student) {
        req.flash('error', 'لم يتم العثور على الطالب.');
        return res.redirect('/admin/dashboard');
      }

      student.userName = username;
      student.email = email;
      student.isAdmin = isAdmin === 'true';
      if (password) {
        student.password = bcrypt.hashSync(password, 8)
      }
      return student.save();
    })
    .then(result => {
      req.flash('success', 'تم تعديل بيانات الطالب بنجاح.');
      res.redirect('/admin/dashboard');
    })
    .catch(err => {
      console.error(err);
      req.flash('error', 'حدث خطأ أثناء تعديل بيانات الطالب.');
      res.redirect('/admin/dashboard');
    });
};
 

//--------------------

exports.postDeleteStudent = (req, res, next) => {
  const { studentId } = req.body;

  User.findByPk(studentId)
    .then(student => {
      if (!student) {
        req.flash('error', 'لم يتم العثور على الطالب.');
        return res.redirect('/admin/dashboard');
      }

      return student.destroy();
    })
    .then(() => {
      req.flash('success', 'تم حذف الطالب بنجاح.');
      res.redirect('/admin/dashboard');
    })
    .catch(err => {
      console.error(err);
      req.flash('error', 'حدث خطأ أثناء محاولة حذف الطالب. يرجى المحاولة مرة أخرى لاحقاً.');
      res.status(500).redirect('/admin/dashboard');
    });
};


//--------------

exports.getStudentFeedbacks = (req, res) => {
  res.render('admin/studentFeedbacks', {
    pageTitle: 'تقييمات الطلاب'
  });
};


exports.getStudentFeedbacksData = async (req, res) => {
  try {
    const feedbacks = await FeedBack.findAll({
      include: {
        model: Lesson,
        attributes: ['title','grade']
      }
    });

    const feedbackCounts = feedbacks.reduce((acc, feedback) => {
      const lesson = feedback.lesson ;

      const category = `${lesson.title} - ${lesson.grade}`
      if (!acc[category]) {
        acc[category] = {
          title: lesson.title,
          grade: lesson.grade,
          count: 0
        };
      }
      acc[category].count++ ;
      return acc;
    }, {});
    console.log('=======feedbacks====='+JSON.stringify(feedbackCounts))

    const labels = Object.keys(feedbackCounts);
    const counts = labels.map( label => feedbackCounts[label].count )

    //const counts = Object.values(feedbackCounts);

    console.log('=======lables====='+labels)
    console.log('=======count====='+JSON.stringify(counts))


    res.json({ labels, counts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في جلب التقييمات' });
  }
};