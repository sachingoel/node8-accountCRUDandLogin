'use strict';

let {celebrate,Joi} = require('celebrate');

exports.data = {
	query:Joi.object().keys({
		select				: Joi.array().items(Joi.string().valid('Ticker', 'Company', 'Industry', 'PreviousClose', 'Open', 'Bid', 'Ask', 'DaysRange', 'ftWeekRange', 'Volume', 'AvgVolume', 'MarketCap', 'Beta', 'PERatioTTM', 'EPSTTM', 'EarningsDate', 'ForwardDividendYield', 'ExDividendDate', 'OneyTargetEst', 'ticker_company'))
	})
}