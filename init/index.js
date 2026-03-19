const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
    .then(() => {
            console.log("connected to DB");
    })
    .catch((err) => {
            console.log(err);
    })


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data =  initData.data.map((obj) => ({
        ...obj,
        owner:"69a3d942ee73563ca5f8ad3b"
    }));

    await Listing.insertMany(initData.data);
    console.log("DONE");
}

initDB();