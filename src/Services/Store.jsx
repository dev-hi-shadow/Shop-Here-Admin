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

import { auth } from "./API/Auth";
import { category } from "./API/Category";
import authSlice from "./Slices/Auth";
import categorySlice from "./Slices/Category";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [auth.reducerPath]: auth.reducer,
  [category.reducerPath]: category.reducer,
  authSlice,
  categorySlice,
});

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(category.middleware, auth.middleware),
});
