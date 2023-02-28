const express = require("express");
const Store = require("../../models/store");

async function getStore() {
    const store = await Store.find();
    return store
}

async function createStore(store) {
    const newStore = await Store.create(store)
    return newStore
}

async function deleteStore(storeId,store){
    try {
    const deletedStore = await Store.findByIdAndDelete(storeId,store
    )
    return deletedStore
    } catch (error) {
        console.log(error)
    }
    
}

async function getStoreById(storeId){
    try {
        const store = await Store.findById(storeId)
        return store
    } catch (error) {
        console.log(error)
    }
}
async function updateStore(storeId, store){
    const updateStore = await Store.findByIdAndUpdate(storeId, store, {
        new: true,
    })
    return updateStore
}

module.exports = {
    getStore,
    createStore,
    deleteStore,
    getStoreById,
    updateStore,
}
