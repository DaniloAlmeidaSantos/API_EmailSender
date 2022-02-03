const db = require('../../config/db');
const mailSender = require('../../config/mailerConfig');

module.exports = {
    /**
     * Method for send email
     * 
     * @param {String} subject 
     * @param {String} text 
     * @param {int} id 
     * @returns 
     */
    async emailSender(subject, text, id) {
        var status = 200;
        var message;

        await db.columns('US_EMAIL', "US_ID").where('US_ID', id).select().table('JB_USERS')
        .then(data => {
            if (data.length > 0) {
                const sendEmail = {
                    from: process.env.MAIL_USER_EMAIL,
                    to: data[0].US_EMAIL,
                    subject: subject,
                    text: text
                }
                
                mailSender.sendMail(sendEmail, function(error) {
                    console.log(error);
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




