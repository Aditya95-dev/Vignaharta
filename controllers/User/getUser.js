const User = require("../../Models/User/User")

exports.getUser = async(req,res)=>{
    try{
        const user = await User.find();
        res.status(200).json({
            status: 'success',
            message: 'User fetched successfully',
            success: true,
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
        console.log(error);
    }
}