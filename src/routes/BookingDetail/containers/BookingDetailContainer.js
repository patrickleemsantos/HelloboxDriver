import { connect } from "react-redux";
import BookingDetail from "../components/BookingDetail";
import {
    setCurrentBooking,
    updateBookingStatus,
    setNextBookingStatus
} from "../modules/bookingDetail";

const mapStateToProps = (state) => ({   
    currentBooking: state.bookingDetail.currentBooking || {},
    showLoader: state.bookingDetail.showLoader || false,
    nextBookingStatus: state.bookingDetail.nextBookingStatus
});

const mapActionCreators = {
    setCurrentBooking,
    updateBookingStatus,
    setNextBookingStatus
};

export default connect(mapStateToProps, mapActionCreators)(BookingDetail);