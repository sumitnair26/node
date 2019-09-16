const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product',{
        pageTitle: 'Add Product',
        path:'/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
 }

 exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}


exports.getProducts = (req, res, next) => {
    //console.log('shop js', adminData.products);
    //res.sendFile(path.join(rootDir,'views', 'shop.html'));
    //const products = adminData.products;
    const products = Product.fetchAll();

    res.render('shop', {
        prods: products,
        docTitle: 'Shop',
        path:'/',
        pageTitle:'Shop'
    }); //pug view
}