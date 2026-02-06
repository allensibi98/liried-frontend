import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/reports");
      setData(res.data.data || res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="container">
          <h2>Dashboard</h2>

          {error && (
            <ErrorAlert message={error} onClose={() => setError(null)} />
          )}

          {loading ? (
            <LoadingSpinner message="Loading dashboard..." />
          ) : (
            <div className="stats">
              <div className="stat-card">
                <h3>Total Products</h3>
                <p>{data.totalProducts || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Total Inventory Value</h3>
                <p>₹{data.totalInventoryValue || 0}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
