// import { configureStore , combineReducers } from "@reduxjs/toolkit";
// import { AuthenticationReducer } from "./Reducers/AuthenticationReducer";
// import { BrandReducer } from "./Reducers/Brand";
// import { CategoryReducer } from "./Reducers/Category";
// import { SubCategoryReducer } from "./Reducers/SubCatogory";
// import { AttributeReducer } from "./Reducers/Attribute";
// import { UnitReducer } from "./Reducers/Unit";
// import { RoleReducer } from "./Reducers/Role";
// import { ProductReducer } from "./Reducers/Product";
// import { TaxReducer } from "./Reducers/Tax";
// import { CountriesReducer } from "./Reducers/Countries";
// import { AddressesReducer } from "./Reducers/Addresses";
// import { UsersReducer } from "./Reducers/Users";

// export const Store = configureStore({
//   reducer: {
//     authentication: AuthenticationReducer,
//     brandState: BrandReducer,
//     categoryState: CategoryReducer,
//     subcategoryState: SubCategoryReducer,
//     attributeState: AttributeReducer,
//     unitState: UnitReducer,
//     roleState: RoleReducer,
//     productState: ProductReducer,
//     taxState: TaxReducer,
//     countryState: CountriesReducer,
//     addressesState: AddressesReducer,
//     userState: UsersReducer,
//   },
// });

import { combineReducers, configureStore } from "@reduxjs/toolkit";

// API's
import { auth } from "./API/Auth";
import { brand } from "./API/Brand";
import { category } from "./API/Category";
import { subcategory } from "./API/SubCategory";
import { attribute } from "./API/Attribute";
import { unit } from "./API/Unit";
import { tax } from "./API/Tax";
import { address } from "./API/Address";
import { subcategory_tax } from "./API/SubCategotyTax";

// SLICES
import authSlice from "./Slices/Auth";
import brandSlice from "./Slices/Brand";
import categorySlice from "./Slices/Category";
import subcategorySlice from "./Slices/SubCategory";
import taxSlice from "./Slices/Tax";
import unitSlice from "./Slices/Unit";
import addressSlice from "./Slices/Address";
import attributeSlice from "./Slices/Attribute";
import SubCategoryTaxSlice from "./Slices/SubCategoryTax";

const rootReducer = combineReducers({
  [auth.reducerPath]: auth.reducer,
  [brand.reducerPath]: brand.reducer,
  [tax.reducerPath]: tax.reducer,
  [unit.reducerPath]: unit.reducer,
  [address.reducerPath]: address.reducer,
  [attribute.reducerPath]: attribute.reducer,
  [category.reducerPath]: category.reducer,
  [subcategory.reducerPath]: subcategory.reducer,
  [subcategory_tax.reducerPath]: subcategory_tax.reducer,
  authSlice,
  taxSlice,
  unitSlice,
  categorySlice,
  addressSlice,
  attributeSlice,
  brandSlice,
  subcategorySlice,
  SubCategoryTaxSlice,
});

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      auth.middleware,
      brand.middleware,
      tax.middleware,
      unit.middleware,
      address.middleware,
      attribute.middleware,
      category.middleware,
      subcategory.middleware,
      subcategory_tax.middleware
    ),
});
