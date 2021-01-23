require('dotenv').config();

const Nylas = require('nylas')
const fs = require('fs');

const nylas = Nylas.with(process.env.Access_Token)

Nylas.config({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
})

const draft = nylas.drafts.build({
    subject: "Nylas CC",
    body: "Nylas interview take home challenge, Ready for review",
    to: [{name: "Daniel Madera", email:"dmadera0@gmail.com"}]
})
    
draft.send().then(message => {
    console.log(`${message.subject} was sent`);
}); 

// ///Attempt to upload as attachment for email///

// ///file i want to send///
// const filePath = "./index.js"


// fs.readFile(filePath, function (err, data) {
//     f = nylas.files.build({
//         filename: filePath,
//         data: data,
//         contentType: 'text/plain'
//     });


// ///Uploading the file to Nylas API////
//     f.upload(function(err, filePath) {
//         // Create the draft and attach the file to it.
//         const draft = nylas.drafts.build({
//             subject: 'Nylas CC',
//             to: [{name: "Daniel Madera", email: 'dmadera0@gmail.com'}],
//             body: 'Hey, find the file attached.',
//         });
//         ////attaching the file
//         draft.files = [filePath];

//         ////console log is showing the draft it but not sending to email////
//         draft.send().then(function(draft) {
//             console.log(draft.id + ' was sent');
//         });
//     });

