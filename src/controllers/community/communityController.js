const express = require("express");
const Review = require("../../models/review");

// Gets reviews
async function getReviews() {
    const reviews = await Review.find();
    return reviews
}


// Creates a new review
async function createReview(review) {
    const newReview = await Review.create(review)
    return newReview
}


module.exports = {
    createReview,
    getReviews,
}
