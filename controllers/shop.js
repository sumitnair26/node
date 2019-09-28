const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    //console.log('shop js', adminData.products);
    //res.sendFile(path.join(rootDir,'views', 'shop.html'));
    //const products = adminData.products;
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            docTitle: 'All products',
            path:'/products',
            pageTitle:'All products'
        }); //pug view
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            docTitle: 'Shop',
            path:'/',
            pageTitle:'Shop'
        }); //pug view
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};