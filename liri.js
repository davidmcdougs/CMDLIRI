require('dotenv').config();
var Twitter =  require('twitter');
var Spotify = require('node-spotify-api')
var keys = require('./keys');
var fs = require('fs');
var timestamp = require('time-stamp')

var client = new Twitter ({
	consumer_key: keys.twitter.consumer_key,
	consumer_secret: keys.twitter.consumer_secret,
	access_token_key: keys.twitter.access_token_key,
	access_token_secret: keys.twitter.access_token_secret
});
var spotify = new Spotify ({
id: keys.spotify.id,
secret: keys.spotify.secret
});
function log(desiredLog){
var keyLog = desiredLog;
fs.appendFile('log.txt', timestamp('YYYY/MM/DD:ss')+": "+ keyLog, function(err){
	if(err){
		console.log(err);
	}
		console.log('logged entry.')
})
}
function getTweets(){
	var params = {screen_name: 'larrythecables'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    var Tweets = tweets;
	    for(i=0; i<Tweets.length; i++){
	    console.log("'" + Tweets[i].text +  "'"+ " -Tweeted on(" + Tweets[i].created_at +')');
		}
	  }
	  else {
	  	console.log(error);
	  }
	});
}

function getSong(){
	if (process.argv[3] != undefined){
}
else {
	process.argv[3] = "the sign Ace of Base";
}
	spotify.search({ type: 'track', query: process.argv[3], limit:1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
	console.log("Track name: " + data.tracks.items[0].name + "\nArtist's name: " +  data.tracks.items[0].artists[0].name + "\nAlbum name: " +  data.tracks.items[0].album.name + "\nSpotify Preview URL: " + data.tracks.items[0].preview_url); 
	});
}
var fileCommand;
function executeRandom(){
	fs.readFile('random.txt', 'utf8', function(err, data) {
	if (err) {
		return console.lof(err)
	}
	else {
		 fileCommand = data.split(",");
		imput1 = fileCommand[0];
		imput2 = fileCommand[1];
		process.argv[3]=imput2;
		cisco(imput1);
		}
	});
}
var imput1 = process.argv[2]

function cisco(fill) {
switch(fill){
	case 'my-tweets': 
console.log('fetching recent tweets...')
getTweets();
break;
	case 'spotify-this-song':
console.log('fetching matching track name...')
getSong();
break;
	case 'do-what-it-says':
console.log('reading random.txt for commands...')
executeRandom();
break;
	}
}
log(process.argv);
cisco(imput1);