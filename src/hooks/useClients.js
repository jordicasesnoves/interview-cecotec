import { useEffect, useState } from "react";

export const useClients = () => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  const getClients = () => {
    setLoading(true);
    fetch("http://localhost:3001/clients")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch((err) => {
        let error = new Error(err);
        setError(error);
        setLoading(false);
      });
  };

  return [loading, getClients, setClients, clients, error];
};
