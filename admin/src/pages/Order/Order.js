import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../Api/API";
import Swal from "sweetalert2"; // Import SweetAlert2

const Order = () => {
    const { fetchOrder, order, fetchProduct, product, addOrder, editOrder, deleteOrder } = useContext(ApiContext);

    const [newProduct, setNewProduct] = useState({
        or_code: "",
        or_pd_id: [],
        or_amount: ""
    });

    const [editingOrder, setEditingOrder] = useState(null);
    const [deletingOrderId, setDeletingOrderId] = useState(null);

    useEffect(() => {
        fetchOrder();
        fetchProduct();
    }, []);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setNewProduct((prev) => {
            const updatedPdIds = prev.or_pd_id.includes(value)
                ? prev.or_pd_id.filter((id) => id !== value)
                : [...prev.or_pd_id, value];

            return {
                ...prev,
                or_pd_id: updatedPdIds,
                or_amount: updatedPdIds.length
            };
        });
    };

    const handleAmountChange = (event) => {
        setNewProduct({
            ...newProduct,
            or_amount: event.target.value
        });
    };

    const handleAddOrder = async () => {
        try {
            await addOrder(newProduct);
            await fetchOrder();
            resetNewProduct();
        } catch (error) {
            console.error("Error adding order:", error);
        }
    };

    const handleEditOrder = async () => {
        try {
            await editOrder(editingOrder._id, newProduct);
            await fetchOrder();
            resetNewProduct();
        } catch (error) {
            console.error("Error editing order:", error);
        }
    };

    const handleDeleteOrder = async () => {
        try {
            await deleteOrder(deletingOrderId);
            await fetchOrder();
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    const resetNewProduct = () => {
        setNewProduct({ or_code: "", or_pd_id: [], or_amount: "" });
    };

    const openEditModal = (order) => {
        setEditingOrder(order);
        setNewProduct({
            or_code: order.or_code,
            or_pd_id: order.or_pd_id,
            or_amount: order.or_amount
        });
    };

    const openDeleteModal = (id) => {
        setDeletingOrderId(id);
        // Konfirmasi SweetAlert sebelum penghapusan
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleDeleteOrder();
                Swal.fire(
                    'Deleted!',
                    'Your order has been deleted.',
                    'success'
                );
            }
        });
    };

    return (
        <div>
            <h2>Orders</h2>

            <button
                type="button"
                className="btn btn-primary btn-floating btn-lg rounded-5"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                <i className="bi-file-earmark-plus-fill pe-none"></i>
            </button>

            {/* Modal Add Order */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Order</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <label className="form-label">Pilih Product</label>
                            {Array.isArray(product) && product.map((item) => (
                                <div key={item._id} className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={item._id}
                                        value={item._id}
                                        onChange={handleCheckboxChange}
                                        checked={newProduct.or_pd_id.includes(item._id)}
                                    />
                                    <label className="form-check-label" htmlFor={item._id}>
                                        {item.pd_name}
                                    </label>
                                </div>
                            ))}

                            <label className="form-label mt-3">Jumlah Produk</label>
                            <input
                                className="form-control form-control-sm"
                                type="number"
                                placeholder="Amount"
                                aria-label="Amount"
                                name="ct_amount"
                                value={newProduct.or_amount}
                                onChange={handleAmountChange}
                                disabled={newProduct.or_pd_id.length === 0}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleAddOrder}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Edit Order */}
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
                            <h1 className="modal-title fs-5" id="editModalLabel">Edit Order</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <label className="form-label">Pilih Product</label>
                            {Array.isArray(product) && product.map((item) => (
                                <div key={item._id} className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={item._id}
                                        value={item._id}
                                        onChange={handleCheckboxChange}
                                        checked={newProduct.or_pd_id.includes(item._id)}
                                    />
                                    <label className="form-check-label" htmlFor={item._id}>
                                        {item.pd_name}
                                    </label>
                                </div>
                            ))}

                            <label className="form-label mt-3">Jumlah Produk</label>
                            <input
                                className="form-control form-control-sm"
                                type="number"
                                placeholder="Amount"
                                aria-label="Amount"
                                name="ct_amount"
                                value={newProduct.or_amount}
                                onChange={handleAmountChange}
                                disabled={newProduct.or_pd_id.length === 0}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleEditOrder}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Table */}
            <div className="container mt-3">
                <table className="table responsive">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order && order.length > 0 ? (
                            order.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item.or_pd_id && item.or_pd_id.length > 0
                                            ? item.or_pd_id.map((id) => {
                                                const productItem = product.find((p) => p._id === id);
                                                return productItem ? productItem.pd_name : "";
                                            }).join(", ")
                                            : "N/A"}
                                    </td>
                                    <td>{item.or_amount}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-warning me-1 bi-pencil-square"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editModal"
                                            onClick={() => openEditModal(item)}
                                        >
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger bi-trash"
                                            onClick={() => openDeleteModal(item._id)}
                                        >
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;
