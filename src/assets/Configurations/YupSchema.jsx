import * as yup from "yup";

export const SignUpSchema = yup.object({
  name: yup.string().required(),
  phone: yup.number().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const SignInSchema = yup.object({
  credential: yup.string().required(),
  password: yup.string().required().min(8),
});

export const BrandSchema = yup.object({
  name: yup.string().required(),
});

export const RoleSchema = yup.object({
  name: yup.string().required(),
});

export const CategorySchema = yup.object({
  name: yup.string().required(),
});

export const SubCategorySchema = yup.object({
  name: yup.string().required(),
  category_id: yup.object().required(),
});

export const AttributeSchema = yup.object({
  name: yup.string().required(),
});

export const UnitSchema = yup.object({
  name: yup.string().required(),
  unit_code: yup.string().required(),
});

export const StockSchema = yup.object({
  product_id: yup.string().required(),
  stocks: yup.array(),
});

export const ProductSchema = yup.object({
  name: yup.string().required(),
  warranty: yup.number().required().positive(),
  guarantee: yup.number().required().positive(),
  returnable: yup.boolean().required(),
  replaceable: yup.boolean().required(),
  SKU: yup.string().required().uppercase(),
  description: yup.string().required(),
  category_id: yup.object().required(),
  subcategory_id: yup.object().required(),
  brand_id: yup.object().required(),
  unit_id: yup.object().required(),
  attributes: yup.array().nullable(),
  tags: yup.array().nullable(),
  max_order_quantity: yup.number().required().positive(),
  min_order_quantity: yup.number().required().positive(),
  freshness: yup.string().required(),
  type: yup.string().required(),
  friendly_url: yup.string().required(),
  when_out_of_stock: yup.boolean().nullable(),
});
