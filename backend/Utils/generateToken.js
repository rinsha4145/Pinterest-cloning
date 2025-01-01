const jwt =require("jsonwebtoken")
 const generateToken=(user,res)=>{      
    const token = jwt.sign({ id: user._id,email: user.email },process.env.JWT_KEY,{ expiresIn: '3d' });
    const refreshToken = jwt.sign({ id: user._id,email: user.email },process.env.JWT_KEY,{ expiresIn: '7d' });
        
    // Set cookies for tokens 
    res.cookie("token", token, {
        httpOnly: false,
        secure: true, 
        sameSite: "none",
        maxAge: 3 * 24 * 60 * 60 * 1000 
    });

    res.cookie("refreshtoken", refreshToken, {
        httpOnly: false,
        secure: true, 
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    res.cookie("user", user, {
        httpOnly: false,
        secure: true, 
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000 
    })

 }

 module.exports = {generateToken}