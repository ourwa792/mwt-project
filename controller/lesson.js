const { Lesson, Category, FeedBack } = require("../model/association");
/* exports.getIndex = async (req, res) => {
  try {
    const lesson = await Lesson.findAll({
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    });
    //console.log(lesson); // lesson is array
    res.render("home", {
      pageTitle: "home page",
      lesson,
        });
  } catch (error) {
    console.log(error);
  }
}; */

exports.getIndex = async (req, res, next) => {
  try {
    //throw new Error('dummmy')
    const page = parseInt(req.query.page) || 1;
    const pageSize = 2;

    const { count, rows } = await Lesson.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    const totalPages = Math.ceil(count / pageSize);

    res.render("home", {
      lesson: rows,
      currentPage: page,
      totalPages,
      pageTitle: "home",
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.getLessonById = (req, res, next) => {
  const lessonId = req.params.id;
  Lesson.findByPk(lessonId)
    .then((result) => {
      res.render("lesson/less_1");
    })
    .catch((err) => {});
};

exports.getLessonRate = (req, res, next) => {
  const lessonId = req.params.id;
  const userId = req.user.id;

  Lesson.findByPk(lessonId)
    .then((lessn) => {
      if (!lessn) {
        req.flash("error", "الدرس غير موجود");
        return res.redirect("/");
      }

      // تحقق من وجود تقييم سابق لنفس المستخدم والدرس
      FeedBack.findOne({
        where: {
          userId: userId,
          lessonId: lessonId,
        },
      }).then((existingFeedback) => {
        if (existingFeedback) {
          req.flash("error", "لقد قمت بتقييم هذا الدرس بالفعل");
          return res.redirect("/");
        }

        const json = {
          title: "اعط تقييمك للدرس",
          logoPosition: "left",
          completedHtml:
            '<div style="max-width: 1000px; width: 100%; padding 32px; margin: 0 auto; font family:\'Segoe UI\'">\n<h3 style="text-align: justify"> شكراً لك!</h3>\n<br>\n    <p style="text-align: justify">عزيزي {student-name},</p>\n<br>\n    <p style="text-align: justify">نحن نقدر  وقتك وجهدك لإجراء التقييم.</p>\n<br>\n',

          pages: [
            {
              name: "intro",
              elements: [
                {
                  type: "text",
                  name: "student-name",
                  title: "ادخل اسمك أو أي لقب تريده :",
                  hideNumber: true,
                  isRequired: true,
                },
              ],
            },
            {
              name: "rating-questions",
              elements: [
                {
                  type: "rating",
                  name: "well-prepared",
                  title: "إلى أي مدى كانت تجربتك مع هذا الدرس جيدة ؟",
                  rateType: "smileys",
                  autoGenerate: false,
                  rateCount: 4,
                  rateValues: ["يحتاج إلى تحسين ", "راض عنه", "جيد ", "ممتاز"],
                  minRateDescription: "يحتاج إلى تحسين ",
                  maxRateDescription: "ممتاز",
                },
                {
                  type: "comment",
                  name: "comments",
                  title: "أضف اقتراحات أو تعليقات",
                  hideNumber: true,
                  rows: 3,
                  autoGrow: true,
                },
              ],
            },
          ],
          showQuestionNumbers: "onPage",
          completeText: "Submit",
          firstPageIsStarted: true,
          widthMode: "static",
          width: "1200",
          headerView: "advanced",
        };

        res.render("lesson/lessonRate", {
          pageTitle: `تقييم الدرس: ${lessn.title}`,
          lessn: lessn,
          temp: JSON.stringify(json),
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.postLessonRate = async (req, res, next) => {
  try {
    const lessonId = req.params.id;
    const userId = req.user.id;
    const ratingData = req.body;

    console.log("userId============>>" + userId);
    console.log("lessonId============>>" + lessonId);
    console.log(req.body);

    const existingFeedBack = await FeedBack.findOne({
      where: {
        userId: userId,
        lessonId: lessonId,
      },
    });

    if (existingFeedBack) {
      return res.status(400).json({ message: "لقد قمت بتقييم الدرس بالفعل" });
    }

    await FeedBack.create({
      userId: userId,
      lessonId: lessonId,
      rating: ratingData,
      createdAt: new Date(),
    });
    res.status(200).json({
      message: "تم إرسال التقييم بنجاح",
      rating: ratingData,
      time: new Date(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error submitting" });
  }
};

/* "method":{"definition":{"key":"find_slope_line","args":[]},"localization":{"locale":"en","tokens":[{"type":"text","text":"Find t
 */
