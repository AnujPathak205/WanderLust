let categories = ["Room",
                "Flat",
                "Mountain",
                "Castle",
                "Historical",
                "Camping",
                "Amazing pool",
                "Beach",
                "Lake",
                "Desert",
                "Arctic",
                "Amazing view",
                "Farm"];

function validateCategory(category){
    return categories.some((cat) => category === cat);
}

module.exports = validateCategory;