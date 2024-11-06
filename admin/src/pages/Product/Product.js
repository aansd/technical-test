import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../Api/API";
import Swal from "sweetalert2";

const Product = () => {
  const { product, fetchProduct, addProduct, deleteProduct, category, fetchCategory, editProduct } = useContext(ApiContext);
  
  const [newProduct, setNewProduct] = useState({
    pd_code: "",
    pd_name: "",
    pd_price: "",
    pd_ct_id: ""
  });

  const [editProductData, setEditProductData] = useState(null);

  useEffect(() => {
    fetchProduct();
    fetchCategory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleSaveProduct = () => {
    addProduct(newProduct);
    setNewProduct({ pd_code: "", pd_name: "", pd_price: "", pd_ct_id: "" });
  };

  const handleEditProduct = (product) => {
    setEditProductData(product);
  };

  const handleSaveEditProduct = () => {
    editProduct(editProductData._id, editProductData);
    setEditProductData(null);
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      }
    });
  };

  return (
    <div>
      <h2>Product</h2>
      
      {/* Button to open add product modal */}
      <button
        type="button"
        className="btn btn-primary btn-floating btn-lg rounded-5"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        <i className="bi-file-earmark-plus-fill pe-none"></i>
      </button>

      {/* Add Product Modal */}
      <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Input fields to add product */}
              <input className="form-control form-control-sm mb-2" type="text" placeholder="Product Code" name="pd_code" value={newProduct.pd_code} onChange={handleInputChange} />
              <input className="form-control form-control-sm mb-2" type="text" placeholder="Product Name" name="pd_name" value={newProduct.pd_name} onChange={handleInputChange} />
              <input className="form-control form-control-sm mb-2" type="number" placeholder="Product Price" name="pd_price" value={newProduct.pd_price} onChange={handleInputChange} />
              <select className="form-select mb-2" name="pd_ct_id" value={newProduct.pd_ct_id} onChange={handleInputChange}>
                <option value="">Select Category</option>
                {category && category.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.ct_name}</option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSaveProduct} data-bs-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Product</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Input fields to edit product */}
              {editProductData && (
                <>
                  <input className="form-control form-control-sm mb-2" type="text" placeholder="Product Code" name="pd_code" value={editProductData.pd_code} onChange={(e) => setEditProductData({ ...editProductData, pd_code: e.target.value })} />
                  <input className="form-control form-control-sm mb-2" type="text" placeholder="Product Name" name="pd_name" value={editProductData.pd_name} onChange={(e) => setEditProductData({ ...editProductData, pd_name: e.target.value })} />
                  <input className="form-control form-control-sm mb-2" type="number" placeholder="Product Price" name="pd_price" value={editProductData.pd_price} onChange={(e) => setEditProductData({ ...editProductData, pd_price: e.target.value })} />
                  <select className="form-select mb-2" name="pd_ct_id" value={editProductData.pd_ct_id} onChange={(e) => setEditProductData({ ...editProductData, pd_ct_id: e.target.value })}>
                    <option value="">Select Category</option>
                    {category && category.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.ct_name}</option>
                    ))}
                  </select>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSaveEditProduct} data-bs-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="container mt-3">
        <table className="table responsive">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Categories</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {product && product.length > 0 ? (
            product.map((item, index) => (
              <tr key={index}>
                <td>{item.pd_name}</td>
                <td>{item.pd_code}</td>
                <td>{item.pd_ct_id ? item.pd_ct_id.ct_name : "No Category"}</td>
                <td>Rp.{item.pd_price}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning me-2 bi-pencil-square"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => handleEditProduct(item)}
                  ></button>
                  <button
                    type="button"
                    className="btn btn-danger bi-trash"
                    onClick={() => handleDeleteProduct(item._id)}
                  ></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No products available</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
