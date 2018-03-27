import React from "react";
import { Text, Image, AsyncStorage } from "react-native";
import { Header, Left, Body, Right, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./HeaderComponentStyles";

export const HeaderComponent = ({logo, showAdditionalModal, getBookings}) => {
    handleGetBookings = () => {
        AsyncStorage.getItem('driver', (err, result) => {
            if (result) {
                let driver = JSON.parse(result);
                getBookings(driver.driver_id);
            }
        });
    }

    return (
        <Header style={{backgroundColor: "#E90000"}} iosBarStyle="light-content" androidStatusBarColor="#E90000">
            <Left>
                <Button transparent>
                    <Icon name="bars" style={styles.menu} onPress={() => this.openDrawer()} /> 
                </Button>
            </Left>
            <Body>
                <Text style={styles.headerText}>Hellobox</Text>
                {/* ||
				<Text style={styles.headerText}>Driver on the way</Text> */}
                {/* <Image resizeMode="contain" style={styles.logo} source={logo} /> */}
            </Body>
            <Right>
                <Button transparent>
                    <Icon name="refresh" style={styles.menu} onPress={() => handleGetBookings()} /> 
                </Button>
            </Right>
        </Header>
    );
}

export default HeaderComponent;