const cart = require('express').Router();

const users = require('../schemas/userData');
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

cart.get('/add/video/:videoID', (req, res) => {
    const userID = req.session.user_id;
    var videoID = req.params.videoID;
    if (userID) {
        videos.findById(videoID, (error, video) => {
            if(error)
                return console.error("Unable to find video!");
            
            let cost = video.price;
            users.findByIdAndUpdate(userID, {
                $push: { "cart.itemsVideo": videoID },
                $inc: { totalCount: 1, totalPrice: cost }
            }, (err, userdata) => {
                req.session.data.message = "Video added to Cart."
                res.redirect('/home');
            })
        })
    }
    else {
		res.redirect('/login');
	}
})

cart.get('/add/series/:seriesID', (req, res) => {
    const userID = req.session.user_id;
    var seriesID = req.params.seriesID;
    if (userID) {
        videoSeries.findById(seriesID, (error, series) => {
            if(error)
                return console.error("Unable to find series!");
            
            let cost = series.seriesPrice;
            users.findByIdAndUpdate(userID, {
                $push: { "cart.itemsSeries": seriesID },
                $inc: { totalCount: 1, totalPrice: cost }
            }, (err, userdata) => {
                req.session.data.message = "Series added to Cart."
                res.redirect('/home');
            })
        })
    }
    else {
		res.redirect('/login');
	}
})

cart.get('/',(req, res) =>{
    res.render('cart.ejs',{"cartSeries":"","cartVideo":"","totalPrice":0,"totalCount":0,"soloCount":0,"seriesCount":0,"message": "","error":""});
});

module.exports = cart;