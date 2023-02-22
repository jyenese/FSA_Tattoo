const express = require("express");
const Review = require("../../models/review");


async function getReviews() {
    const reviews = await Review.find();
    return reviews
}

async function createReview(review) {
    const newReview = await Review.create(review)
    return newReview
}


module.exports = {
    createReview,
    getReviews,
}
