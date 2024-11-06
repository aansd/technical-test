import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const ApiContext = createContext(null);

const ApiProvider = (props) => {
    const url = "http://localhost:5000";
    const [token, setToken] = useState("");
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${url}/api/products`);
            // console.log(response.data)
            setProduct(response.data.data);
        } catch (error) {
            console.log("Error fetching product data:", error);
        }
    };

    const addProduct = async (productData) => {
        try {
            const response = await axios.post(`${url}/api/products`, productData);
            // console.log(response.data);
           await fetchProduct();
        } catch (error) {
            console.log("Error adding product data:", error);
        }
    }

    const editProduct = async (id, updateData) => {
        try{
            const response  = await axios.put(`${url}/api/products/${id}`, updateData);
            await fetchProduct();
            // console.log(response.data);
        }catch(error){
            console.log("Error edit product data", error);
        }
    }

    const deleteProduct = async (id) => {
        try{
            const response = await axios.delete(`${url}/api/products/${id}`);
            await fetchProduct();
            // console.log(response.data);
        }catch(error){
            console.log("error delete product data", error);
        }
    }

    const fetchCategory = async () => {
        try{
        const response = await axios.get(`${url}/api/categories`);
        // console.log(response.data)
        setCategory(response.data);
        }catch(error){
            console.log("Error fetch category data", error);
        }
    }

    const addCategory = async (addCategory) => {
        try{
            const response = await axios.post(`${url}/api/categories`, addCategory);
            await fetchCategory();
        }catch(error){
            console.log("error add category data", error);
        }
    }

    const editCategory = async (id, editCategorys) => {
        try{
            const response = await axios.put(`${url}/api/categories/${id}`, editCategorys);
            // console.log(response.data);
            await fetchCategory();
        }catch(error){
            console.log("error edit category data", error);
        }
    }

    const deleteCategory = async (id) => {
        try{
            const response = await axios.delete(`${url}/api/categories/${id}`);
            await fetchCategory();
        }catch(error){
            console.log("error delete categories data", error);
        }
    }

    const fetchOrder = async () => {
        try{
            const response = await axios.get(`${url}/api/order`);
            // console.log("order", response.data);
            setOrder(response.data);
        }catch(error){
            console.log("error fetch order data", error);
        }
    }

    const addOrder = async (add) => {
        try{
            const response = await axios.post(`${url}/api/order`, add);
            console.log(response.data);
            fetchOrder();
        }catch(error){
            console.log("error add order data", error);
        }
    }

    const editOrder = async (id, edit) => {
        try{
            const response = await axios.put(`${url}/api/order/${id}`, edit);
            fetchOrder();
        }catch(error){
            console.log("error edit order data", error);
        }
    }

    const deleteOrder = async (id) => {
        try{
            const response = await axios.delete(`${url}/api/order/${id}`);
            fetchOrder();
        }catch(error){
            console.log("error delete order data", error);
        }
    }

    const login = async (loginData) => {
        try {
            const response = await axios.post(`${url}/auth/login`, loginData);
            console.log(response.data);
            if (response.data.success) {
                const token = response.data.token;
                setToken(token);
                localStorage.setItem("token", token);
                console.log("login success", response.data.message);
                return { success: true, message: response.data.message };
            } else {
                console.log("login failed", response.data.message);
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.log("error login process", error.response ? error.response.data : error.message);
        }
    };
 
    const logout = async () => {
        try{
            const response = await axios.post(`${url}/auth/logout`);
            console.log(response.data.message);
        }catch(error){
            console.log("error logout proses", error);
        }
    }

    const register = async (registerData) => {
        try{
            const response = await axios.post(`${url}/auth/register`, registerData);
            if(response.data.success) {
                console.log("Register success", response.data.message);
                return {success: true, message: response.data.message};
            }else{
                console.log("register failed", response.data.message);
                return {success: false, message: response.data.message};
            }
        }catch(error){
            console.log("error register proses", error);
        }
    }

    const showUser = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${url}/auth/show`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);  
        } catch (error) {
          console.log("Error fetching user data:", error) ;
        }
      };

    useEffect(() => {
        async function loadData() {
          if (localStorage.getItem("token", token)) {
            setToken(localStorage.getItem("token"));
            await fetchProduct();
            await fetchCategory();
            await fetchOrder();
            await showUser();
          }
        }
        loadData();
      }, []);

    const contextValue = {
        fetchProduct,
        product,
        addProduct,
        fetchCategory,
        category,
        editProduct,
        deleteProduct,
        addCategory,
        editCategory,
        deleteCategory,
        fetchOrder,
        order,
        addOrder,
        editOrder,
        deleteOrder,
        login,
        logout,
        register,
        token,
        showUser,
        user
    };

    return (
        <ApiContext.Provider value={contextValue}>
            {props.children}
        </ApiContext.Provider>
    );
};

export default ApiProvider;
