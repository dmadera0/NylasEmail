require('dotenv').config();

const Nylas = require('nylas')


const nylas = Nylas.with(process.env.Access_Token)



Nylas.config({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
})

const draft = nylas.drafts.build({
    subject: "Nylas CC",
    body: "Nylas interview tak home challenge",
    to: [{name: "dantheMan", email:"dmadera0@gmail.com"}]
})

module.exports = async (req, res) => {
    const form = formidable({ multiples: true });
  
    return form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(400).json({
          error: "Failed to parse file upload."
        });
      }
  
      const upload = files.upload;
  
      if (!upload) {
        return res.status(400).json({
          error: "No file uploaded."
        });
      }
  
      const filename = upload.name;
      const data = await fs.readFile(upload.path);
      const contentType = upload.type;
  
      try {
        const file = req.nylas.files.build({
          filename: "./index.js",
          data: data,
          contentType
        });
  
        await file.upload();
  
        res.json({
          id: file.id,
          filename: file.filename
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: "Failed to upload file to email account."
        });
      }
    });
  };
    
draft.send().then(message => {
    console.log(`${message.body} was sent`);
});    

