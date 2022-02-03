const express = require('express');
const router = express.Router();

const sendNoAttach = require('../libs/sendEmailNoAttach');
const sendHTML = require('../libs/sendMailHtmlBody');

router.post('/mail/send/no-attach/:id', (req, res) => {
    const { subject, text } = req.body;
    const { id } = req.params;
    
    const status = sendNoAttach.emailSender(subject, text, id);

    status
    .then(data => {
        res.status(data[0]).json({message: data[1], statusCode: data[0]});
    })
    .catch(err => {
        res.status(500).json({message: `Fail: ${err}`, statusCode: 500});
    });
});

router.post('/mail/send/body-html/:id', (req, res) => {
    const { subject, htmlPath, variables, type } = req.body;
    const { id } = req.params;

    const status = sendHTML.emailSender(subject, htmlPath, variables, type, id);

    status
    .then(data => {
        res.status(data[0]).json({message: data[1], statusCode: data[0]});
    })
    .catch(err => {
        res.status(500).json({message: `Fail: ${err}`, statusCode: 500});
    });
});

router.post('/mail/send/attachment/:id', (req, res) => {
    const { subject, attachment } = req.body;
    const { id } = req.params;
});

module.exports = router;