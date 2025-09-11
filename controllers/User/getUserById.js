const User = require("../../Models/User/User")
// Update User

exports.getUserById = async (req, res) => {
    try {

        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
                success: false,
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'User fetched successfully',
            status: "success",
            data: user
        });

    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
        console.log(error);
    }
}