export const SignUpInitialState = {
  address: "",
  city: "",
  state: "",
  country: "",
  postal_code: "",
  is_primary: false,
  first_name: "",
  last_name: "",
  phone: "",
  date_of_birth: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  terms_conditions: false,
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
  short_form: "",
};
export const TaxInitialState = {
  name: "",
  value: "",
};

export const ProductInitialState = {
  seller_id: "",
  created_by: "",
  pickup_locations: [],
  description: "",
  type: "",
  name: "",
  extra_description: "",
  product_type: "",
  made_in: "",
  assembled_in: "",
  short_description: "",
  brand_id: "",
  unit_id: "",
  category_id: "",
  faqs: [],
  subcategory_id: "",
  min_order_quantity: 1,
  max_order_quantity: 100,
  attributes: [],
  images: [],
  SKU: "",
  freshness: "",
  returnable: true,
  cancellable: {
    is_cancellable: true,
    cancellable_till: "",
  },
  tax_details: {
    is_tax_included: false,
    taxid: "",
  },
  is_cod_allowed: true,
  replaceable: true,
  friendly_url: "",
  meta_title: "",
  meta_description: "",
  variations: "",
  warranty_period: "",
  guarantee_period: "",
};

export const StockInitialState = {
  productid: "",
  stocks: [],
};
