import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CategoryCard = styled(Link)`
  text-decoration: none;
  color: inherit;

  .card {
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.05);
    }
  }

  .card-img-top {
    height: 200px;
    object-fit: cover;
  }

  .card-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: rgb(11 11 11 / 19%);
    color: white;
    padding: 10px;
    text-align: center;
    font-size: 1.8em;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
