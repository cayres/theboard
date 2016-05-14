//database.js
(function (database) {
    
    var mongodb = require('mongodb');
    var mongoUrl = "mongodb://localhost:27017/theboard";
    var theDB = null;
    
    database.getDb = function (next) {
        if (!theDB) {
            mongodb.MongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDB = {
                        db: db
                    };
                    next(null, theDB);
                }
            });
        } else {
            next(null, theDB);
        }
    };
    
})(module.exports);