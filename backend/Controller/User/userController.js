const User=require('../../Models/userSchema')
const {userValidationSchema,loginValidationSchema} = require('../../Models/validation')
const {ValidationError}=require('../../Utils/customeError')
const bcrypt = require('bcrypt');
const { generateToken } = require('../../Utils/generateToken');


//user registration
const userReg = async (req,res,next)=>{
    const {value,error}=userValidationSchema.validate(req.body);
    if(error){
        return next(new ValidationError(error.details[0].message, 400))
        
    }
    const { email, password,birthdate } = value;
    const existingUser = await User.findOne({ email  }); 
    if (existingUser) {
        return next(new ValidationError(`The email '${email}' is already in use. Please use a different email.`));
    }
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new User({email, password: hashedPassword,birthdate}); 
        await newUser.save();
        res.status(200).json({ status: 'success', message: 'User registered successfully', newUser });

}

const userLogin = async (req, res,next) => {
    const { value, error } = loginValidationSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new CustomError('user not found', 404));
    }
    const matching = await bcrypt.compare(password,user.password);
    if (!matching) {
       return next(new CustomError('The Email or UserName is incorrect', 404));
    }
    const isblock= user.isBlocked
  
    if(isblock){
        // return res.status(404).json({message:"user is blocked"})
        return next(new CustomError('you are blocked contact the admin', 404));
    }
    if(!user.admin){
        generateToken(user,res)
        res.status(200).json({ status: 'success', message: "User Logged in successfully"});
    }
}   

//own profile view
const profileView = async (req, res) => {
        const profile = await User.findById(req.userId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
};



//user logout
const userLogout = async (req, res) => {
    res.clearCookie('token', {     
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.clearCookie('refreshtoken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.clearCookie('user', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });

    
    res.status(200).json({ status: 'success', message: 'Logout successful' });
};

module.exports = { userReg,userLogin,userLogout,profileView};
