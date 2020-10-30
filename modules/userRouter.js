const userRouter = require('express').Router();

const home = require('./home');
const stream = require('./streaming');
const favourite = require('./favourite');
const payment = require('./payment');
const purchased = require('./purchased');
const cart = require('./cartHandler');
const likes = require('./likedislike');
const setting = require('./setting');
const search = require('./search');

userRouter.get('/', (req, res) => {
    if (req.session.user_id)
        res.redirect('/home');
    else
        res.render('index.ejs');
})

userRouter.use("/home", home);

userRouter.use('/watch', stream);

userRouter.use('/likes', likes);

userRouter.use('/fav', favourite);

userRouter.use('/payment', payment);

userRouter.use('/purchased', purchased);

userRouter.use('/search', search);

userRouter.use('/cart', cart);

userRouter.use('/setting', setting);

userRouter.get('/premium', (req, res) => {
    const userID = req.session.user_id;
    const subCode = req.session.data.subCode;
	if (userID) {
        res.render('premium.ejs', { "premium": subCode, "message": "", "error": "" });
    }
	else {
		res.redirect('/');
	}
});

userRouter.get('/aboutUs', (req, res) => {
    res.render('aboutUs.ejs');
});

module.exports = userRouter;