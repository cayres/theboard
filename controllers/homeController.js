(function (homeController) {
        
    var data = require("../data");
    
    homeController.init = function (app) {
        
        app.get("/", function (req, res) {
            
            data.getNoteCategories(function (err, results) {
                res.render("index", {
                    title: "The board", 
                    error: err, 
                    categories: results,
                    newCategoryError: req.flash("newCategoryName")
                });
            });               
            
        });

        app.post("/newCategory", function (req, res) {
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function (err) {
                if (err) {
                    console.log(err);
                    req.flash("newCategoryName", err);
                    res.redirect("/")
                } else {
                    res.redirect("/notes/" + categoryName);
                }
            });
        });;
    };
})(module.exports);