import * as yup from "yup";

export const SignUpSchema = yup.object({
  name: yup.string().trim().required(),
  phone: yup.number().required(),
  email: yup.string().trim().email().required(),
  password: yup.string().trim().required().min(8),
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const SignInSchema = yup.object({
  credential: yup.string().trim().required(),
  password: yup.string().trim().required().min(8),
});

export const BrandSchema = yup.object({
  name: yup.string().trim().required(),
});

export const RoleSchema = yup.object({
  name: yup.string().trim().required(),
});

export const CategorySchema = yup.object({
  name: yup.string().trim().trim().required(),
});

export const SubCategorySchema = yup.object({
  name: yup.string().trim().required(),
  category_id: yup.string().trim().required(),
});

export const AttributeSchema = yup.object({
  name: yup.string().trim().required(),
});

export const UnitSchema = yup.object({
  name: yup.string().trim().required(),
  unit_code: yup.string().trim().required(),
});

export const StockSchema = yup.object({
  product_id: yup.string().trim().required(),
  stocks: yup.array(),
});

export const ProductSchema = yup.object({
  name: yup.string().trim().required(),
  warranty: yup.number().required().positive(),
  guarantee: yup.number().required().positive(),
  returnable: yup.boolean().required(),
  replaceable: yup.boolean().required(),
  SKU: yup.string().trim().required().uppercase(),
  description: yup.string().trim().required(),
  category_id: yup.string().required(),
  subcategory_id: yup.string().required(),
  brand_id: yup.string().required(),
  unit_id: yup.string().required(),
  attributes: yup.array().nullable(),
  tags: yup.array().nullable(),
  max_order_quantity: yup.number().required().positive(),
  min_order_quantity: yup.number().required().positive(),
  freshness: yup.string().trim().required(),
  type: yup.string().trim().required(),
  friendly_url: yup.string().trim().required(),
  when_out_of_stock: yup.boolean().nullable(),
  price: yup
    .array()
    .of(
      yup.object().shape({
        attribute_ids: yup
          .array()
          .of(yup.string().trim().required())
          .required()
          .min(1),
        manufacture_price: yup
          .number()
          .required("manufacture price is required")
          .positive([0, "manufacture price can not be negative"]),
        retail_price: yup
          .number()
          .required("retail price is required ")
          .positive([0, "retail price can not be negative"]),
      })
    )
    .required()
    .min(1),
});
