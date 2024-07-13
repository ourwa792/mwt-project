require('dotenv').config()

const {cloudinary} = require('../config/cloudinary')
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const {User, FeedBack, Lesson} = require("../model/association") ;



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "user_profiles",
      format: "png" || "jpg",
      public_id: `${req.user.id}-${Date.now()}`,
    };
  },
});

const upload = multer({ storage: storage });

exports.getProfile = async (req, res, next) => {
    try {
        if (req.user){
            const userId = req.user.id ; 
            console.log('======='+userId+'=====')
            const feedbacks = await FeedBack.findAll({
                where: {userId: userId} ,
                include: [
                    { model: User, attributes: ['userName'] },
                    { model: Lesson, attributes: ['title'] }
                ] ,
                order: [['createdAt', 'DESC']]
            })
            console.log("feedback=========="+JSON.stringify(feedbacks))
            res.render('profile', {pageTitle: 'Profile', user: req.user,
              feedbacks: feedbacks || [],
            }) 
        }
    } catch (error) {
      console.log(error);
      next(error);
    }
};

exports.uploadProfileImage = [
  upload.single("profileImage"),
  async (req, res) => {
    if (!req.user) {
      return res.redirect("/login");
    }

    if (req.user.cloudinaryId) {
      await cloudinary.uploader.destroy(req.user.cloudinaryId);
    }

    req.user.avatar = req.file.path;
    req.user.cloudinaryId = req.file.filename;
    await req.user.save();
    console.log("THE PATH :" + req.file.path);
    console.log("THE FILEname :" + req.file.filename);
    res.redirect("/profile");
  },
];
