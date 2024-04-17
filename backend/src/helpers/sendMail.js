const nodemailer = require('nodemailer');
const { SMTP_MAIL, SMTP_PASSWORD } = process.env;

const sendMail = async(email, mailSubject, content, callback)=>{

     try{
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your SMTP server 
            port: 465,
            secure: true,
            requireTLS: true,
            auth: {
            user:SMTP_MAIL, // Replace with your email
            pass:SMTP_PASSWORD // Replace with your email password
            }

        });

        const mailOptions = {
            from:SMTP_MAIL,
            to:email,
            subject:mailSubject,
            html: content
        }
       
       transport.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log(error);
                callback(error,null);
            }
            else{
                console.log('Mail sent successfully!', info.response);
                callback(null,info.response);
            }
        });

     } catch (error){
        console.log(error.message);
        callback(error.message,null);
     }

}

module.exports = sendMail;