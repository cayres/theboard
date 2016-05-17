(function (test) {
    var database = require("./database");

    test.test = "Testando....";

    database.getDb(function (err, db) {
        db.notes.find(function (err, notes) {
            if (err) {
                console.log("Não deu!");
            }
            else{
                notes.forEach(function (item) {
                    console.log(item);
                });
            }
        });
    });

})(module.exports);
