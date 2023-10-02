export const disable_sidebar = ["/sign-in", "/sign-up"]
export const disable_subbar = ["/sign-in", "/sign-up"]


// AXIOS CONFIGURATION

// export const axios_config = {
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'X-Requested-With': 'XMLHttpRequest',
//         'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')? document.head.querySelector('meta[name="csrf-token"]').content : ''
//     }
// }

export const baseUrl = import.meta.env.VITE_NODE_SERVER_API
export const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    withCredentials: true,
};