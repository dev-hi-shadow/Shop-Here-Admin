import axios from "axios"
import { baseUrl, config } from "../../assets/Configurations/Config"



export const GetProductAction = () => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_GET_REQUEST" })
        const { data } = await axios.get(`${baseUrl}/product`, config)
        dispatch({ type: "PRODUCT_GET_SUCCESS", payload: data })
    } catch (error) {
        dispatch({ type: "PRODUCT_GET_FAILED", payload: error?.response?.data?.error })
    }
}

export const CreateProductAction = (ProductData) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_CREATE_REQUEST" })
        const { data } = await axios.post(`${baseUrl}/product/create`, ProductData, config)
        dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: data })
        dispatch(GetProductAction())
    } catch (error) {
        dispatch({ type: "PRODUCT_CREATE_FAILED", payload: error?.response?.data?.error })
    }
}

export const EditProductAction = (ProductData) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_EDIT_REQUEST" })
        const { data } = await axios.put(`${baseUrl}/product/update/${ProductData?._id}`, ProductData, config)
        dispatch({ type: "PRODUCT_EDIT_SUCCESS", payload: data })
        dispatch(GetProductAction())
    } catch (error) {
        dispatch({ type: "PRODUCT_EDIT_FAILED", payload: error?.response?.data?.error })
    }
}


export const DeleteProductAction = (ProductData) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_DELETE_RECOVER_REQUEST" })
        const { data } = await axios.delete(`${baseUrl}/product/delete-recover/${ProductData?._id}`, ProductData, config)
        dispatch({ type: "PRODUCT_DELETE_RECOVER_SUCCESS", payload: data })
        dispatch(GetProductAction())
    } catch (error) {
        dispatch({ type: "PRODUCT_DELETE_RECOVER_FAILED", payload: error?.response?.data?.error })
    }
}

