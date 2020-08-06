import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "../../components";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

// Usamos los hooks del cliente de graphql (apollo-client)
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { productListQuery } from "../../graphql/ProductListQuery";
import { deleteProductMutation } from "../../graphql/DeleteProductMutation";
import { AddProductModal } from "../../components/AddProductModal";

export const Products = ({ className }) => {
  const { isShowing, toggle } = useModal();
  const [productAdded, setProductAdded] = useState(null);

  const [
    getProducts,
    {
      called: queryCalled,
      loading: queryLoading,
      error: queryError,
      data: queryData,
    },
  ] = useLazyQuery(productListQuery);

  const [
    deleteProduct,
    {
      called: mutationCalled,
      loading: mutationLoading,
      error: mutationError,
      data: mutationData,
    },
  ] = useMutation(deleteProductMutation);

  // GET llamada
  // Una vez la funcion getProducts esta lista, pedimos los datos a la bdd de graphql
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // DELETE llamada
  function deleteClicked(productId) {
    deleteProduct({
      variables: {
        id: productId,
      },
    })
      .then((res) => {
        alert(`Has elminiado el producto: ${res.data.deleteProduct.name}`);
        // Eliminamos de la tabla el producto que acabamos de quitar de la bdd

        console.log(
          queryData.products.filter(
            (product) => product.id !== deleteProduct.id
          )
        );
      })
      .catch((err) => alert(err));
  }

  // Escuchamos el evento cuando se crea un producto
  useEffect(() => {
    if (productAdded !== null) {
      queryData.products.push(productAdded);
    }
  }, [productAdded]);

  if (queryCalled && queryLoading) return <h1>Loading...</h1>;
  // Si no hemos pedido los datos aun, el componente aun no esta listo
  if (!queryCalled) return <h1>Loading...</h1>;

  if (queryError) return `Error! ${queryError}`;

  return (
    <>
      <div className="items-center justify-between w-full flex">
        <h1 className="text-4xl inline">Products</h1>
        <Button onClick={toggle} className="inline">
          Add Product
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {queryData.products.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5 font-medium text-gray-900">
                              {product.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-900">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                        {product.description}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.price} $
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                        <Link
                          to={`/product/${product.id}/modify`}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          Modify
                        </Link>
                        <a
                          onClick={() => deleteClicked(product.id)}
                          href="#"
                          className="text-red-600 hover:text-indigo-900"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="pt-2">
        Nota: las mutaciones y los datos son generados aleatoriamente, a
        diferencia de la bbdd con JSON que si que son definidos 100% por el
        usuario
      </p>
      <AddProductModal
        isShowing={isShowing}
        hide={toggle}
        // Le pasamos al modal (componente hijo) el metodo 'setClientAdded'
        // para que nos avise cuando se ha creado un nuevo cliente
        productAdded={setProductAdded}
      />
    </>
  );
};
