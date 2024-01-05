export const SignUpInitialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

export const SignInInitialState = {
  credential: "",
  password: "",
};

export const BrandInitialState = {
  name: "",
  verified: false,
};

export const CategoryInitialState = {
  name: "",
};

export const RoleInitialState = {
  name: "",
};

export const SubCategoryInitialState = {
  name: "",
  category_id: "",
};

export const AttributeInitialState = {
  name: "",
};

export const UnitInitialState = {
  name: "",
  unit_code: "",
};

export const ProductInitialState = {
  name: "",
  SKU: "",
  returnable: true,
  cancellable: true,
  replaceable: true,
  description: "",
  extra_description: "",
  category_id: "",
  subcategory_id: "",
  brand_id: "",
  unit_id: "",
  attributes: "",
  tags: "",
  max_order_quantity: 5,
  min_order_quantity: 1,
  freshness: "",
  type: "",
  mfg_price: "",
  friendly_url: "",
  dimensions: "",
  when_out_of_stock: false,
  meta_title: "",
  meta_description: "",
  guarantee: "",
  warranty: "",
  product_type : "",




};

export const StockInitialState = {
  product_id: "",
  stocks: [],
};
