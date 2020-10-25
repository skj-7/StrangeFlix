const adminrouter = require('express').Router();

const upload = require('./adminupload');
const login = require('./adminlogin');
const control = require('./admincontrol');
const setting = require('./adminsetting');
const regseries = require('./adminregseries');
const editvideo = require('./admineditvideo');
const editseries = require('./admineditseries');

adminrouter.use('/login', login);

adminrouter.use('/control', control);

adminrouter.use('/edit/video', editvideo);

adminrouter.use('/edit/series', editseries);

adminrouter.use('/regseries', regseries);

adminrouter.use('/upload', upload);

adminrouter.get('/users', (req, res) => {
    res.render('adminUserRecord.ejs',{"free":'',"ppv":"","premium":""});
})
adminrouter.get('/flags', (req, res) => {
    res.render('flags-record.ejs',{"videoarray":'',"comments":""});
})

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