const { Category } = require("../models");
const { uploadBase64ToAmazon } = require("../utils/aws");

exports.getCategories = async (req, res, next) => {
    try {
      const categories = await Category.find();
  
      return res.status(200).json( categories );
    } catch (error) {
      return next({ error });
    }
};

exports.addCategory = async (req, res, next) => {
    try {
      const { name } = req.body;

      const alternativeNames = [ name.toLowerCase(), name.replace(/[^a-zA-Z ]/g, ""), name.replace(/\s/g, ""), name.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "") ];

      const category = await Category.find({ lowercasename: { $in : alternativeNames } });
      
      if ( category && category.length ) {
        return next({ statusCode: 404, message: "The category with the provided name exists." });
      }

      const newCategory = { name, lowercasename: name.toLowerCase() };
  
      const addedCategory = await Category.create(newCategory);

      const thumbnail = await uploadBase64ToAmazon(req.body.thumbnail[0], `${addedCategory._id}_thumbnail`);

      addedCategory.thumbnail = thumbnail;

      await addedCategory.save();
  
      return res.status(200).json( addedCategory );
    } catch (error) {
      return next({ error });
    }
}; 