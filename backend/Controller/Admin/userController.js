const User=require('../../Models/User/userSchema')
const CustomError=require('../../Utils/customeError')


//get all Users
const allUsers=async(req,res,next)=>{
    const users=await User.find({admin:false})
    const totalUsers = await User.countDocuments({ admin: false });
    if(!users){
        return next(new CustomError('users not found', 404))
    }
    res.status(200).json({users,totalUsers})

}

//get a specific user by id
const viewUserById=async(req,res,next)=>{
    const userbyid=await User.findById(req.params.id).select('-password');
    if(!userbyid){
        return next(new CustomError('user with this Id is not found', 404))
    }
    res.status(200).json({userbyid})
}

//block the user
const blockUser=async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new CustomError('User with this ID not found', 404))
    }

    if (user.isBlocked === true) {
        user.isBlocked = false;
        await user.save();
        return res.status(200).json({ message: 'User has been successfully unblocked',user });
    } else {
        user.isBlocked = true;
        await user.save();
        return res.status(200).json({ message: 'User has been successfully blocked',user });
    }


};

module.exports={allUsers, viewUserById, blockUser}