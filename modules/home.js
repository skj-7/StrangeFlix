const home = require('express').Router();

home.get('/',(req, res) => {
    if (req.session.user_id) {
        var msg = req.session.data.message;
        
        res.render('home.ejs', {"series": "", "video": "", "message": msg});
    }
    else {
        res.render('index.ejs');
    }
});

module.exports = home;