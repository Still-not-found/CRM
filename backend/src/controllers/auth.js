const userModel = require('../models/users');
const loginHistoryModel = require('../models/login_history');
const bcrypt = require("bcrypt");
const { FRONT_END_URL, APP_KEY, DEFAULT_PASSWORD } = process.env;
const sendMail = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");
const Role = require("../utils/userRoles");
const status = require("../helpers/Response");
const { validationResult } = require("express-validator");
const saltRounds = 10;

const authController = {
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const { email, password } = req.body;
      
      const existingUser = await userModel.getUsersByCondition({ email });
      if (existingUser.length > 0) {
        if (!Boolean(existingUser[0].is_verified)) {
          return status.ResponseStatus(res, 401, "Email not verified");
        }
        const compare = await bcrypt.compare(
          password,
          existingUser[0].password
        );
        if (compare) {
          const { user_id, first_name, last_name, email, user_name} = existingUser[0];
          const history = await loginHistoryModel.createLoginHistory({ user_id, first_name, last_name, email, user_name, status:'Logged-In'});
          const token = jwt.sign({ session_id:history.insertId }, APP_KEY, { expiresIn: '1d' });
          return res.status(200).json({
            status: true,
            message: "Login successfully",
            session_id: history.insertId,
            token,
            user_data: existingUser[0],
          });
        } else {
          return status.ResponseStatus(res, 401, "Incorrect password");
        }
      } else {
        return status.ResponseStatus(res, 401, "Incorrect email");
      }
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },
  logout:async (req, res) => {
    try{
      const {session_id} = req.body;
      const result = await loginHistoryModel.updateStatusById(session_id,"Logged-Out");
      if(result.affectedRows>0){
        return status.ResponseStatus(res,200,"Logout successfully");
      }else{
        return status.ResponseStatus(res,401,"Logout unsuccessfull");
      }
    }catch(error){
    console.error("Error during logout:", error.message);
    return status.ResponseStatus(res, 500, "Internal server error", {
      error: error.message,
    });
    }
  },
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const {
        firstName,
        lastName,
        email,
        phone,
        userName,
        password = DEFAULT_PASSWORD,
        role = Role.User,
      } = req.body;
      const user = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        user_name: userName,
        password: password,
        role: role,
      };
      const result_email = await userModel.getUsersByCondition({ email });
      const result_username = await userModel.getUsersByCondition({
        user_name:user.user_name,
      });
      if (result_email.length > 0) {
        return status.ResponseStatus(res, 409, "Email already exists");
      } else if (result_username.length > 0) {
        return status.ResponseStatus(res, 409, "Username already exists");
      } else {
        
        // Hash the password before storing in the database
        const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
        console.log(hashedPassword);
        user.password = hashedPassword;
        // console.log(user);
        const createdUser = await userModel.createUser(user);
        // console.log(createdUser);
        if (createdUser.insertId > 0) {
          const token = jwt.sign({ id: createdUser.insertId }, APP_KEY, {
            expiresIn: "1d",
          });

          const mailSubject = "Account created - ITAM";
          const verifyLink = `${FRONT_END_URL}/mail_verification/${token}`;

          const mailContent = `<p>Hi ${user.first_name} ${user.last_name}, Please Verify</p>
                <p>Your User account has been created in ITAM.</p>
                <p>Your login details:</p>
                <ul>
                    <li>Username: ${user.email}</li>
                    <li>Password: ${password}</li>
                </ul>
                <p>Please click on the link to verify your email and log in at ITAM <a href="${verifyLink}"> Click Here </a> and change your password for security.</p>
                <p>If you need any assistance, contact us at raghul.je@refex.co.in.</p>
                <div style="text-align: center;">
<a href="https://refexgroup.com/">
    <img src="https://suitecrm.refex.group/ITAM.png" alt="ITAM" style="max-width: 100px;">
</a>
</div>
                <p>Best regards,</p>
                <p>Raghul JE<br>Jr Software Developer<br>Refex Groups</p>`;

                sendMail(user.email, mailSubject, mailContent, async (error, info)=>{
                  if (error) {
                    await userModel.deleteUserById(createdUser.insertId);
                    return status.ResponseStatus(res, 400, "User Registration Failed",{error:error});
                  } else {
                    return status.ResponseStatus(res,201,"User Registered Successfully",{ token: token,info:info });
                  }
                });
        } else {
          return status.ResponseStatus(res, 400, "User Registration Failed");
        }
      }
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },
  verifyMail: async (req, res) => {
    try {
      const { token } = req.params;
      // Verify token
      const user = jwt.verify(token, APP_KEY);
      // Update user's verification status
      const result = await userModel.updateUserById(user.id, {
        is_verified: 1,
      });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "E-mail verified successfully..!");
      } else {
        return status.ResponseStatus(res, 401, "E-mail verification failed..!");
      }
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.getUsersByCondition({ email });

      if (!user.length > 0){
        return status.ResponseStatus(res, 404, "Email not exist");
      }

      const token = jwt.sign({ user: user[0] }, APP_KEY, { expiresIn: "30m",});
      const resetLink = `${FRONT_END_URL}/reset_password/${token}`;

      const mailSubject = 'Password Reset Request - IT Asset Management';
      const mailContent = `
      <p>Dear ${user[0].first_name},</p>
      <p>We have received a request to reset your password for IT AssetManagement. To proceed, please click the following link:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If you did not initiate this password reset, kindly disregard this email.</p>
      <p>Thank you for using IT AssetManagement.</p>
      <div style="text-align: center;">
  <a href="https://refexgroup.com/">
      <img src="https://suitecrm.refex.group/ITAM.png" alt="IT Asset Management" style="max-width: 100px;">
  </a>
</div>
  `;
        
      sendMail(email, mailSubject, mailContent,(error, info)=>{
        if(error){
          return status.ResponseStatus(res, 400, "Password reset link mail failed to send",error);
        }else{
          return status.ResponseStatus(res, 200, "Password reset link mail sent successfully",info);
        }
      });

    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const {password, confirm_password} = req.body;
      if(password !== confirm_password){
        return status.ResponseStatus(res,400,"Password and confirm password doesn't match");
      }
      const hashedPassword = bcrypt.hashSync(confirm_password, saltRounds);
      // Verify token
      const decoded = jwt.verify(token, APP_KEY);
      const result = await userModel.updateUserById(decoded.user.id,{password:hashedPassword});
      if(result.affectedRows>0){
        return status.ResponseStatus(res,200,"Password reseted successfully");
      }else{
        return status.ResponseStatus(res,400,"Password reset failed");
      }
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },
  verifyToken: async (req,res) =>{
    try {
      const {token} = req.params;
            // Verify token
            const decoded = jwt.verify(token, APP_KEY);
            return status.ResponseStatus(res,200,"Valid Token", decoded);
    } catch (error) {
      if(error.name === 'TokenExpiredError'){
        return status.ResponseStatus(res,401,"Token has expired!");
    }else{
      return status.ResponseStatus(res,401,"Invalid token!");
    }
  }
},
};

module.exports = authController;
