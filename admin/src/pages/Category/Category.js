import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../Api/API";
import Swal from "sweetalert2";

const Category = () => {
  const { fetchCategory, category, addCategory, editCategory, deleteCategory } = useContext(ApiContext);
  
  const [newCategory, setNewCategory] = useState({ ct_code: "", ct_name: "" });
  const [currentCategory, setCurrentCategory] = useState(null); // Untuk edit category
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null); // Untuk delete category
  
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleAddCategory = () => {
    addCategory(newCategory);
    setNewCategory({ ct_code: "", ct_name: "" });
  };

  const handleEditCategory = () => {
    if (currentCategory) {
      editCategory(currentCategory._id, currentCategory);
      setCurrentCategory(null);
    }
  };

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your category has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div>
      <h2>Categories</h2>

      {/* Button Add Category */}
      <button
        type="button"
        className="btn btn-primary btn-floating btn-lg rounded-5"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
      >
        <i className="bi-file-earmark-plus-fill pe-none"></i>
      </button>

      {/* Add Category Modal */}
      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalLabel">Add Category</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control form-control-sm mb-2"
                type="text"
                placeholder="Category Name"
                name="ct_name"
                value={newCategory.ct_name}
                onChange={(e) => setNewCategory({ ...newCategory, ct_name: e.target.value })}
              />
              <input
                className="form-control form-control-sm mb-2"
                type="text"
                placeholder="Category Code"
                name="ct_code"
                value={newCategory.ct_code}
                onChange={(e) => setNewCategory({ ...newCategory, ct_code: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddCategory}>Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">Edit Category</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control form-control-sm mb-2"
                type="text"
                placeholder="Category Name"
                value={currentCategory?.ct_name || ""}
                onChange={(e) => setCurrentCategory({ ...currentCategory, ct_name: e.target.value })}
              />
              <input
                className="form-control form-control-sm mb-2"
                type="text"
                placeholder="Category Code"
                value={currentCategory?.ct_code || ""}
                onChange={(e) => setCurrentCategory({ ...currentCategory, ct_code: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleEditCategory}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Table */}
      <div className="container mt-3">
        <table className="table responsive">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category && category.length > 0 ? (
              category.map((item, index) => (
                <tr key={index}>
                  <td>{item.ct_name}</td>
                  <td>{item.ct_code}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning me-2 bi-pencil-square"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => setCurrentCategory(item)}
                    ></button>
                    <button
                      type="button"
                      className="btn btn-danger bi-trash"
                      onClick={() => handleDeleteCategory(item._id)}
                    ></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No categories available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
