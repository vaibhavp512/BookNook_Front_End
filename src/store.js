import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { PlanReducer, SignInReducer } from './Reducers/userReducer';
import { AdminReducer } from './Reducers/adminReducer';
import { CategoryListReducer, SelectCategoryReducer } from './Reducers/categoryReducer';
import { CartReducer } from './Reducers/cartReducer';
import { DeliveryReducer } from './Reducers/deliveryReducer';

const reducers = combineReducers({
    custSignIn : SignInReducer,
    adminSignIn : AdminReducer,
    catList : CategoryListReducer,
    catSelect : SelectCategoryReducer,
    cart : CartReducer,
    plan: PlanReducer,
    delcart : DeliveryReducer
});

let store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;