// المسار: /src/middleware/isAdmin.js
const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(403).render('error',{
            pageTitle: 'لست في الجلسة' ,
            err: 'لست في الجلسة'
        })
    }

    if (!req.user.isAdmin) {
        
        //return res.status(403).send('Access denied. Admins only.');
        return res.status(403).render('error',{
            pageTitle: 'لست أدمن' ,
            err: 'لست الادمن'
        })
    }

    next();
};

module.exports = isAdmin;
