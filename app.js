const express = require("express");
const app = express();
const port = 8080;

const userRoute = require("./routes/user");
const listingRoute = require("./routes/listings");
const reviewRoute = require("./routes/reviews");

const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

const ExpressError = require("./utils/ExpressError");

const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

require('dotenv').config();

// async function main(){
//     await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// }

const mongoURL = process.env.ATLASDB_URL;
async function main(){
    await mongoose.connect(mongoURL);
}


main()
    .then(() => {
            console.log("connected to DB");
    })
    .catch((err) => {
            console.log(err);
    })

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs",ejsMate);

const store = MongoStore.create({
    mongoUrl:mongoURL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",() => {
    console.log("ERROR IN MONGO SESSION STORE");
})

const sessionOptions = {
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000
    }
}


app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.info = req.flash("info");
    res.locals.isLogged = req.user != undefined ? true:false;
    res.locals.currUser = req.user;
    next();
});

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Routes
app.use("/",userRoute);
app.use("/listings",listingRoute);
app.use("/listings/:id/reviews",reviewRoute);

app.use((req,res,next) => {
    next(new ExpressError(404,"Page not found!")); 
});

app.use((err,req,res,next)=>{
    let {status = 500,message="Something went wrong"} = err;
    res.status(status).render("error",{message});
});


app.listen(port,() => {
    console.log(`App is listening on port ${port}`);
});