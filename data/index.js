(function (data) {

    var seedData = require('./seedData');
    var database = require('./database');
    var test = require('./test');

    data.getNoteCategories = function (next) {
        next(null, seedData.initialNotes);
    };

    function seedDatabase() {
        database.getDb(function (err, db) {
           if (err) {
               console.log("Failed to seed database:" + err);
           } else {
               db.notes.count(function (err, count) {
                    if (err) {
                        console.log("Failed to count notes!");
                    } else {
                        if (count === 0) {
                            console.log("Seeding the database");
                            seedData.initialNotes.forEach(function (item) {
                                db.notes.insert(item, function (err) {
                                   if (err) {
                                       console.log("Failed to insert item in database!");
                                   }
                                });
                            });
                        }else{
                            console.log("Database already seeded");
                        }
                    }
               });
           }
        });
    }
    seedDatabase();
    console.log(test.test);

})(module.exports);
