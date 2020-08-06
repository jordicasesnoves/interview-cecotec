import { gql } from "apollo-boost";

export const productListQuery = gql`
  query Products {
    products {
      id
      name
      description
      price
    }
  }
`;
