var request = require('request');
var token = require('./secrets');
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
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
    cb(err, res);
  });
  /*
    .on('error', function(err) {
      throw error;
    })
    .on('response', function(response) {
      console.log(response);
    })
    .on('end', function() {
      cb();
      console.log('Task completed.');
    });*/
}

getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log('Errors:', err);
  console.log('Result:', result);
});


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

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg");