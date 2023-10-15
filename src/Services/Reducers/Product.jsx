import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    AddProduct: {
        "_id": "652108d2886591d06a970877",
        "user_id": "6512d4f93ce08253f3f8eb3f",
        "name": "12345678903456",
        "description": "<p>234567890-098765432</p>",
        "extra_description": "<p>12345678987654321</p>",
        "brand_id": {
            "_id": "65127e3afa74da2a2f54f56d",
            "name": "Xiaomi",
            "verified": false,
            "is_deleted": false,
            "createdAt": "2023-09-26T06:46:18.711Z",
            "updatedAt": "2023-09-27T08:01:08.495Z"
        },
        "unit_id": "651283c2ab0d9d1d8a76a9a4",
        "category_id": {
            "_id": "650d8d77e607a5a0d895ec8c",
            "name": "Electronics",
            "is_publish": true,
            "is_deleted": false,
            "createdAt": "2023-09-22T12:49:59.116Z",
            "updatedAt": "2023-09-22T15:54:32.100Z"
        },
        "subcategory_id": {
            "_id": "65146918bb9fa346e37773ba",
            "name": "Mobile",
            "category_id": "650d8d77e607a5a0d895ec8c",
            "is_publish": false,
            "is_deleted": false,
            "createdAt": "2023-09-27T17:40:40.447Z",
            "updatedAt": "2023-09-27T17:45:06.678Z"
        },
        "min_order_quantity": 1,
        "max_order_quantity": 5,
        "attributes": [
            {
                "attribute_id": {
                    "_id": "65134c21223e101a7022929a",
                    "name": "RAM",
                    "is_deleted": false,
                    "createdAt": "2023-09-26T21:24:49.507Z",
                    "updatedAt": "2023-09-26T21:57:33.109Z"
                },
                "values": [
                    {
                        "_id": "651353d2be4f7813cd7640ab",
                        "name": "2GB",
                        "attribute_id": "65134c21223e101a7022929a",
                        "is_deleted": false,
                        "createdAt": "2023-09-26T21:57:38.715Z",
                        "updatedAt": "2023-09-26T21:57:38.715Z"
                    },
                    {
                        "_id": "651353e4be4f7813cd7640b6",
                        "name": "4GB",
                        "attribute_id": "65134c21223e101a7022929a",
                        "is_deleted": false,
                        "createdAt": "2023-09-26T21:57:56.104Z",
                        "updatedAt": "2023-09-26T21:57:56.104Z"
                    }
                ],
                "_id": "652108d2886591d06a970878"
            },
            {
                "attribute_id": {
                    "_id": "6513518dbd9fed97663d00e1",
                    "name": "ROM",
                    "is_deleted": false,
                    "createdAt": "2023-09-26T21:47:57.064Z",
                    "updatedAt": "2023-09-26T21:47:57.064Z"
                },
                "values": [
                    {
                        "_id": "651351efbd9fed97663d00ed",
                        "name": "64GB",
                        "attribute_id": "6513518dbd9fed97663d00e1",
                        "is_deleted": false,
                        "createdAt": "2023-09-26T21:49:35.874Z",
                        "updatedAt": "2023-09-26T21:49:35.874Z"
                    },
                    {
                        "_id": "6513526fbd9fed97663d0110",
                        "name": "128GB",
                        "attribute_id": "6513518dbd9fed97663d00e1",
                        "is_deleted": false,
                        "createdAt": "2023-09-26T21:51:43.331Z",
                        "updatedAt": "2023-09-26T21:54:25.756Z"
                    }
                ],
                "_id": "652108d2886591d06a970879"
            }
        ],
        "images": [],
        "SKU": "2345678902345",
        "freshness": "New",
        "type": "Standard",
        "dimensions": [
            ""
        ],
        "returnable": true,
        "cancellable": true,
        "replaceable": true,
        "friendly_url": "4567898765434567890",
        "meta_title": "1234567876543",
        "meta_description": "<p>7654324567893</p>",
        "price": [],
        "guarantee": "45634567891",
        "warranty": "3456763",
        "is_publish": false,
        "is_deleted": false,
        "createdAt": "2023-10-07T07:29:22.035Z",
        "updatedAt": "2023-10-07T07:29:22.035Z"
    }
}
export const ProductReducer = createReducer(initialState, {
    PRODUCT_CREATE_REQUEST: (state) => {
        state.loading = true
    },
    PRODUCT_CREATE_SUCCESS: (state, action) => {
        state.loading = false
        state.AddProduct = action.payload.data
    },
    PRODUCT_CREATE_FAILED: (state, action) => {
        state.loading = false
        state.AddProduct = undefined
        state.error = action.payload.error
    },
    PRODUCT_GET_REQUEST: (state) => {
        state.loading = true
    },
    PRODUCT_GET_SUCCESS: (state, action) => {
        state.loading = false
        state.GetProduct = action.payload.data
    },
    PRODUCT_GET_FAILED: (state, action) => {
        state.loading = false
        state.GetProduct = undefined
        state.error = action.payload.error
    },
    PRODUCT_EDIT_REQUEST: (state) => {
        state.loading = true
    },
    PRODUCT_EDIT_SUCCESS: (state, action) => {
        state.loading = false
        state.EditProduct = action.payload.data
    },
    PRODUCT_EDIT_FAILED: (state, action) => {
        state.loading = false
        state.EditProduct = undefined
        state.error = action.payload.error
    },
    PRODUCT_DELETE_RECOVER_REQUEST: (state) => {
        state.loading = true
    },
    PRODUCT_DELETE_RECOVER_SUCCESS: (state, action) => {
        state.loading = false
        state.DeleteRecoverProduct = action.payload.data
    },
    PRODUCT_DELETE_RECOVER_FAILED: (state, action) => {
        state.loading = false
        state.DeleteRecoverProduct = undefined
        state.error = action.payload.error
    }

})