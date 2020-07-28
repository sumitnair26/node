const Product = require('../models/product');
const mongo = require('mongodb');

const ObjectId = mongo.ObjectId;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product',{
        pageTitle: 'Add Product',
        path:'/admin/add-product',
        editing:false
    });
 };

 exports.postAddProduct = (req, res, next) => {
     const title = req.body.title;
     const imageUrl = req.body.imageUrl;
     const price = req.body.price;
     const description = req.body.description;
     const product = new Product(title, price, description, imageUrl);

     product.save()
     .then( result => {
        console.log('Created Product');
        res.redirect('/admin/products');
     }
     ).catch(err => {
             console.log(err);
         });

};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
       return res.redirect('/');
    }
    const prodId = req.params.productId;
    //req.user.getProducts({where : { id: prodId}})
    //Product.findByPk(prodId)
    Product.findById(prodId)
    .then(
        product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product',{
                pageTitle: 'Edit Product',
                path:'/admin/edit-product',
                editing: editMode,
                product:product
            });
        }).catch(err => {
            console.log(err);
        });
 };

 exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
            // product.title = updatedTitle;
            // product.price = updatedPrice;
            // product.description = updatedDesc;
            // product.imageUrl = updatedImageUrl;
            const product = new Product(
                updatedTitle,
                updatedPrice,
                updatedDesc,
                updatedImageUrl,
                new ObjectId(prodId));
            //return product.save();
            product.save().then(
        result => {
            console.log('Updated Product');
            res.redirect('/admin/products');
        })
    .catch(
        err => {
            console.log(err);
        }
    );
 };

exports.getProducts = (req, res, next) => {
    // Product.findAll()
    // req.user.getProducts()
    Product.fetchAll()
    .then(products => {
        res.render('admin/products', {
            prods: products,
            docTitle: 'Shop',
            path:'/admin/products',
            pageTitle:'Admin Products'
        }); //pug view
    }).catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(() => {
        console.log('Destroyed product');
        res.redirect('/admin/products');
    })
    .catch( err => console.log(err));
};