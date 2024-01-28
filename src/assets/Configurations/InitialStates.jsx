export const SignUpInitialState = {
  name: null,
  email: null,
  password: null,
  confirmPassword: null,
  phone: null,
};

export const SignInInitialState = {
  credential: null,
  password: null,
};

export const BrandInitialState = {
  name: null,
  verified: false,
};

export const CategoryInitialState = {
  name: null,
};

export const RoleInitialState = {
  name: null,
};

export const SubCategoryInitialState = {
  name: null,
  category_id: null,
};

export const AttributeInitialState = {
  name: null,
};

export const UnitInitialState = {
  name: null,
  unit_code: null,
};
export const TaxInitialState = {
  name: null,
  value: null,
};

export const ProductInitialState = {
  seller_id: null,
  created_by: null,
  pickup_locations: [],
  description: null,
  type: null,
  name: null,
  extra_description: null,
  product_type: null,
  made_in: null,
  assembled_in: null,
  short_description: null,
  brand_id: null,
  unit_id: null,
  category_id: null,
  faqs : [],
  subcategory_id: null,
  min_order_quantity: 1,
  max_order_quantity: 100,
  attributes: [],
  images: [],
  SKU: null,
  freshness: null,
  returnable: true,
  cancellable: {
    is_cancellable: true,
    cancellable_till: null,
  },
  tax_details: {
    is_tax_included: false,
    tax_id: null,
  },
  is_cod_allowed: true,
  replaceable: true,
  friendly_url: null,
  meta_title: null,
  meta_description: null,
  variations: null,
  warranty_period: null,
  guarantee_period: null,
};

export const StockInitialState = {
  product_id: null,
  stocks: [],
};
