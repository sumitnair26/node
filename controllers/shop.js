const Product = require('../models/product');
const Cart = require('../models/cart');

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

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product =>{
        res.render('shop/product-detail', {
            product: product,
            pageTitle:product.title,
            path:'/products'
        });
    });
}

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

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};


exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Orders'
    });
};