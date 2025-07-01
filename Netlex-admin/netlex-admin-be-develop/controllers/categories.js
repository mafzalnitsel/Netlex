const Category = require('../models/categories.js');
const User = require('../models/user.js');


// Get active Fields
exports.getActiveCategories = function (req, res) {

    Category.find()
        .exec(function (err, category) {
            if (err) {
                return res.status(500).json({err})
            } else {
                return res.status(200).json({category})
            }
        });
};
exports.save = function (req, res) {
    let {categories} = req.body;
    if (!categories) {
        res.status(404).json({error: "MissingParameter"});
        return;
    }
    let category = new Category();
    category.categories = categories;

    category.save((err, savedUser) => {
        if(err){
            console.error(err);
            return res.status(404).json({error:"ErrorWhileSaveTryAgain"});
        }
        res.status(200).json(savedUser);
    });
};
