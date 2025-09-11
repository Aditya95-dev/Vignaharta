const User = require("../../Models/User/User")

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { } = req.body;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            success: true,
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user' });
        console.log(error);
    }
}