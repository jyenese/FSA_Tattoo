const express = require('express');
const Artist = require('../../models/artist');

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

module.exports = {
    getArtists,
    createArtist,
    deleteArtist,
}