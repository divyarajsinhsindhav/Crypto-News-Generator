const { body } = require('express-validator')
const bcrypt = require('bcrypt')

exports.validateLogin = [
    body('email').isEmail().withMessage('Please enter valid email')
                .custom(async (value) => {
                    const user = await User.findOne({ email: value });
                    if (!user) {
                        throw Error("User doesn't exist")
                    }
                }),
    body('password').custom(async (value, { req }) => {
            const user = await User.findOne({ email: req.body.email });
            const password = user.password;
            const check = await bcrypt.compare(value, password)
            if (!check) {
                throw Error('Invalid Password')
            }
        }),
]