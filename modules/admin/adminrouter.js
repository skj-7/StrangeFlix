const adminrouter = require('express').Router();

const upload = require('./adminupload');
const login = require('./adminlogin');
const control = require('./admincontrol');
const setting = require('./adminsetting');
const deletevs = require('./admindelete');
const regseries = require('./adminregseries');
const editvideo = require('./admineditvideo');
const editseries = require('./admineditseries');
const userRecord = require('./adminUserRecord');
const flagRecord = require('./adminFlagRecord');

adminrouter.use('/login', login);

adminrouter.use('/control', control);

adminrouter.use('/remove', deletevs);

adminrouter.use('/edit/video', editvideo);

adminrouter.use('/edit/series', editseries);

adminrouter.use('/regseries', regseries);

adminrouter.use('/upload', upload);

adminrouter.use('/users', userRecord);

adminrouter.use('/flags', flagRecord);

adminrouter.use('/setting', setting);

adminrouter.get('/', (req, res) => {
	if (req.session.admin) {
		res.redirect('/admin/control');
	}
	else {
		res.redirect('/admin/login');
	}
})

adminrouter.get('/logout', (req, res) => {
	if (req.session.admin) {
		req.session.destroy();
		console.log("ADMIN Logout success!");
	}
	res.redirect('/admin/login');
});

module.exports = adminrouter;