const Listing = require("./models/listings");
const Review = require("./models/reviews");
const User = require("./models/user.js");
const schema = require("./schema");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectedUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next) => {
    let {error} = schema.listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
}

module.exports.validateReview = (req,res,next) => {
    let {error} = schema.reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
}

module.exports.isAuthor = async (req,res,next) => {
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You have no permission!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateUniqueEmail = async (req,res,next) => {
    let {email} = req.body;
    let user = await User.find({email:email});
    if(user || user.length){
        req.flash("error","Username/email already registered");
        return res.redirect("/signup");
    }
    next();
}