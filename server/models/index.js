const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@e-commerce.ogm8y.mongodb.net/database?retryWrites=true&w=majority", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        console.log("You have successfully connected to the social-app database.");
    }).catch((err) => {
        console.log("You could not connect to the social-app database.", err);
})

mongoose.exports.Address = require("./users/address");