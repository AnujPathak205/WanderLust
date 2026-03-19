const express = require("express");
const router = express.Router({mergeParams:true});

const review = require("../controller/reviews.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn,isAuthor} = require("../middleware.js");

router.post("/",isLoggedIn,validateReview,wrapAsync(review.createReview));
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(review.deleteReview));

module.exports = router;