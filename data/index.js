(function (data) {

    var seedData = require('./seedData');
    var database = require('./database');
    var test = require('./test');

    data.getNoteCategories = function (next) {
         database.getDb(function (err, db) {
           if (err) {
               next(err, null);
           } else {
               db.notes.find().sort({name: 1}).toArray(function (err, result) {
                   if (err) {
                       next(err, null);
                   } else {
                       next(null, result);
                   }
               })
           }
         });
    };
    
    data.getNotes = function (categoryName, next){
        database.getDb(function(err, db) {
            if (err) {
                next(err);
            } else{
                db.notes.findOne({name: categoryName}, next);
            }
        });
    };
    
    data.addNote = function (categoryName, noteToInsert, next) {
        database.getDb(function(err, db) {
                if (err) {
                    next(err)
                } else {
                    db.notes.update({name: categoryName}, {$push: {notes: noteToInsert} }, { upsert : true }, next);
                }
        });
    };

    data.createNewCategory = function (categoryName, next) {
        database.getDb(function (err, db) {
           if (err) {
               next(err);
           } else {
               db.notes.find({name: categoryName}).count(function(err, count){
                   if (err) {
                       next(err);
                   } else {
                       if (count != 0) {
                           next("Category already exists");
                       }else{
                           var category = {
                                name: categoryName,
                                notes: []
                            };
                            db.notes.insert(category, function (err) {
                                if (err) {
                                    next(err);
                                } else {
                                    next(null);
                                }
                            });
                       }
                   }
               });
           }
        });
    }
    
    data.addUser = function (user, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.users.insert(user, next);
            }
        });
    };

    data.getUser = function (username, next) {
      database.getDb(function (err, db) {
          if (err) {
              next(err);
          } else {
              db.users.findOne({username: username}, next);
          }
      });
    }

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
