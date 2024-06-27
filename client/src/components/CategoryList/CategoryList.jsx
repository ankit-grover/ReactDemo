import React from 'react';
import { useQuery, gql } from '@apollo/client';
// import { CategoryCard } from './Category.styles';
import Category from '../Category';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      image
    }
  }
`;

const CategoryList = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="row">
      {data.categories.map(category => (
        <Category category={category}/>
      ))}
    </div>
  );
};

export default CategoryList;
