import React from 'react';
import CategoryList from '../../components/CategoryList/CategoryList';
import { ShopContainer, ShopHeader, ShopTitle, ShopSubtitle } from './ShopPage.styles';

const ShopPage = () => {
  return (
    <ShopContainer className='container'>
      <ShopHeader>
        <ShopTitle>Welcome to Our Shop</ShopTitle>
        <ShopSubtitle>Explore our diverse range of categories and find what you need.</ShopSubtitle>
      </ShopHeader>
      
      <CategoryList />
    </ShopContainer>
  );
};

export default ShopPage;
