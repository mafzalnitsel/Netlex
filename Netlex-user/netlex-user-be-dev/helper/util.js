const generator = require('generate-password');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
function getWelcomeContent(user, newPassword) {
    let htmlContent = '';
    htmlContent += "Hello " + user.firstName + " " + user.lastName + "<br>";
    htmlContent += "Thank you for registering<br>";
    htmlContent += "Your UserName is: " + user.userName + "<br>";
    htmlContent += "Your Password is: " + newPassword + "<br><br>";
    htmlContent += "Please keep your username and password safe as you will need them to access your account. " +
        "If you forget your password, simply go to the login page and use the ‘forgotten password’ link.<br><br>" +
        "Kind regards,<br>" +
        "Netlex<br>";
    return htmlContent;
}

exports.generatePassword =  function () {
    return generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true
    });
}

function getForgotPasswordContent(user, newPassword) {
    let htmlContent = '';
    htmlContent += "Hello " + user.firstName + " " + user.lastName + "<br>";
    htmlContent += "Your New Password is: " + newPassword + "<br><br>";
    htmlContent += "Please keep your username and password safe as you will need them to access your account. <br><br>" +
        "Kind regards,<br>" +
        "Netlex<br>";
    return htmlContent;
}

exports.sendmail = function (user, newPassword, emailType) {
    let htmlContent = '';
    let subject = '';
    if(emailType === 'registration') {
        htmlContent = getWelcomeContent(user, newPassword);
        subject = 'Registration confirmation';
    } else if (emailType === 'forgotpassword') {
        htmlContent = getForgotPasswordContent(user, newPassword);
        subject = 'New Password';
    }
    const transporter = nodemailer.createTransport(smtpTransport({
        host:'smtp.itagenturen.com',
        // service:'gmail',
        // secureConnection: false,
        tls: {
            rejectUnauthorized: false
        },
        // port: 25,
        auth: {
            user:'murugesan.m@itagenturen.com',
            pass: 'QqssMuru090775$',
        }
    }));


    let mailDetails = {
        from: 'murugesan.m@itagenturen.com',
        to: user.email,
        subject: subject,
        html: htmlContent
    };

    transporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.error('Error Occurs', err);
        }
    });
}
