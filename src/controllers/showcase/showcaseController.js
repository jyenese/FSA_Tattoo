const express = require('express');
const Artist = require('../../models/artist');
const Styles = require('../../models/styles');

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

async function getStyles(){
    const styles = await Styles.find();
    return styles;
}

async function createStyles(style){
    const newStyle = await Styles.create(style)
    return newStyle
}

async function deleteStyles(styleId){
    const deleteStyle = await Styles.findByIdAndDelete(styleId);
    return deleteStyle
}

module.exports = {
    getArtists,
    createArtist,
    deleteArtist,
    getStyles,
    createStyles,
    deleteStyles,
}