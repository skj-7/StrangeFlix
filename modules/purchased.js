const purchased = require('express').Router();
const users = require('../schemas/userData');

purchased.get('/', (req, res) => {
    const userID = req.session.user_id;

    if (userID) {
		users.findById(userID).populate(["purchased.listSolo", "purchased.listSeries", "purchased.listSeries.videoList"])
        .exec( (error, userdata) => {
            if(error) {
                console.log(error);
                res.render('error.ejs', {
                    "error": "Unable to render page",
                    "message": "Check console at server.."
                });
            }
            
            res.render('purchased.ejs', {
                "subs": userdata.subscriptionCode,
                "series": userdata.purchased.listSeries,
                "video": userdata.purchased.listSolo
            });
        });
    }
    else {
		res.redirect('/');
	}
})

module.exports = purchased;