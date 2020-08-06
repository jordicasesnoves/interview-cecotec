import { useEffect, useState } from "react";

export const useModifyClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientModifiedData, setClientModifiedData] = useState(null);

  const modifyClient = (clientId, clientData) => {
    if (loading) return;
    setLoading(true);

    // peticion POST para añadir el nuevo cliente
    fetch(`http://localhost:3001/clients/${clientId}`, {
      method: "PUT",
      body: JSON.stringify(clientData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setClientModifiedData(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(new Error(err));
        setLoading(false);
      });
  };

  return [modifyClient, clientModifiedData, loading, error];
};
