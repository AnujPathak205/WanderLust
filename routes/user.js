const express = require("express");
const router = express.Router();

const user = require("../controller/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectedUrl,validateUniqueEmail} = require("../middleware.js");

router
    .route("/signup")
    .get(wrapAsync(user.signup))
    .post(wrapAsync(user.signupPost));

router
    .route("/login")
    .get(wrapAsync(user.login))
    .post(saveRedirectedUrl,
          passport.authenticate("local",{
            failureRedirect:"/login",
            failureFlash:true
        }),
        wrapAsync(user.loginPost)
    );

router.get("/logout",wrapAsync(user.logout));

module.exports = router;