import React from "react";
import { Text, Image, View, Alert, AsyncStorage } from "react-native";
import { Container, Button, Content, List, ListItem, Left, Body, Right } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./SideBarStyles";

export const SideBar = ({ driver, homeLogout }) => {

    bookings = () => {
        Actions.bookings();
    }

    earnings = () => {
        Actions.earnings();
    }

    logout = () => {
        AsyncStorage.removeItem('driver');
        homeLogout();
        Actions.login({type: "reset"});
    };    
    
    return (
        <Container>
            <Content style={styles.sideBarContent}>
                <View style={styles.profileContainer}>
                     <Image
                        circle
                        style={styles.profileImage}
                        source={{ uri: driver.profile_picture }}
                        />
                    <Text style={styles.profileName}>{driver.first_name + " " + driver.last_name}</Text>
                </View>
                <List>
                    <ListItem icon onPress={() => this.earnings()}>
                        <Left>
                            <Icon name="money" size={15} />
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Earnings</Text>
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                    <ListItem icon onPress={() => this.logout()}>
                        <Left>
                            <Icon name="sign-out" size={15} />
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Logout</Text>
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                </List>
            </Content>
        </Container>
    );
}

export default SideBar;