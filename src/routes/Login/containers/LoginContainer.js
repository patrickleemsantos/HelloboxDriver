import { connect } from "react-redux";
import Login from "../components/Login";
import {
    getUsername,
    getPassword,
    setDriver,
    login
} from "../modules/login";

const mapStateToProps = (state) => ({   
    username: state.login.username || "",
    password: state.login.password || "",
    loginResult: state.login.loginResult || {},
    driver: state.login.driver || {},
    isLoading: state.login.isLoading || false
});

const mapActionCreators = {
    getUsername,
    getPassword,
    setDriver,
    login
};

export default connect(mapStateToProps, mapActionCreators)(Login);