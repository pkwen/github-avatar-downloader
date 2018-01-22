var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request'
    }
  };
  request(url, function(err, res, body) {
    cb(err, body);
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

