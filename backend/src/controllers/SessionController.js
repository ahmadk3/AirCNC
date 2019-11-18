//index, show, store, update, destroy
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        let user = await User.findOne({email: email});

        if(!user) {

            user = await User.create({email: email, password: password});
            return res.json(user);
        
        } else {
        
            res.status(409);
            return res.json({
                error: true,
                errorMessage: "User already exists"
            })
        
        }

    },

    async index(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        let user = await User.findOne({email: email});
        var authSucceded = false;

        if(!user) {
            res.status(404);
            return res.json({
                error: true,
                errorMEssage: `User ${email} not found`
            });
        } else {
            if(await user.comparePassword(password)) {
                return res.json(user);
            } else {
                res.status(401);
                return res.json({
                    error: true,
                    errorMEssage: `Invalid credentials`
                });
            }
        }
    }
};