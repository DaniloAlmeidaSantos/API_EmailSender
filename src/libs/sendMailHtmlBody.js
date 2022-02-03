const db = require('../../config/db');
const mailSender = require('../../config/mailerConfig');
const fs = require('fs');

const handlebars = require('handlebars');

module.exports = {
    /**
     * Method for send email with html
     * 
     * @param {String} subject 
     * @param {String} text 
     * @param {int} id 
     * @param {String} htmlPath
     * @returns 
     */
    async emailSender(subject, htmlPath, variables, id) {
        var status = 200;
        var message = "Send e-mail success";

        var readHTMLFile = function(path, callback) {
            fs.readFile(path, {encoding: 'utf-8'}, function(err, html) {
                if (err) {
                    status = 400;
                    message = `Fail: ${err}`;
                } else {
                    callback(null, html);
                }
            });
        };

        await db.select().where('US_ID', id).table('JB_USERS')
        .then(data => {
            if (data.length > 0) {
                readHTMLFile(htmlPath, function(err, html) {
                    if (err) {
                        console.error(err);
                    } else {
                        var template = handlebars.compile(html);
                        var key, value, htmlToSend, htmlToSend;

                        var replacements = {};

                        for (var i = 0; i < variables.length; i++) {
                            key = variables[i].key;
                            value = variables[i].value;

                            replacements[key] = value;
                        }

                        htmlToSend = template(replacements)

                        const sendEmail = {
                            from: process.env.MAIL_USER_EMAIL,
                            to: data[0].US_EMAIL,
                            subject: subject,
                            html: htmlToSend
                        }

                        mailSender.sendMail(sendEmail, function(error) {
                            if (error) {
                                status = 400;
                                message = `Send email failed: ${error}`;
                            }
                        });
                    }
                })
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




