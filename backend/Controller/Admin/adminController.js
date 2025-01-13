const User=require('../../Models/User/userSchema')
const {userValidationSchema,loginValidationSchema} = require('../../Models/validation')
const {ValidationError,NotFoundError}=require('../../Utils/customeError')
const bcrypt = require('bcrypt');
const { generateToken } = require('../../Utils/generateToken');


//user login
const adminLogin = async (req, res,next) => {
    const { value, error } = loginValidationSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ValidationError('user not found', 404));
    }
    const matching = await bcrypt.compare(password,user.password);

    if (!matching) {
       return next(new ValidationError('The Email or UserName is incorrect', 404));
    }   
    
    if(user.admin){
        generateToken(user,res)
        res.status(200).json({ status: 'success', message: "Admin Logged in successfully"});
    }
}   

//admin logout
const adminLogout = async (req, res) => {
    res.clearCookie('admtoken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.clearCookie('admrefreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.clearCookie('admin', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.status(200).json({ status: 'success', message: 'Logout successful' });
    };

module.exports = {adminLogin,adminLogout};    