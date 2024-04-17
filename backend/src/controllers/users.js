const userModel = require('../models/users');
const status = require('../helpers/Response');
const bcrypt = require('bcrypt');
const Role = require('../utils/userRoles');
const {DEFAULT_PASSWORD} = process.env;
const { validationResult } = require('express-validator');
const saltRounds = 10;

const usersController = {
    getAllUsers : async (req, res)=>{
        try{
            const users= await userModel.getAllUsers();
            if(users.length>0){
                return status.ResponseStatus(res,200,'List of all users',users);
            }else{
                return status.ResponseStatus(res, 404,'User not exists');
            }
        } catch (error){
            console.log(error);
            return status.ResponseStatus(res,500,'Internal server error',{ error: error.message.message});
        }
    },
    // getUserById : async (req, res)=>{
    //     const id=req.params.id;
    //     try {
    //         const user= await userModel.getUserById(id);
    //         if(user.length>0){
    //             return status.ResponseStatus(res,200,`Details of User`,user);
    //         }else{
    //             return status.ResponseStatus(res, 404,'User not exists');
    //         }
    //     } catch (err) {
    //         return status.ResponseStatus(res,500,'Internal server error', null,{ error: err.message });
    //     }
    // },
    getUserByUserId : async (req, res)=>{
        try {
            const user_id=req.params.user_id;
            const user = await userModel.getUsersByCondition({user_id});
            if(user.length>0){
                return status.ResponseStatus(res,200,`Details of User(${user_id})`,user);
            }else{
                return status.ResponseStatus(res, 404,'User not exists');
            }
        } catch (error) {
            console.log(error);
            return status.ResponseStatus(res,500,'Internal server error',{ error: error});
        }
    },
    createUser : async (req, res)=>{
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return status.ResponseStatus(res, 400, "Validation Failed", errors);
            };
            const { firstName, lastName, email, phone, userName, password = DEFAULT_PASSWORD, role = Role.User } = req.body;
            const user = {
                first_name: firstName, 
                last_name: lastName, 
                email: email, 
                phone: phone, 
                user_name: userName,
                password: password,
                role: role,
            };

            const result_email = await userModel.getUsersByCondition({email});
            const result_username = await userModel.getUsersByCondition({user_name:user.user_name});
            if (result_email.length > 0) {
                return status.ResponseStatus(res,409,'Email already exists');
            } else if (result_username.length>0) {
                return status.ResponseStatus(res,409,'Username already exists');
            } else {
                // Hash the password before storing in the database
                const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
                user.password = hashedPassword;
                // console.log(user);
                const createdUser = await userModel.createUser(user);
                // console.log(createdUser);
                if(createdUser.insertId > 0){
                    const newUser = await userModel.getUserById(createdUser.insertId);
                    return status.ResponseStatus(res,201,"User Created Successfully",newUser);
                }else{
                    return status.ResponseStatus(res,400,"User Creation Failed");
                }
        }
        } catch (error) {
            console.log(error);
            return status.ResponseStatus(res,500,'Internal server error', { error: error.message});
        }
    },
    updateUserByUserId : async (req, res) => {
        try {
            const errors = validationResult(req);;
            if(!errors.isEmpty()){
                return status.ResponseStatus(res, 400, "Validation Failed", errors);
            };
        const user_id=req.params.user_id;
        const { first_name, last_name, email, phone, user_name, password, is_verified, role} = req.body;
        const user = {
            first_name: first_name, 
            last_name: last_name,
            email: email,
            phone: phone, 
            user_name: user_name,
            password: password,
            is_verified: is_verified,
            role: role,
        };
            // Hash the password before storing in the database
            const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
            user.password = hashedPassword;
            const result = await userModel.updateUserByCondition({user_id},user);
            if(result.affectedRows>0){
                return status.ResponseStatus(res,200,`User Updated Successfully(${user_id})`,{user_id});
            }else{
                return status.ResponseStatus(res, 404,`Failed To Update User(${user_id})`,{user_id});
            }
        } catch (error) {
            console.log(error);
            return status.ResponseStatus(res,500,'Internal server error',{ error: error.message});
        }
    },
    deleteUserByUserId : async (req, res) =>{
        try {
        const user_id=req.params.user_id;
            const result = await userModel.deleteUserByCondition({user_id});
            if(result.affectedRows>0){
                return status.ResponseStatus(res,200,`User Deleted Successfully(${user_id})`,{user_id});
            }else{
                return status.ResponseStatus(res, 404,`Failed To Delete User(${user_id})`,{user_id});
            }
        } catch (error) {
            console.log(error);
            return status.ResponseStatus(res,500,'Internal server error',{ error: error.message});
        }
    }
};

module.exports = usersController;