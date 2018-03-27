import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import LoginContainer from "./Login/containers/LoginContainer";
import HomeContainer from "./Home/containers/HomeContainer";
import BookingDetailContainer from "./BookingDetail/containers/BookingDetailContainer";
import EarningsContainer from "./Earnings/containers/EarningsContainer";

const scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene key="login" panHandlers={null} component={LoginContainer} title="login" initial />
        <Scene duration={0} key="home" panHandlers={null} component={HomeContainer} title="home" />
        <Scene key="bookingDetail" panHandlers={null} component={BookingDetailContainer} title="bookingDetail" />
        <Scene key="earnings" panHandlers={null} component={EarningsContainer} title="earnings" />
    </Scene>
);

export default scenes;