var request = require('request');
var cheerio = require('cheerio');
const EventEmitter = require('events');

var paginate = (user, page, tab, dest, cb, emitter) => {

  var url = `https://github.com/${user}?page=${page}&tab=${tab}`;

  request(url, (err, res, body) => {

    if (!err && res.statusCode == 200) {

      var $ = cheerio.load(body);
      var predicate = (it) => $(it).attr('alt').slice(1);
      var data = $('a img[alt^="@"]').toArray().map(predicate);

      if (data.length > 0) {

        if (emitter) {
          emitter.emit('data', data);
        } else {
          dest.push(...data);
        }

        return paginate(user, page + 1, tab, dest, cb, emitter);

      }

      if (emitter) {
        return emitter.emit('finish');
      }

      return cb(dest);

    }

    return paginate(user, page, tab, dest, cb, emitter);

  });

}

var scrape = (user, tab, events) => {

  if (!events)
    return new Promise((resolve, reject) => {
      paginate(user, 1, tab, [], resolve, null);
    });

  // event emitter enabled

  var emitter = new EventEmitter();
  paginate(user, 1, tab, [], null, emitter);
  return emitter;

}

module.exports = (user) => {
  return {
    followers: (ev) => scrape(user, 'followers', !!(ev)),
    following: (ev) => scrape(user, 'following', !!(ev))
  }
}
