import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "../Button";
import { useAddClient } from "../../hooks/useAddClient";

export const AddClientModal = ({ isShowing, hide, clientAdded }) => {
  const [values, setValues] = useState({
    dni: "",
    name: "",
    phone: "",
    email: "",
    // Estos valores no los usamos en el formulario pero si al crear el cliente
    points: 0,
    status: "active",
  });

  const [addClient, clientDataAdded, loading, error] = useAddClient();

  const submitForm = (e) => {
    e.preventDefault();
    addClient(values);
  };

  useEffect(() => {
    // Enviar el cliente que se acaba de crear al componente padre, en este caso, la pagina de Clients, para que actualize la lista
    if (clientDataAdded !== null) {
      clientAdded(clientDataAdded);
      hide();
    }
  }, [clientDataAdded]);

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
              <h1 className="text-2xl ">Add Client</h1>
              <div className="sm:flex sm:items-start">
                <form
                  onSubmit={(e) => {
                    submitForm(e, values);
                  }}
                  className="w-full py-6"
                >
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2 tracking-wide">
                      DNI
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="dni"
                      type="text"
                      placeholder="DNI"
                      value={values.dni}
                      onChange={(e) =>
                        setValues({ ...values, dni: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2 tracking-wide">
                      Name
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="name"
                      value={values.name}
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 tracking-wide"
                      htmlFor="username"
                    >
                      Phone
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      type="text"
                      placeholder="phone"
                      value={values.phone}
                      onChange={(e) =>
                        setValues({ ...values, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2 tracking-wide">
                      Email
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="mail"
                      placeholder="Email"
                      value={values.email}
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                      <Button color="red" className="mr-3" onClick={hide}>
                        Cancel
                      </Button>
                      <Button loading={loading} type="submit">
                        Add Client
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
