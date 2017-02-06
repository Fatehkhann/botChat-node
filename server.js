const express = require('express');
const axios = require('axios');
const hbs = require('hbs');

var app = express();
app.set('view engine', 'hbs');

var port = process.env.PORT || 3000;



/* WEATHER API CODE */
var encodedAddr = encodeURIComponent('address here');
var weatherUrl = 'https://api.darksky.net/forecast/2c8b79eb14bfc16db23a9b73cf281fda/33.7370,72.7994';
var currentTemp = '';
axios.get(weatherUrl).then((response) => {
    if (response) {
        currentTemp = (((response.data.currently.temperature) - 32) * (5 / 9)).toFixed(2);
    }
});
/* END OF WEATHER API CODE */


/* BOTCHAT API CODE */
var cleverbotReply = '';
app.post('/', function (req, res, next) {
    var clientChatMsg = req.query['botChat'];
    var cleverBotUrl = `http://www.cleverbot.com/getreply?key=c6b096e7a13ccabd7baac40556ce1174&input=${clientChatMsg}&cs=76nxdxIJ02AAA`;
    axios.get(cleverBotUrl).then((response) => {
        cleverbotReply = response.clever_output;
    });
    next();
});



/* END OF BOTCHAT API CODE */

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    next();
});



app.get('/', (req, res) => {
    res.render('index.hbs', {
        temp: `${currentTemp}`,
        botReply: `${cleverbotReply}`
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

