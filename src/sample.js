var github = require('./index');
var user = github('fcannizzaro');

user
  .followers()
  .then(followers => {
    console.log(followers);
  });

// or use events

var onData = (data) => {
  console.log(data);
}

var onFinished = () => {
  console.log('finished');
}

user
  .followers(true)
  .on('data', onData)
  .on('finish', onFinished)
