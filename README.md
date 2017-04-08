# github-list-follow
Get Followers/Following on github (no token required)

[![npm](https://img.shields.io/npm/v/github-list-follow.svg)](https://www.npmjs.com/package/github-list-follow)
[![npm](https://img.shields.io/npm/dm/github-list-follow.svg)](https://www.npmjs.com/package/github-list-follow)

# Install

```sh
npm i --save github-list-follow
```

# Usage

```javascript
var github = require('github-list-follow');
var user = github('fcannizzaro');
```

## Promise

```javascript
user
  .followers()
  .then(followers => {
    console.log(followers);
  });
```

## Event Emitter

```javascript
var onData = (data) => {
  console.log(data);
}

var onFinished = () => {
  console.log('finished');
}

user
  .followers(true)
  .on('data', onData)
  .on('finish', onFinished);
```

# Functions

### followers([, ev])
### following([, ev])

Scrape all pages of user followers / following.

- `boolean` ev: use event emitter. (**Default** false)
- **Return** promise or event emitter.

# Events

### data
Called when a new page is completed.

### finish
Called when all pages are completed.

# Author
Francesco Cannizzaro
