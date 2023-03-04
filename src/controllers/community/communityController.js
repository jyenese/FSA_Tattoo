const express = require("express");
const Review = require("../../models/review");
const Share = require("../../models/share");
const User = require("../../models/user");

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

async function deleteReview(reviewId){
    const deletedReview = await Review.findByIdAndDelete(reviewId
    )
    return deletedReview
}
async function getUserIdForShare (userId){
    const user = await User.findbyId({user_id: userId})
    return user
}

async function createShare(share) {
    const newShareWithUserId = await Share.create(share)
    return newShareWithUserId
}

async function getShare(){
    const share = await Share.find();
    return share
}

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
    getShare,
    createShare,
    getUserIdForShare,
}
