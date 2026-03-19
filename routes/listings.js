if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

console.log(process.env.SECRET);

const express = require("express");
const router = express.Router();

const listing = require("../controller/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listing.index))
    .post(isLoggedIn,
          validateListing,
          upload.single("image"),
          wrapAsync(listing.createNew)
    );


router.get("/new",
           isLoggedIn,
           wrapAsync(listing.new));

router
    .route("/:id")
    .get(wrapAsync(listing.view))
    .put(isLoggedIn,
         isOwner,
         upload.single("image"),
         validateListing,
         wrapAsync(listing.editPut))
    .delete(isLoggedIn,
            isOwner,
            wrapAsync(listing.delete)
    );


router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listing.edit)); 

module.exports = router;