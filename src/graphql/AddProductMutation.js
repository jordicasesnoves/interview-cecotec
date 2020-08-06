import { gql } from "apollo-boost";

export const addProductMutation = gql`
  mutation addProduct($name: String!, $description: String, $price: Float!) {
    addProduct(name: $name, description: $description, price: $price) {
      id
      name
      description
      price
    }
  }
`;
