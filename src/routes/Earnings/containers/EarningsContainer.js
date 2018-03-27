import { connect } from "react-redux";
import Earnings from "../components/Earnings";
import {
    driverEarnings,
    setSelectedEarnings,
    getEarnings
} from "../modules/earnings";

const mapStateToProps = (state) => ({   
    driverEarnings: state.earnings.driverEarnings || {},
    selectedEarnings: state.earnings.selectedEarnings || "day",
    showEarningsLoader: state.earnings.showEarningsLoader || false
});

const mapActionCreators = {
    setSelectedEarnings,
    getEarnings
};

export default connect(mapStateToProps, mapActionCreators)(Earnings);