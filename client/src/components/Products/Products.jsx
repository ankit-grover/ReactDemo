import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductsContainer, HeadingContainer, Heading, BreadcrumbContainer, Description } from './Products.style';

const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($categoryId: ID!) {
    category(id: $categoryId) {
      name
      description
    }
    productsByCategory(categoryId: $categoryId) {
      id
      name
      description
      price
      image
      badges
      wishlist
    }
  }
`;

const Products = () => {
  const { categoryId } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { categoryId },
  });

  const staticBaseURL = "http://localhost:9001/static";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <BreadcrumbContainer>
        <Link to="/" className="breadcrumb-item">Home</Link>
        <Link to="/shop" className="breadcrumb-item">Shop</Link>
        <span className="breadcrumb-item">{data.category.name}</span>
      </BreadcrumbContainer>
      <HeadingContainer>
        <Heading>{data.category.name}</Heading>
        <Description>{data.category.description}</Description>
      </HeadingContainer>
      <div className="row">
        {data.productsByCategory.map(product => (
          <div key={product.id} className="col-md-6 col-lg-3 mb-4">
            <ProductsContainer>
              <div className="card">
                {product.badges && product.badges.split(',').map(badge => (
                  <span key={badge} className="badge">{badge}</span>
                ))}
                <img src={`${staticBaseURL}/${product.image}`} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">${product.price.toFixed(2)}</p>
                  <button className="btn btn-dark">
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                  </button>
                </div>
              </div>
            </ProductsContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
