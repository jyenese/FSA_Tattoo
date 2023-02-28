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
storeRouter.post("/", async (req, res) => {
    try {
        const store = await createStore({
            title: req.body.title,
            price: req.body.price,
        });
        if (store) {
            return res.json({
                message: `Store has been successfully created!`,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            error: `${error.message}`,
        });
    }
})

//Delete store
storeRouter.delete("/:storeId", async (req, res) => {
    const store = await deleteStore(req.params.storeId);
    if (store) {
        return res.json({
            message: "Store successfully deleted",
        });
    }
    if (!store) {
        return res.json({
            message: "Item Id not found",
        });
    }
})

//Get store by id
storeRouter.get("/:storeId", async (req, res) => {
    const store = await getStoreById(req.params.storeId);
    if (store) {
        return res.json(store);
    }
    if (!store) {
        return res.json({
            message: "Item not found",
        });
    }
})

//Update store
storeRouter.put("/:storeId", async (req, res) => {
    const store = await updateStore(req.params.storeId, {
        title: req.body.title,
        price: req.body.price,
    });
    if (store) {
        return res.json({
            message: "Store successfully updated",
        });
    }
    if (!store) {
        return res.json({
            message: "Store not found",
        });
    }
})

module.exports = storeRouter;