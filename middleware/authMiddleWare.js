// اذا مو عامل لوغين مافي يعمل بروفايل
exports.protectedRoute = (req, res, next) =>{
    if (! req.session.user) {
        return res.redirect('/login')
    }
    next()

}
// اذا اوثنتيكيت مافي داعي تروح للوغين 
exports.guestRout = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/profile')
    }
    next()
}