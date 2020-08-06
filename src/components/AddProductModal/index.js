import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "../Button";

import { addProductMutation } from "../../graphql/AddProductMutation";
import { useMutation } from "@apollo/react-hooks";

const initialValues = {
  name: "",
  description: "",
  price: "",
};

export const AddProductModal = ({ isShowing, hide, productAdded }) => {
  const [
    addProduct,
    {
      called: mutationCalled,
      loading: mutationLoading,
      error: mutationError,
      data: mutationData,
    },
  ] = useMutation(addProductMutation);

  const [values, setValues] = useState(initialValues);

  const submitForm = (e) => {
    e.preventDefault();
    addProduct({
      variables: {
        name: values.name,
        price: parseFloat(values.price),
        description: values.description,
      },
    })
      .then((res) => {
        alert(`Has creado el producto: ${res.data.addProduct.name}`);
        productAdded(res.data.addProduct);
        hide();
        setValues({});
      })
      .catch((err) => alert(err));
  };

  return isShowing
    ? ReactDOM.createPortal(
        <div className="fixed px-4 py-16 inset-0 flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-700 opacity-75"></div>
          </div>
          <div
            className="absolute bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h1 className="text-2xl ">Add Product</h1>
              <div className="sm:flex sm:items-start">
                <form
                  onSubmit={(e) => {
                    submitForm(e, values);
                  }}
                  className="w-full py-6"
                >
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2 tracking-wide">
                      Name
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Name"
                      value={values.name}
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2 tracking-wide">
                      Description
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="description"
                      type="text"
                      placeholder="Description"
                      value={values.description}
                      onChange={(e) =>
                        setValues({ ...values, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 tracking-wide"
                      htmlFor="username"
                    >
                      Price
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="price"
                      type="text"
                      placeholder="Price"
                      value={values.price}
                      onChange={(e) =>
                        setValues({ ...values, price: e.target.value })
                      }
                    />
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                      <Button color="red" className="mr-3" onClick={hide}>
                        Cancel
                      </Button>
                      <Button loading={mutationLoading} type="submit">
                        Add Product
                      </Button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};
