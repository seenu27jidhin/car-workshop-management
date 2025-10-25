import React from 'react';
import Banner from '../../components/ProductBanner/Banner.jsx';
import ServiceHighlights from '../../components/ProductServiceHighlights/ServiceHighlights';
import CategoryGrid from '../../components/ProductCategory/productCategory.jsx';
import PromoBanners from '../../components/ProductPromoBanners/PromoBanners.jsx';
import ProductList from '../../components/ProductProductList/productProductList.jsx';
import './productPage.css';

const ProductPage = () => (
  <div className="product-page">
    <Banner />
    <ServiceHighlights />
    <CategoryGrid />
    <PromoBanners />
    <div className="product-section">
      <ProductList title="Hot Deals" />
      {/* <ProductList title="Featured Products" /> */}
    </div>
  </div>
);

export default ProductPage;
