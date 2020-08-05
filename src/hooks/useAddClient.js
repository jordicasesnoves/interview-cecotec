import { useEffect, useState } from "react";

export const useAddClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientDataAdded, setClientDataAdded] = useState(null);

  const addClient = (newClient) => {
    setLoading(true);
    if (loading) return;
    let clientsLength = null;

    // Primero sacamos cuantos clientes hay ahora mismo
    fetch("http://localhost:3001/clients")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        clientsLength = data.length;

        // Luego añadimos el id del nuevo cliente, el cual esta basado en el numero de clientes actuales
        newClient = { id: clientsLength + 1, ...newClient };

        // Por ultimo realizamos la peticion POST para añadir el nuevo cliente
        fetch("http://localhost:3001/clients", {
          method: "POST",
          body: JSON.stringify(newClient),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((response) => {
            setClientDataAdded(response);
            setLoading(false);
          })
          .catch((err) => {
            setError(new Error(err));
            setLoading(false);
          });
      })
      .catch((err) => {
        let error = new Error(err);
        setError(error);
        setLoading(false);
      });
  };

  return [addClient, clientDataAdded, loading, error];
};
