const UserModel = require('../Models/User.Model');
const bcrypt = require('bcryptjs');
const { json } = require('express/lib/response');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    create: async (req, res) => {
        const { name, email, password } = req.body;

        if(name == "")
        {
            return res.send({ message: "you need a name"}).end()
        } else if (email == "")
        {
            return res.send({ message: "you need a email"}).end()
        } else if (password == "")
        {
            return res.send({ message: "you need a strong password"}).end()
        } else if (name.length < 4)
        {
            return res.send({ message: "you need a name longer than 4 characters"}).end()
        } else if (password.length < 6)
        {
            return res.send({ message: "your password is too weak, try other"}).end()
        }

        let formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!formatEmail.test(email))
        {
            return res.send({
                message: "this email format is invalid, please try again"
            }).end();
        }

        const verifyEmail = await UserModel.findOne({email: email});
        if(verifyEmail)
        {
            return res.send({
                message: "this email already used"
            }).end();
        } else
        {
            const hashPassword = bcrypt.hashSync(password, salt);

            await UserModel.create({
                name: name,
                email: email,
                password: hashPassword
            });

            
            return res.send({message: 'user sucessfully created!'}).end()
        }
    },

    login: async (req, res) => {
        const { email, password} = req.body;

        const findUser = await UserModel.findOne({email: email});

        if (findUser)
        {
            const passwordCompare = await bcrypt.compareSync(password, findUser.password);

            if(passwordCompare)
            {

                var sess = req.session;
                sess.name = findUser.name;
                sess.email = findUser.email;
                sess.userId = findUser._id;
                sess.login = true;

                return res.send({
                    name: sess.name,
                    email: sess.email,
                    userId: sess.userId,
                    login: sess.login
                }).end();
            } else
            {
                return res.send({ message: "invalid password" }).end();   
            }
        } else {
            return res.send({ message: "email not found" }).end();
        }
    },

    logout: async (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.send({ message: err }).end();
            }

            return res.send({
                session: req.session
            }).end();
        });
    }
}