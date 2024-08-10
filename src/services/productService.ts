import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedProducts = async () => {
  const products = [
    {
      title: "laptop",
      image:
        "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/g-series/g16-7630/media-gallery/black/notebook-g16-7630-nt-black-gallery-1.psd?fmt=pjpg&pscan=auto&scl=1&wid=3500&hei=2625&qlt=100,1&resMode=sharp2&size=3500,2625&chrss=full&imwidth=5000",
      price: 15000,
      stock: 10,
    },
  ];

  const existingProducts = await getAllProducts();
  if (existingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};
