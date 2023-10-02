import axios from "axios"
import { baseUrl, config } from "../../assets/Configurations/Config"



export const GetSubCategoryAction = () => async (dispatch) => {
    try {
        dispatch({ type: "SUBCATEGORY_GET_REQUEST" })
        const { data } = await axios.get(`${baseUrl}/sub-category`, config)
        dispatch({ type: "SUBCATEGORY_GET_SUCCESS", payload: data })
    } catch (error) {
        dispatch({ type: "SUBCATEGORY_GET_FAILED", payload: error?.response?.data?.error })
    }
}

export const CreateSubCategoryAction = (SubCategoryData) => async (dispatch) => {
    try {
        dispatch({ type: "SUBCATEGORY_CREATE_REQUEST" })
        const { data } = await axios.post(`${baseUrl}/sub-category/create`, SubCategoryData, config)
        dispatch({ type: "SUBCATEGORY_CREATE_SUCCESS", payload: data })
        dispatch(GetSubCategoryAction())
    } catch (error) {
        dispatch({ type: "SUBCATEGORY_CREATE_FAILED", payload: error?.response?.data?.error })
    }
}

export const EditSubCategoryAction = (SubCategoryData) => async (dispatch) => {
    try {
        dispatch({ type: "SUBCATEGORY_EDIT_REQUEST" })
        const { data } = await axios.put(`${baseUrl}/sub-category/update/${SubCategoryData?._id}`, SubCategoryData, config)
        dispatch({ type: "SUBCATEGORY_EDIT_SUCCESS", payload: data })
        dispatch(GetSubCategoryAction())
    } catch (error) {
        dispatch({ type: "SUBCATEGORY_EDIT_FAILED", payload: error?.response?.data?.error })
    }
}


export const DeleteSubCategoryAction = (SubCategoryData) => async (dispatch) => {

    try {
        dispatch({ type: "SUBCATEGORY_DELETE_RECOVER_REQUEST" })
        const { data } = await axios.delete(`${baseUrl}/sub-category/delete-recover/${SubCategoryData?._id}`, SubCategoryData, config)
        dispatch({ type: "SUBCATEGORY_DELETE_RECOVER_SUCCESS", payload: data })
        dispatch(GetSubCategoryAction())
    } catch (error) {
        dispatch({ type: "SUBCATEGORY_DELETE_RECOVER_FAILED", payload: error?.response?.data?.error })
    }
}

