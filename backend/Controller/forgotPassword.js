const crypto = require('crypto');
const User=require('../Models/userSchema')

const nodemailer = require('nodemailer');
const forgotpass=async(req, res) => {
    const {email} = req.body;
    User.findOne({email: email})
   
    .then(user => {
        if(!user) {
            return res.send({Status: "User not existed"})
        } 
        const token = jwt.sign({ id: user._id,email: user.email },process.env.JWT_KEY,{ expiresIn: '3d' });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rinujouhar@gmail.com',
              pass: 'rinsha@4145'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: User.email,
            subject: 'Reset Password Link',
            text: `http://localhost:4000/reset_password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
}
module.exports = { forgotpass};
