const express = require('express');
const Artist = require('../../models/artist');
const Gallery = require('../../models/gallery');

async function getArtists() {
    const artist = await Artist.find();
    return artist;
}

async function createArtist(artist) {
    const newArtist = await Artist.create(artist)
    return newArtist
}

async function deleteArtist(artistId) {
    const deleteArtist = await Artist.findByIdAndDelete(artistId);
    return deleteArtist
}

async function getGallery(){
    const gallery = await Gallery.find();
    return gallery;
}

async function createGallery(gallery){
    const newGallery = await Gallery.create(gallery)
    return newGallery
}

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