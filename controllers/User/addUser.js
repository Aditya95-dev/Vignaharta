const User = require("../../Models/User/User")

// Add User
module.exports.addUser = async (req, res, next) => {
    try {
        const { name, email, password, role, phone,  status } = req.body;
        const user = new User({
            name,
            email,
            password,
            role,
            phone,
            status,
        });
        await user.save();
        res.status(201).json({
             status: 'success',
             message: 'User added successfully',
             success: true,
             data: user,

         });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding user' });
        console.log(error);
    }
}