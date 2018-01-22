//module imports
var request = require('request');
var token = require('./secrets');
var fs = require('fs');
//cmd line argument assignments
var username = process.argv[2];
var repo = process.argv[3];

//send request to github API and parse JSON using the
//data as an argument to the provided callback
function getRepoContributors(repoOwner, repoName, cb) {
  if(repoOwner === undefined || repoName === undefined) {
    throw 'You did not enter valid arguments.';
  }
  console.log('Welcome to the GitHub Avatar Downloader!');
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    if(err) {
      throw err;
    }
    cb(JSON.parse(body));
  });
}

//iterate through contributors array, download avatars
//and save files to avatars directory according to each
//contributor's login name
function printURL(obj) {
  for(id in obj) {
    var filePath = 'avatars/' + obj[id]['login'] + '.jpg';
    var avatarURL = obj[id]['avatar_url'];
    downloadImageByURL(avatarURL, filePath);
    // console.log(obj[id]["avatar_url"]);
  }
  // console.log(obj.length);
}

//invoke main function when executed through node
getRepoContributors(username, repo, printURL);

//write images downloaded from given url to given file paths
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('Downloading avatar...');
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function() {
      console.log('Avatar download completed.');
    });
}