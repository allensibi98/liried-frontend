import { useEffect, useState, memo } from "react";

function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
      });
    } else {
      setFormData({ name: "", price: "", quantity: "" });
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", price: "", quantity: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
        aria-label="Product name"
      />
      <input
        name="price"
        type="number"
        step="0.01"
        min="0"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
        aria-label="Product price"
      />
      <input
        name="quantity"
        type="number"
        min="0"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
        aria-label="Product quantity"
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
        {editingProduct && (
          <button type="button" className="cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default memo(ProductForm);
