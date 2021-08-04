const {
  Product,
  Variant,
  Stock,
  ProductReview,
  Category,
  SubCategory,
  Brand,
} = require("../models");

exports.getConfig = async (req, res, next) => {
  try {
    console.log("config route works.")

    // Here combine everything that we store in database
    // And will be useful on the frontend. It will be called once.

    const queries = [];

    queries.push( await Product.distinct("manufacturer") );
    queries.push( await Product.distinct("model") );
    queries.push( await Variant.distinct("colour") );

    Promise.all(queries).then((response) => {
        console.log(response);
        const config = {
            manufacturers: response[0],
            models: response[1],
            colours: response[2]
        }

        return res.status(200).json(config);
    })

  } catch (error) {
    return next({ error });
  }
};