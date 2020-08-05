import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, AddClientModal } from "../../components";
import { useClients } from "../../hooks/useClients";
import { useModal } from "../../hooks/useModal";

export const Clients = () => {
  const [loading, getClients, setClients, clients, error] = useClients();

  const [clientAdded, setClientAdded] = useState(null);
  // Custom hook para mostrar el modal de la pagina
  const { isShowing, toggle } = useModal();

  // Pedir datos
  useEffect(() => {
    getClients();
  }, []);

  // Escuchar cuando se crea un nuevo cliente
  useEffect(() => {
    if (clientAdded !== null) {
      setClients([...clients, clientAdded]);
    }
  }, [clientAdded]);

  if (error) alert(error.message);
  if (loading) return "Loading...";

  return (
    <>
      <div className="items-center justify-between w-full flex mb-6">
        <h1 className="text-4xl inline">Clients</h1>
        <Button onClick={toggle} className="inline">
          Add Client
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => {
                  return (
                    <tr key={client.id}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm leading-5 font-medium text-gray-900">
                              {client.name}
                            </div>
                            <div className="text-sm leading-5 text-gray-500">
                              {client.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-900">
                          {client.phone}
                        </div>
                        <div className="text-sm leading-5 text-gray-500">
                          (Spanish phone)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {client.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                        {client.points}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="text-red-600 hover:text-indigo-900"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
                <AddClientModal
                  isShowing={isShowing}
                  hide={toggle}
                  clientAdded={setClientAdded}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
