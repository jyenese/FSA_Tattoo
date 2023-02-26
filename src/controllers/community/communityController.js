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

// Updates a review
async function updateReview(reviewId, review) {
    console.log(reviewId, review)
    const updatedReview = await Review.findByIdAndUpdate(reviewId, review)
    return updatedReview
}

async function deleteReview(reviewId,review){
    const deletedReview = await Review.findByIdAndDelete(reviewId,review
    )
    return deletedReview
}


module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview
}
