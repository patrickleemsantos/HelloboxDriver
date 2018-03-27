import { connect } from "react-redux";
import Home from "../components/Home";
import {
    getCurrentLocation,
    getBookings,
    updateDriverStatus,
    updateBookingModal,
    updateBookingStatus,
    updatePushNotificationID,
    logout
} from "../modules/home";

const mapStateToProps = (state) => ({   
    region: state.home.region,
    driver: state.login.driver || {},
    bookings: state.home.bookings || [],
    driverStatus: state.home.driverStatus || "offline",
    bookingRequest: state.home.bookingRequest || {},
    showBookingModal: state.home.showBookingModal || false,
    showBookingLoader: state.home.showBookingLoader || false,
    isTimerLoading: state.home.isTimerLoading || false
});

const mapActionCreators = {
    getCurrentLocation,
    getBookings,
    updateDriverStatus,
    updateBookingModal,
    updateBookingStatus,
    updatePushNotificationID,
    logout
};

export default connect(mapStateToProps, mapActionCreators)(Home);