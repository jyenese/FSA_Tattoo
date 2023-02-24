const express = require('express');
const Artist = require('../../models/artist');
const Gallery = require('../../models/gallery');

// The function getArtists() is defined as an async function
// The function is using the await keyword to wait for the Artist.find() promise to be resolved

async function getArtists() {
    const artist = await Artist.find();
    return artist;
}

// Creates and returns a new artist with the given artist
// information
async function createArtist(artist) {
    const newArtist = await Artist.create(artist)
    return newArtist
}


 // Delete artist using the artist ID
async function deleteArtist(artistId) {
    const deleteArtist = await Artist.findByIdAndDelete(artistId);
    return deleteArtist
}

// This function is used to get all gallery items from the database
async function getGallery(){
    const gallery = await Gallery.find();
    return gallery;
}

// Creates a new gallery with the given gallery object
// Inputs: gallery object
// Outputs: new gallery object

async function createGallery(gallery){
    const newGallery = await Gallery.create(gallery)
    return newGallery
}

/* This function deletes the gallery with the given galleryId
 * and returns the deleted gallery. 
 */
async function deleteGallery(galleryId){
    const deleteGallery = await Gallery.findByIdAndDelete(galleryId);
    return deleteGallery
}

module.exports = {
    getArtists,
    createArtist,
    deleteArtist,
    getGallery,
    createGallery,
    deleteGallery
}