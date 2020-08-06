import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { useClient } from "../../hooks/useClient";
import { useModifyClient } from "../../hooks/useModifyClient";

export const ModifyClient = (props) => {
  // Sacamos el clientId de los parametros de la ruta
  let { clientId } = useParams();
  let history = useHistory();
  const [values, setValues] = useState(null);
  const [loadingClient, client, errorClient] = useClient(clientId);
  const [
    modifyClient,
    clientModifiedData,
    loadingModifyClient,
  ] = useModifyClient();

  // Esperamos a recibir los datos del cliente de la base de datos para mostrar el formulario
  useEffect(() => {
    if (client !== null) {
      console.log(client);
      setValues(client);
    }
  }, [client]);

  // Cuando tenemos los datos del cliente modificado, significa que se ha modificado satisfactoriamente
  // Redirigimos al usuario a la pagina de clientes
  useEffect(() => {
    if (clientModifiedData !== null) {
      history.push("/clients");
    }
  }, [clientModifiedData]);

  const submitForm = (e) => {
    e.preventDefault();
    modifyClient(clientId, values);
  };

  if (loadingClient) return "Loading...";
  if (values == null) return "Loading...";

  return (
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
          <h1 className="text-2xl ">Modify Client</h1>
          <div className="sm:flex sm:items-start">
            <form
              onSubmit={(e) => {
                submitForm(e);
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
                  <Button className="mr-3" color="red">
                    <Link color="red" to={`/clients`}>
                      Cancel
                    </Link>
                  </Button>
                  <Button loading={loadingModifyClient} type="submit">
                    Modify Client
                  </Button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
