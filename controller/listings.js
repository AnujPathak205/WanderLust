const Listing = require("../models/listings.js");
const ExpressError = require("../utils/ExpressError.js");
const getAddress = require("../utils/getAddress.js");
const validateCategory = require("../utils/validateCategory.js");
 
module.exports.index = async (req,res) => {
    let cat= req.query.category;
    let q = req.query.search;
    let listings;

    if(q){
        let result = await Listing.find({
            title:{
                $regex:q,$options:"i"
            }
        }).limit(10);

        if(!result.length){
            req.flash("info","Result not found!");
            return res.render("listings/index",{listings:[]});
        }

        return res.render("listings/index",{listings:result});
    }

    if(cat){
        if(validateCategory(cat)){
            listings = await Listing.find({category:cat}); 
        }else{
            req.flash("error","Category you asked, Do not exists!");
            return res.redirect("/listings");
        }
    }else{
        listings = await Listing.find({});
    }

    if(!listings.length){
        req.flash("info","No listing found");
        return res.render("listings/index",{listings:[]});
    }

    return res.render("listings/index",{listings});
}

module.exports.new = async (req,res) => {
    res.render("listings/new");
}

module.exports.createNew = async (req,res) => {
    if(!req.body.listing)throw new ExpressError(400,"Send valid data for listing");
    let newListing = new Listing(req.body.listing);

    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url,filename};
    }
    newListing.owner = req.user._id;

    let address = await getAddress(newListing.location,newListing.country);

    if(!address){
        req.flash("error","You entered wrong location");
        return res.redirect("/listings/new");
    }


    newListing.geometry.type = "Point";
    newListing.geometry.coordinates = address;

    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect(`/listings/${newListing._id}`);
}

module.exports.view = async (req,res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id).populate({
        path:"review",
        populate:{
            path:"author"
        }
    }).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for not exists");
        res.redirect("/listings");
        return;
    }
    res.render("listings/view",{listing});
}

module.exports.edit = async (req,res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for not exists");
        res.redirect("/listings");
        return;
    }
    res.render("listings/edit",{listing});
}

module.exports.editPut = async (req,res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    let updatedListing = {...req.body.listing};

    let originalImageUrl = (listing.image.length)?listing.image[0].url:null;
    let originalfilename = (listing.image.length)?listing.image[0].filename:null;
    updatedListing.owner = req.user._id;
    if(!req.file){
        updatedListing.image = {url:originalImageUrl,filename:originalfilename};
    }else{
        updatedListing.image = {filename:req.file.filename,
                                url:req.file.path};
    }
    if(listing.location !== updatedListing.location || listing.country !== updatedListing.country){
        let address = await getAddress(updatedListing.location,updatedListing.country);

        if(!address){
            req.flash("error","You entered wrong location");
            return res.redirect(`/listings/${id}/edit`);
        }

        updatedListing.geometry = {
            type:"Point",
            coordinates:address
        };
    }

    await Listing.findByIdAndUpdate(id,{...updatedListing},{runValidators:true});
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.delete = async (req,res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}

