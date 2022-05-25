const UserModel = require('../Models/User.Model');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    create: async (req, res) => {
        const { name, email, password } = req.body;

        if(name == "")
        {
            return res.send({ message: "you need a name"});
        } else if (email == "")
        {
            return res.send({ message: "you need a email"});
        } else if (password == "")
        {
            return res.send({ message: "you need a strong password"});
        } else if (name.length < 4)
        {
            return res.send({ message: "you need a name longer than 4 characters"});
        } else if (password.length < 6)
        {
            return res.send({ message: "your password is too weak, try other"});
        }

        let formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!formatEmail.test(email))
        {
            return res.send({
                message: "this email format is invalid, please try again"
            });
        }

        const verifyEmail = await UserModel.findOne({email: email});
        if(verifyEmail)
        {
            return res.send({
                message: "this email already used"
            });
        } else
        {
            const hashPassword = bcrypt.hashSync(password, salt);

            await UserModel.create({
                name: name,
                email: email,
                password: hashPassword
            });

            return res.send({name,email});
        }
    },
}