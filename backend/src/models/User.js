const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

UserSchema.pre('save', function(next) {
    var user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        } 

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function(candidatePassword, callback) {
    console.log(candidatePassword);
    console.log(this.password)
    return console.log(await bcrypt.compare(candidatePassword, this.password));
};

module.exports = mongoose.model('User', UserSchema);