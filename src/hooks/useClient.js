import { useEffect, useState } from "react";

export const useClient = (clientId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [client, setClient] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function fetchClient() {
      try {
        const res = await fetch(`http://localhost:3001/clients/${clientId}`);
        const data = await res.json();

        setClient(data);
        setLoading(false);
      } catch (err) {
        setError(new Error(err));
        setLoading(false);
      }
    }
    fetchClient();
  }, [clientId]);

  return [loading, client, error];
};
