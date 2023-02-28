const express = require("express");
const Store = require("../../models/store");


// Create a function that returns all the stores
async function getStore() {
    // Find all the store data (products)
    const store = await Store.find();
    return store
}

// Create a new store
async function createStore(store) {
    // Create the store item
    const newStore = await Store.create(store)

    // Return the created store item
    return newStore
}

//function to delete a store item
async function deleteStore(storeId,store){
    try {
    //finding the store item by ID
    const deletedStore = await Store.findByIdAndDelete(storeId,store
    )
    //returning the deleted store item
    return deletedStore
    } catch (error) {
        console.log(error)
    }
    
}

// Create a function that takes in the storeId

async function getStoreById(storeId){
    // Wrap the function in a try/catch block
    try {
        // Create a variable that finds the store by its ID
        const store = await Store.findById(storeId)
        return store
    } catch (error) {
        console.log(error)
    }
}

// Create a function that takes in the storeId and store
async function updateStore(storeId, store){
    // Create a variable that finds the store by its ID and updates it
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
