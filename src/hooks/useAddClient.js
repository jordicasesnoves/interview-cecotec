import { useEffect, useState } from "react";

export const useAddClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientDataAdded, setClientDataAdded] = useState(null);

  const addClient = (newClient) => {
    if (loading) return;
    setLoading(true);

    // Anadimos el id del nuevo cliente, el cual esta basado en el momento en el que se crea
    newClient = { id: new Date().getTime(), ...newClient };

    // peticion POST para añadir el nuevo cliente
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
  };

  return [addClient, clientDataAdded, loading, error];
};
