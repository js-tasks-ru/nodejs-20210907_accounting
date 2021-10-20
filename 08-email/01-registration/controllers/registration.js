const { v4: uuid } = require('uuid');
const User = require('../models/User');
const sendMail = require('../libs/sendMail');

module.exports.register = async (ctx, next) => {
    const { displayName, email, password } = ctx.request.body;

    const foundUser = await User.findOne({ email })
    if (foundUser) {
        ctx.response.status = 400;
        ctx.response.body = { errors: { email: 'Такой email уже существует' } }
        return;
    }
    const token = uuid();
    const user = new User({ email, displayName, verificationToken: token });
    await user.setPassword(password);
    await user.save();

    await sendMail({
        template: 'confirmation',
        locals: { token },
        to: email,
        subject: 'Подтвердите почту'
    })


    ctx.response.body = { status: 'ok' }
};

module.exports.confirm = async (ctx, next) => {
    const { verificationToken } = ctx.request.body;

    const user = await User.findOne({ verificationToken });

    if (!user) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: 'Ссылка подтверждения недействительна или устарела',
        };
        return;
    }

    await User.findOneAndUpdate({ verificationToken }, { $unset: { verificationToken: '' } });


    ctx.response.body = {
        status: 'ok',
        token: verificationToken,
    };
};
