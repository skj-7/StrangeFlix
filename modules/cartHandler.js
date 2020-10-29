const cart = require('express').Router();

const users = require('../schemas/userData');
const videos = require('../schemas/videos');
const videoSeries = require('../schemas/videoSeries');

cart.get('/', (req, res) => {
	const userID = req.session.user_id;

	if (userID) {
		users.findById(userID).populate(["cart.itemsVideo", "cart.itemsSeries"])
		.exec( (err, data) => {
			if(err) {
				return console.log(err);
			}

			let vidarr = data.cart.itemsVideo;
			let seriesarr = data.cart.itemsSeries;
			let price = data.cart.totalPrice;
			let count = data.cart.totalCount;
			
			res.render('cart.ejs', {
				"cartSeries": seriesarr, "cartVideo": vidarr, "totalPrice": price, "totalCount": count, "message": "", "error": ""
			});
		});
	}
	else {
		res.redirect('/');
	}
});

cart.get('/add/video/:videoID', (req, res) => {
	const userID = req.session.user_id;
	var videoID = req.params.videoID;
	if (userID) {
		users.findById(userID, (err, userdata) => {
			var isPurchased = userdata.purchased.listSolo.some(function (vidarrobj) {
				return vidarrobj.equals(videoID);
			});

			if(isPurchased == true) {
				req.session.data.message = "You have already purchased this video";
				res.redirect('/home');
				return;
			}

			var isInCart = userdata.cart.itemsVideo.some(function (vidarrobj) {
				return vidarrobj.equals(videoID);
			});

			if(isInCart == true) {
				req.session.data.message = "Already added to Cart.";
				res.redirect('/home');
				return;
			}
		
			videos.findById(videoID, (error, video) => {
				if(error)
					return console.error("Unable to find video!");
				
				let cost = video.price;
				userdata.updateOne( {
					$push: { "cart.itemsVideo": videoID },
					$inc: { "cart.totalCount": 1, "cart.totalPrice": cost }
				}, (err, userdata) => {
					req.session.data.message = "Video: \"" + video.title + "\" added to Cart."
					res.redirect('/home');
				});
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
		users.findById(userID, (err, userdata) => {
			var isPurchased = userdata.purchased.listSeries.some(function (seriesarrobj) {
				return seriesarrobj.equals(seriesID);
			});

			if(isPurchased == true) {
				req.session.data.message = "You have already purchased this series";
				res.redirect('/home');
				return;
			}

			var isInCart = userdata.cart.itemsSeries.some(function (seriesarrobj) {
				return seriesarrobj.equals(seriesID);
			});

			if(isInCart == true) {
				req.session.data.message = "Already added to Cart."
				res.redirect('/home');
				return;
			}
		
			videoSeries.findById(seriesID, (error, series) => {
				if(error)
					return console.error("Unable to find video!");
				
				let cost = series.seriesPrice;
				userdata.updateOne( {
					$push: { "cart.itemsSeries": seriesID },
					$inc: { "cart.totalCount": 1, "cart.totalPrice": cost }
				}, (err, userdata) => {
					req.session.data.message = "Series: \"" + series.seriesTitle + "\" added to Cart."
					res.redirect('/home');
				});
			})
		})
	}
	else {
		res.redirect('/login');
	}
})

cart.get('/remove/video/:videoID', (req, res) => {
	const userID = req.session.user_id;
	var videoID = req.params.videoID;
	if (userID) {
		users.findById(userID, (err, userdata) => {
		
			videos.findById(videoID, (error, video) => {
				if(error)
					return console.error("Unable to find video!");
				
				let cost = video.price;
				userdata.updateOne( {
					$pull: { "cart.itemsVideo": videoID },
					$inc: { "cart.totalCount": -1, "cart.totalPrice": -cost }
				}, (err, userdata) => {
					req.session.data.message = "Video: \"" + video.title + "\" removed from Cart."
					res.redirect('/cart');
				});
			})
		})
	}
	else {
		res.redirect('/login');
	}
})

cart.get('/remove/series/:seriesID', (req, res) => {
	const userID = req.session.user_id;
	var seriesID = req.params.seriesID;
	if (userID) {
		users.findById(userID, (err, userdata) => {
		
			videoSeries.findById(seriesID, (error, series) => {
				if(error)
					return console.error("Unable to find series!");
				
				let cost = series.seriesPrice;
				userdata.updateOne( {
					$pull: { "cart.itemsSeries": seriesID },
					$inc: { "cart.totalCount": -1, "cart.totalPrice": -cost }
				}, (err, userdata) => {
					req.session.data.message = "Series: \"" + series.seriesTitle + "\" removed from Cart."
					res.redirect('/cart');
				});
			})
		})
	}
	else {
		res.redirect('/login');
	}
})

module.exports = cart;