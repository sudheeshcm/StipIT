var mongoose = require('mongoose');

module.exports = mongoose.model('Stocks',{
	SYMBOL: String,
	SERIES: String,
	STOCKTYPE: String,
	OPEN: Number,
	HIGH: Number,
	LOW: Number,
	CLOSE: Number,
	LAST: Number,
	PREVCLOSE: Number,
	TOTTRDQTY: Number,
	TOTTRDVAL: Number,
	TIMESTAMP: Date,
	TOTALTRADES: Number,
	ISIN: String
});