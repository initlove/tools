var fs=require('fs');
var db = require('mongodb').Db;
var server = require('mongodb').Server;

var dict_db = new db('dict', new server('127.0.0.1', 27017, {}));


fs.readFile('./sort_oxford.txt', function (err, data) {
    if (err) throw err;
    var str = '';

    str += data;
    var array = str.split('\r\n');
    var len = array.length;

    dict_db.open(function(err, dict_db) {
        dict_db.collection('oxford', function (err, coll) {
            if (err) {
                console.log ("error in open coll");
                return;
            }
            for (var i = 0; i < len; i = i+2)
               coll.insert ({"word" : array[i], "explain" : array[i+1]});
        });
    });
});

