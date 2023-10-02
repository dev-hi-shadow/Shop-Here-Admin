import axios from "axios"
import { baseUrl, config } from "../../assets/Configurations/Config"

export const GetRoleAction = () => async (dispatch) => {
    try {
        dispatch({ type: "ROLE_GET_REQUEST" })
        const { data } = await axios.get(`${baseUrl}/role`, config)
        dispatch({ type: "ROLE_GET_SUCCESS", payload: data })
    } catch (error) {
        dispatch({ type: "ROLE_GET_FAILED", payload: error?.response?.data?.error })
    }
}

export const CreateRoleAction = (RoleData) => async (dispatch) => {
    try {
        dispatch({ type: "ROLE_CREATE_REQUEST" })
        const { data } = await axios.post(`${baseUrl}/role/create`, RoleData, config)
        dispatch({ type: "ROLE_CREATE_SUCCESS", payload: data })
        dispatch(GetRoleAction())
    } catch (error) {
        dispatch({ type: "ROLE_CREATE_FAILED", payload: error?.response?.data?.error })
    }
}

export const EditRoleAction = (RoleData) => async (dispatch) => {
    try {
        dispatch({ type: "ROLE_EDIT_REQUEST" })
        const { data } = await axios.put(`${baseUrl}/role/update/${RoleData?._id}`, RoleData, config)
        dispatch({ type: "ROLE_EDIT_SUCCESS", payload: data })
        dispatch(GetRoleAction())
    } catch (error) {
        dispatch({ type: "ROLE_EDIT_FAILED", payload: error?.response?.data?.error })
    }
}

export const DeleteRoleAction = (RoleData) => async (dispatch) => {
    try {
        dispatch({ type: "ROLE_DELETE_RECOVER_REQUEST" })
        const { data } = await axios.delete(`${baseUrl}/role/delete-recover/${RoleData?._id}`, RoleData, config)
        dispatch({ type: "ROLE_DELETE_RECOVER_SUCCESS", payload: data })
        dispatch(GetRoleAction())
    } catch (error) {
        dispatch({ type: "ROLE_DELETE_RECOVER_FAILED", payload: error?.response?.data?.error })
    }
}

