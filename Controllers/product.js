import { Products } from '../Models/Products.js'


// Add Products
export const addProduct = async (req, res) => {
    const { title, description, price, qty, imgsrc, category } = req.body;
    try {
        let product = await Products.create({
            title,
            description,
            price,
            qty,
            imgsrc,
            category,
            userId: req.user
        });
        res.json({ message: "Your Product has been Added", success: true, product })
    } catch (error) {
        res.json({ message: error.message, success: false })
    }

}

//get All Products
export const getAllProducts = async (req, res) => {
    try {
        let product = await Products.find().sort({ createdAt: -1 });
        res.json({ message: "All Products", product })
    } catch (error) {
        res.json({ message: error.message, success: false })
    }
};
//get product by ID
export const getProductById = async (req, res) => {
    const id = req.params.id
    try {
        if (id.length != 24) return res.json({ message: "Invalid ID" })
        let product = await Products.findById(id);
        if (!product) return res.json({ message: "Invalid ID" })
        res.json({ message: "Product by Id:", product })

    } catch (error) {
        res.json({ message: error.message, success: false })
    }
}
//Get Product by User ID
export const getProductByUserId = async (req, res) => {
    const id = req.user._id;
    // console.log("User ID", id.toString());
    try {
        let product = await Products.find({ userId: id.toString() });

        if (!product) return res.json({ message: "invalid User ID", success: false });

        res.json({ message: "Product by user id", product, success: true })

    } catch (error) {

        res.json({ message: error.message, success: false })
    }
}

// Update product by ID
export const updateByID = async (req, res) => {
    const id = req.params.id
    let product = await Products.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.json({ message: "Invalid ID" })
    res.json({ message: "Your Product has been Updated :", product })

}


// Delete product by ID
export const deleteById = async (req, res) => {
    const id = req.params.id
    let product = await Products.findByIdAndDelete(id);
    if (!product) return res.json({ message: "Invalid ID" });
    res.json({ message: "Your Product has been deleted" })
}

//home
export const home = async (req, res) => {
    res.json({ message: "this is home" })
}

