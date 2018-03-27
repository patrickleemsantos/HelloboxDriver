import React from "react";
import { Text, Alert } from "react-native";
import { Footer, FooterTab, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./FooterComponentStyles";

export const FooterComponent = ({updateDriverStatus, driverStatus}) => {
    return (
        <Footer>
            <FooterTab style={styles.footerContainer} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                <Button success disabled={driverStatus === "online" ? true : false} style={styles.button} onPress={() => updateDriverStatus("online")}>
                    <Text style={styles.subText}>ONLINE</Text>
                </Button>
                <Button danger disabled={driverStatus === "offline" ? true : false} style={styles.button} onPress={() => updateDriverStatus("offline")}>
                    <Text style={styles.subText}>OFFLINE</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
}

export default FooterComponent;