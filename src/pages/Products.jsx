import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import ProductForm from "../components/ProductForm";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import SuccessToast from "../components/SuccessToast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/products");
      setProducts(res.data.data || res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async (productData) => {
      try {
        setError(null);
        if (editingProduct) {
          await api.put(`/products/${editingProduct.id}`, productData);
          setSuccess("Product updated successfully!");
          setEditingProduct(null);
        } else {
          await api.post("/products", productData);
          setSuccess("Product added successfully!");
        }
        load();
      } catch (err) {
        setError(err.message);
      }
    },
    [editingProduct, load]
  );

  const handleEdit = useCallback((product) => {
    setEditingProduct(product);
    setError(null);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        try {
          setError(null);
          await api.delete(`/products/${id}`);
          setSuccess("Product deleted successfully!");
          load();
        } catch (err) {
          setError(err.message);
        }
      }
    },
    [load]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingProduct(null);
    setError(null);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="container">
          <h2>Products</h2>

          {error && (
            <ErrorAlert message={error} onClose={() => setError(null)} />
          )}

          {success && (
            <SuccessToast
              message={success}
              onClose={() => setSuccess(null)}
            />
          )}

          <ProductForm
            onSubmit={handleSubmit}
            editingProduct={editingProduct}
            onCancel={handleCancelEdit}
          />

          {loading ? (
            <LoadingSpinner message="Loading products..." />
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <p className="empty-state-message">No products yet</p>
              <p className="empty-state-hint">Add your first product above</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>₹{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>
                      <div className="actions">
                        <button className="edit" onClick={() => handleEdit(p)}>
                          Edit
                        </button>
                        <button
                          className="delete"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
