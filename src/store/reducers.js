import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/Home/modules/home";
import { LoginReducer as login } from "../routes/Login/modules/login"
import { BookingDetailReducer as bookingDetail } from "../routes/BookingDetail/modules/bookingDetail"
import { EarningsReducer as earnings } from "../routes/Earnings/modules/earnings"

export const makeRootReducer = () => {
    return combineReducers({
        home,
        login,
        bookingDetail,
        earnings
    });
}

export default makeRootReducer;