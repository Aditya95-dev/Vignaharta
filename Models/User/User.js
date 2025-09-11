const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    }

},
    { timestamps: true }
);


// hashed password before saving
userSchema.pre('save', async function (next) {
    // this.display_name = this.first_name + ' ' + this.last_name;

    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12)
    next()
});

// comparing password
userSchema.methods.correctPassword = async function (enteredPassword, userPassword) {
    return await bcrypt.compare(enteredPassword, userPassword)
}


const User = mongoose.model('User', userSchema);
module.exports = User;


