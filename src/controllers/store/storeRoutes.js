const express = require("express");
const {
    getStore,
    createStore,
    deleteStore,
    getStoreById,
    updateStore,
} = require("../../controllers/store/storeController");

const storeRouter = express.Router();

//Get store
storeRouter.get("/", async (req, res) => {
    const store = await getStore();
    return res.json(store);
})

//Create store
//1. Create a new store and save it in the database
storeRouter.post("/", async (req, res) => {
    try {
        const store = await createStore({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
        });
        //2. If the store was successfully created and saved in the database, return a success message
        if (store) {
            return res.json({
                message: `Store has been successfully created!`,
            });
        }
    } catch (error) {
        //3. If the store was not created, return an error message
        console.error(error);
        return res.status(400).json({
            error: `${error.message}`,
        });
    }
})

//Delete store
// The delete method for the router has been created with the endpoint /:storeId
storeRouter.delete("/:storeId", async (req, res) => {
    // The store variable will be the result of the deleteStore function
    const store = await deleteStore(req.params.storeId);
    // If the store variable is true, that means the store has been deleted
    if (store) {
        // The response is a JSON object with the message "Store successfully deleted"
        return res.json({
            message: "Store successfully deleted",
        });
    }
    // If the store variable is false, the store id was not found
    if (!store) {
        // The response is a JSON object with the message "Item Id not found"
        return res.json({
            message: "Item Id not found",
        });
    }
})

//Get store by id
//This is an example of how to comment your code
storeRouter.get("/:storeId", async (req, res) => {
    //Get store by id from the database
    const store = await getStoreById(req.params.storeId);
    //If store exists, return store
    if (store) {
        return res.json(store);
    }
    //If store does not exist, return message
    if (!store) {
        return res.json({
            message: "Item not found",
        });
    }
})

//Update store
// Update a store
storeRouter.put("/:storeId", async (req, res) => {
    // Get store ID from request parameters
    const store = await updateStore(req.params.storeId, {
        // Get updated store title from request body
        title: req.body.title,
        // Get updated store price from request body
        price: req.body.price,
    });
    // If store exists
    if (store) {
        // Return message to user
        return res.json({
            message: "Store successfully updated",
        });
    }
    // If store does not exist
    if (!store) {
        // Return message to user
        return res.json({
            message: "Store not found",
        });
    }
})

module.exports = storeRouter;