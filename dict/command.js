var db = require('mongodb').Db;
var server = require('mongodb').Server;
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout),
    prefix = 'dict> ';

var dict_db = new db('dict', new server('127.0.0.1', 27017, {}));

dict_db.open(function(err, dict_db) {
    dict_db.collection('oxford', function (err, coll) {
        if (err) {
            console.log ("error in open oxford dic");
        } else {
            rl.on('line', function(line) {
                var input = line.trim();
                coll.findOne({"word": line}, function(err, doc) {
                    if (err) {
                        console.log ("error in find word");
                    } else {
                        if (doc)
                            console.log(''+doc.explain+'\n');
                        else
                            console.log('not found\n');
                    }
                    rl.setPrompt(prefix, prefix.length);
                    rl.prompt();
                });
                rl.setPrompt(prefix, prefix.length);
                rl.prompt();
            }).on('close', function() {
                process.exit(0);
            });
            rl.setPrompt(prefix, prefix.length);
            rl.prompt();
        }
    });
});

