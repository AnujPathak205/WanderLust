const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.signup = async (req,res) => {
    res.render("users/signup");
}

module.exports.signupPost = async (req,res) => {
    try{
        let {username,email,password} = req.body;
        let newUser = new User({email,username});
        const registeredUser =  await User.register(newUser,password);
        req.login(registeredUser,(err) => {
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust");
            res.redirect("/listings");
        })
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.login = async (req,res) => {
    res.render("users/login");
}

module.exports.loginPost = async (req,res) => {
    req.flash("success","Welcome back to wanderLust! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = async (req,res,next) => {
    req.logout((err) => {
        if(err)return next(err);
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
}