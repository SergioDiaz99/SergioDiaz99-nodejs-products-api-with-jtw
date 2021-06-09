import Product from '../models/Product'

export const saveProduct = async (req,res) => {

    if(!req.body.name){
        return res.status(400).json({
            message: 'Content cannot be empty!'
        });
    }
    try{
        const newProduct = new Product ({
            name: req.body.name,
            description: req.body.description,
            brand: req.body.brand,
            price: req.body.price,
        }) ;
        const product = await newProduct.save();
        res.status(201).json(product);
    }catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong saving the product'
        })
    }
}

export const findAllProducts = async (req,res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong retrieving the products'
        })
    }

}

export const findProductById = async (req,res) => {
    try{
        const product = await Product.findById(req.params.productId);
        res.json(product);
    }catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong retrieving the product'
        })
    }

}

export const deleteProductById = async (req,res) => {
   try{
        await Product.findByIdAndDelete(req.params.productId);
        res.json('Product was deleted successfully!');
    }catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong deleting the product'
        })
    }

}

export const updateProductById = async (req,res) => {

    if(!req.body.name){
        return res.status(400).json({
            message: 'Content cannot be empty!'
        });
    }

    try{
        const newProduct = await Product.findByIdAndUpdate(req.params.productId, req.body,{
            new: true
        });
        res.json(newProduct);
    }catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong updating the product'
        })
    }

}