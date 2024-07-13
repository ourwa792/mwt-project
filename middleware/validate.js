// middlewares/passwordValidator.js
module.exports = (req, res, next) => {
    const { password, confirmPassword, token } = req.body;
  
    if (!password || !confirmPassword) {
      req.flash('error', 'كلمة المرور وتأكيد كلمة المرور مطلوبان');
      console.log(req.originalUrl)
      console.log('Setting flash error: كلمة المرور وتأكيد كلمة المرور مطلوبان');
      return res.redirect(`reset-password/${token}`)
    }
  
    if (password !== confirmPassword) {
      req.flash('error', 'كلمة المرور غير مطابقة');
      console.log('Setting flash error: كلمة المرور غير مطابقة');
      return res.redirect(`reset-password/${token}`);
    }
  
    next();
  };
  