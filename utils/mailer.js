var nodmailer = require('nodemailer')
/* module.exports = function mailerReset (reciver, tk) {

    const transporter = nodmailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ourwa94svu@gmail.com' ,
            pass:  'fecjhtikbasguifz',
        }
    })
    
    let mailOptions = {
        from: 'ourwa94svu@gmail.com',
        to: reciver,
        subject: ' اعادة تعيين كلمة المرور',
       // text: `مرحبا ${reciver} شكرا لك على  تسجيلك في موقع عروة التعليمي . بإمكانك الدخول الي حسابك`
        text: `يمكنك تغيير كلمة المرور من خلال الرابط <a href="http://localhost:2000/reset/${tk}">LINK</a>`
    }
        transporter.sendMail(mailOptions, (error, info) => {
            if(err) {
                console.log(err)
            }
            else{
                console.log('email sent : '+ info.response)
            }
        })
} */


exports.mailerReset = async (reciver, token) => {

    const transporter = nodmailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ourwa94svu@gmail.com' ,
            pass:  'fecjhtikbasguifz',
        }
    })
    
    let mailOptions = {
        from: 'ourwa94svu@gmail.com',
        to: reciver,
        subject: ' اعادة تعيين كلمة المرور',
        text: ` تغيير كلمة المرور  ` ,
        html: `<p>اضغط على هذا الرابط لإعادة تعيين كلمة المرور الخاصة بك</p> <br/>
        <a href="http://localhost:8000/reset-password/${token}">  اعادة ضبط كلمة المرور</a>   `
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent---' + info.response)

    } catch (error) {
        console.error('ERROR sending email ---',error)
    }

}

exports.mailerSignup = async (reciver) => {

    const transporter = nodmailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ourwa94svu@gmail.com' ,
            pass:  'fecjhtikbasguifz',
        }
    })
    
    let mailOptions = {
        from: 'ourwa94svu@gmail.com',
        to: reciver,
        subject: ' اعادة تعيين كلمة المرور',
        text: `مرحبا ${reciver} شكرا لك على  تسجيلك في موقع عروة التعليمي . بإمكانك الدخول الي حسابك`
        //text: `يمكنك تغيير كلمة المرور من خلال الرابط <a href="http://localhost:2000/reset/${tk}">LINK</a>`
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent---' + info.response)

    } catch (error) {
        console.error('ERROR sending email ---',error)
    }
}