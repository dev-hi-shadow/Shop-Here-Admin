export const disable_sidebar = ["/sign-in", "/sign-up"];
export const disable_subbar = ["/sign-in", "/sign-up"];

// AXIOS CONFIGURATION

// export const axios_config = {
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'X-Requested-With': 'XMLHttpRequest',
//         'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')? document.head.querySelector('meta[name="csrf-token"]').content : ''
//     }
// }

export const baseUrl = import.meta.env.VITE_NODE_SERVER_API;
export const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "Application/JSON",
    Authorization: localStorage.getItem("accessToken"),
  },
  withCredentials: true,
};

export const CustomFind = (array, id, key) => {
  return (
    Array.isArray(array) &&
    array.find((item) => {
      return item._id === id;
    })[key]
  );
};

export const ORDER_STATUSES = Object.freeze({
  AWAITING_FULFILLMENT: {
    name: "Awaiting Fulfillment",
    description:
      " Customer has completed the checkout process and payment has been confirmed.",
    mode: "CORE",
  },
  AWAITING_PAYMENT: {
    name: "Awaiting Payment",
    description:
      "Customer has completed the checkout process, but payment has yet to be confirmed. Authorize only transactions that are not yet captured have this status.",
    mode: "CORE",
  },
  AWAITING_PICKUP: {
    name: "Awaiting Pickup",
    description:
      "Order has been packaged and is awaiting customer pickup from a seller-specified location",
    mode: "CORE",
  },
  AWAITING_SHIPMENT: {
    name: "Awaiting Shipment",
    description:
      "Order has been pulled and packaged and is awaiting collection from a shipping provider",
    mode: "CORE",
  },
  CANCELLED: {
    name: "Cancelled",
    description:
      "Seller has cancelled an order, due to a stock inconsistency or other reasons. Stock levels will automatically update depending on your Inventory Settings. Cancelling an order will not refund the order. This status is triggered automatically when an order using an authorize-only payment gateway is voided in the control panel before capturing payment.",
    mode: "GENERAL",
  },
  COMPLETED: {
    name: "Completed ",
    description:
      "Order has been shipped/picked up, and receipt is confirmed; client has paid for their digital product, and their file(s) are available for download.",
    mode: "GENERAL",
  },
  DECLINED: {
    name: "Declined ",
    description: "Seller has marked the order as declined.",
    mode: "CORE",
  },
  DELIVERED: {
    name: "Out For Delivery",
    description: "A delivery boy has been out for delivery with your order",
    mode: "GENERAL",
  },
  DISPUTED: {
    name: "Disputed",
    description:
      " Customer has initiated a dispute resolution process for the PayPal transaction that paid for the order or the seller has marked the order as a fraudulent order.",
    mode: "CORE",
  },
  MANUALLY_VERIFICATION_REQUIRED: {
    name: "Manual Verification Required ",
    description:
      "Order on hold while some aspect, such as tax-exempt documentation, is manually confirmed. Orders with this status must be updated manually. Capturing funds or other order actions will not automatically update the status of an order marked Manual Verification Required..",
    mode: "CORE",
  },
  OUT_FOR_DELIVERY: {
    name: "Out For Delivery",
    description: "A delivery boy has been out for delivery with your order",
    mode: "GENERAL",
  },
  PARTIALLY_REFUNDED: {
    name: "Partially Refunded",
    description: " Seller has partially refunded the order.",
    mode: "CORE",
  },
  PARTIALLY_SHIPPED: {
    name: "Partially Shipped",
    description: "Only some items in the order have been shipped.",
    mode: "CORE",
  },
  PENDING: {
    name: "Pending",
    description:
      "Customer started the checkout process but did not complete it. Incomplete orders are assigned a `Pending` status and can be found under the More tab in the View Orders screen.",
    mode: "CORE",
  },
  REFUNDED: {
    name: "Refunded ",
    description:
      "Seller has used the Refund action to refund the whole order. A listing of all orders with a  `Refunded` status can be found under the More tab of the View Orders screen.  ",
    mode: "GENERAL",
  },
  SHIPPED: {
    name: "Shipped",
    description:
      "Order has been shipped, but receipt has not been confirmed; seller has used the Ship Items action. A listing of all orders with a `Shipped` status can be found under the More tab of the View Orders screen.",
    mode: "GENERAL",
  },
});
