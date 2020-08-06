import { gql } from "apollo-boost";

export const deleteProductMutation = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      description
      price
    }
  }
`;
