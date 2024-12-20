import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { Product } from "../types/Product";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get<Product[]>("/termekek");
        setProducts(response.data);
      } catch (err: any) {
        setError(err.message || "Hiba történt a termékek lekérése közben.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Termékek</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Név</th>
              <th>Kategória</th>
              <th>Ár (Ft)</th>
              <th>Készlet (db)</th>
              <th>Leírás</th>
              <th>Kép URL</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nev}</td>
                <td>{product.kategoria.nev}</td>
                <td>{product.ar}</td>
                <td>{product.keszlet}</td>
                <td>{product.leiras}</td>
                <td>{product.kepUrl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsPage;
