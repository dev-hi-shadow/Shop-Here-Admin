import * as yup from "yup";

export const SignUpSchema = yup.object({
  address: yup.string().required().label("Address"),
  city: yup.string().required().label("City"),
  state: yup.string().required().label("State"),
  country: yup.string().required().label("Country"),
  postal_code: yup.string().required().label("Postal code"),
  is_primary: yup.boolean().required().label("Is primary address"),
  first_name: yup.string().required().label("First name"),
  last_name: yup.string().required().label("Last name"),
  phone: yup.number().required().label("Phone"),
  date_of_birth: yup.date().required().label("Date of birth"),
  username: yup.string().required().label("Username"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password"),
  confirm_password: yup
    .string()
    .required()
    .label("Confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const SignInSchema = yup.object({
  credential: yup.string().trim().required(" can not be an empty!"),
  password: yup.string().trim().required(" can not be an empty!").min(8),
});

export const BrandSchema = yup.object({
  name: yup.string().trim().required(" can not be an empty!"),
});

export const RoleSchema = yup.object({
  name: yup.string().trim().required(" can not be an empty!"),
});

export const CategorySchema = yup.object({
  name: yup.string().trim().trim().required(" can not be an empty!"),
});

export const SubCategorySchema = yup.object({
  name: yup.string().trim().required(" can not be an empty!"),
  category_id: yup.string().trim().required(" can not be an empty!"),
});

export const AttributeSchema = yup.object({
  name: yup.string().trim().required(" can not be an empty!"),
});

export const UnitSchema = yup.object({
  name: yup.string().trim().required(" can not be an empty!"),
  unit_code: yup.string().trim().required(" can not be an empty!"),
});
export const TaxSchema = yup.object({
  name: yup.string().trim().required("tax can not be an empty!"),
  value: yup.number().required(" percentage can not be an empty!"),
});

export const StockSchema = yup.object({
  product_id: yup.string().trim().required(" can not be an empty!"),
  stocks: yup.array(),
});

export const ProductSchema = yup.object({
  seller_id: yup.string().nullable(),
  pickup_locations: yup
    .array()
    .of(yup.object())
    .required("Please select atleast 1 pickup location")
    .min(1, "Please select atleast 1 pickup location"),
  description: yup.string().required("Description can not be an empty!"),
  name: yup.string().required("Name can not be an empty!"),
  extra_description: yup.string().nullable(),
  product_type: yup.string().required("Type can not be an empty!"),
  made_in: yup.string().required("Please select one value!"),
  assembled_in: yup.string().nullable(),
  short_description: yup
    .string()
    .required("Short description can not be an empty!"),
  type: yup.string().required("type can not be an empty"),
  brand_id: yup.string().required("brand can not be an empty!"),
  unit_id: yup.string().required("unit can not be an empty!"),
  category_id: yup.string().required("category can not be an empty!"),
  subcategory_id: yup.string().required("Sub category can not be an empty!"),
  min_order_quantity: yup.number().nullable(),
  max_order_quantity: yup.number().nullable(),
  attributes: yup.array().of(yup.object()),
  // images: yup.string().required(" can not be an empty!"),
  SKU: yup.string().required("SKU can not be an empty!"),
  freshness: yup.string().required("Freshness can not be an empty!"),
  returnable: yup.boolean().oneOf([true, false], "Internal error"),
  tax_details: yup.object().shape({
    is_tax_included: yup.boolean().oneOf([true, false], "Internal error"),
    tax_id: yup.string().when("is_tax_included", {
      is: false,
      then: yup.string().required("tax cannot be an empty!"),
      otherwise: yup.string().notRequired(),
    }),
  }),
  cancellable: yup.object().shape({
    is_cancellable: yup.boolean().oneOf([true, false], "Internal error"),
    cancellable_till: yup.string().when("is_cancellable", {
      is: true,
      then: yup
        .string()
        .required("cancellable till status cannot be an empty!"),
    }),
  }),
  is_cod_allowed: yup.boolean().oneOf([true, false], "Internal error"),
  replaceable: yup.boolean().oneOf([true, false], "Internal error"),
  friendly_url: yup.string().nullable(),
  meta_title: yup.string().nullable(),
  meta_description: yup.string(),
  warranty_period: yup
    .number()
    .nullable()
    .positive([0, "Warranty can not be negative"]),

  guarantee_period: yup
    .number()
    .nullable()
    .positive([0, "Warranty can not be negative"]),
  variations: yup
    .array()
    .of(
      yup.object().shape({
        attribute_ids: yup
          .array()
          .of(yup.string().trim().required(" can not be an empty!"))
          .required(" can not be an empty!")
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
    .required(" can not be an empty!")
    .min(1),
});
