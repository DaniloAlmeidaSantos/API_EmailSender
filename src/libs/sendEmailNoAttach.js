const db = require('../../config/db');
const mailSender = require('../../config/mailerConfig');

module.exports = {
    /**
     * 
     * @param {String} subject 
     * @param {String} text 
     * @param {int} id 
     * @returns 
     */
    emailSender(subject, text, id) {
        var status = 200;
        var message;

        db.columns('email').where('id', id).select().table('users')
        .then(data => {
            if (data.length > 0) {
                const sendEmail = {
                    from: process.env.MAIL_USER_EMAIL,
                    to: data[0].EMAIL,
                    subject: subject,
                    text: text
                }
        
                mailSender.sendMail(sendEmail, function(error) {
                    if (error) {
                        status = 400;
                        message = `Send email failed: ${error}`;
                    } else {
                        message = "Send e-mail success";
                    }
                });
            } else {
                status = 400;
                message = "Send e-mail failed: no search for email.";
            }
        })
        .catch(err => {
            status = 500;
            message = `Fail in server ${err}`;
        });

        return [status, message];
    }
}




