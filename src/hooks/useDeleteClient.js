import { useEffect, useState } from "react";

export const useDeleteClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientIdDeleted, setClientIdDeleted] = useState(null);

  const deleteClient = (id) => {
    if (loading) return;
    setLoading(true);

    fetch(`http://localhost:3001/clients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => setClientIdDeleted(id)) // postdata: el metodo DELETE devuelve una respuesta vacia cuando todo ha ido bien => '{}'
      .catch((err) => {
        setError(new Error(err));
        setLoading(false);
      });
  };

  return [deleteClient, clientIdDeleted, loading, error];
};
