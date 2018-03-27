import React from "react";
import { View, Alert, AsyncStorage, StyleSheet, BackHandler } from "react-native";
import { Thumbnail, Container, Content, Card, CardItem, Body, List, Left, Right, Text, Header, Button, Title, Footer, FooterTab } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import Communications from 'react-native-communications';

var deepEqual = require('fast-deep-equal');
var Spinner = require("react-native-spinkit");

class BookingDetail extends React.Component {
    
    componentDidMount() {
        AsyncStorage.getItem('driver', (err, result) => {
            let driver = JSON.parse(result);           
        });

        this.props.setCurrentBooking(this.props.booking);
        this.props.setNextBookingStatus(this.props.booking.status);

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    shouldComponentUpdate(nextProps) {
        return !deepEqual(this.props, nextProps);
    }

    handleBackButton() {
        Actions.pop();
        return true;
    }

    render () {
        updateBookingStatus = () => {
            if (this.props.currentBooking.status === "PENDING") {
                this.props.updateBookingStatus("APPROVED");
            }
            
            if (this.props.currentBooking.status === "APPROVED") {
                this.props.updateBookingStatus("ON MY WAY");
            }

            if (this.props.currentBooking.status === "ON MY WAY") {
                this.props.updateBookingStatus("LOADED AND DELIVERY STARTED");
            }

            if (this.props.currentBooking.status === "LOADED AND DELIVERY STARTED") {
                this.props.updateBookingStatus("ARRIVED AT DELIVERY LOCATION");
            }

            if (this.props.currentBooking.status === "ARRIVED AT DELIVERY LOCATION") {
                this.props.updateBookingStatus("JOB COMPLETED");
            }
        }

        return (
            <Container>
                 <Header style={styles.headerColor} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                    <Left>
                        <Button transparent onPress={() => Actions.home({ reset: true })}>
                            <Icon name="arrow-left" style={styles.menu} /> 
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.job}>JOB ID: {this.props.booking.booking_id}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => Communications.phonecall(this.props.booking.account.mobile_number, true)} >
                            <Icon name="phone" size={40} style={styles.menu} />
                        </Button>
                    </Right>
                </Header> 
                <Content>
                    <View style={styles.driverContainer}>
                        {/* <Thumbnail source={{uri: this.props.booking.driver.profile_picture}} /> */}
                        <View style={styles.driverDetailsContainer}>
                            <Text style={styles.driverName}>{"Customer: " + this.props.booking.account.first_name + " " + this.props.booking.account.last_name}</Text>
                            {/* <Text style={styles.driverVehicle}>{this.props.booking.driver.vehicle.body_type + " " + this.props.booking.driver.vehicle.model + " " + this.props.booking.driver.vehicle.plate_number}</Text> */}
                        </View>
                    </View>
                    <View style={styles.statusContainter}>
                        <Text style={styles.statusValue}>Status: {this.props.currentBooking.status}</Text>
                    </View>
                    <View style={styles.priceContainter}>
                        <Text style={styles.priceValue}>Fare: P {this.props.booking.fare}</Text>
                    </View>
                    <View style={styles.additionalPriceContainter}>
                        <Text style={styles.additionalPriceValue}>Additional Price: P {this.props.booking.additional_price}</Text>
                    </View>
                    <View style={styles.locationContainter}>
                        <View style={styles.timeContainer}>
                            <Icon style={styles.timeIcon} name="clock-o" />
                            <View style={styles.locationValueContainer}>
                                <Text style={styles.locationTime}>{this.props.booking.pick_up_date}</Text>
                            </View>
                        </View>
                        <View style={styles.pickUpContainer}>
                            <Icon style={styles.fromIcon} name="map-marker" />
                            <View style={styles.locationValueContainer}>
                                <Text style={styles.locationPickup}>{this.props.booking.pick_up.address}</Text>
                            </View>
                        </View>
                        <View style={styles.ellipsisContainer}>
                            <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                        </View>
                        <View style={styles.dropOffContainer}>
                            <Icon style={styles.destinationIcon} name="location-arrow" />
                            <View style={styles.locationValueContainer}>
                                <Text style={styles.locationDropOff}>{this.props.booking.drop_off.address}</Text>
                            </View>
                        </View>

                        { this.props.booking.drop_off1 &&
                            <View>
                                <View style={styles.ellipsisContainer}>
                                    <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                                </View>
                                <View style={styles.dropOffContainer}>
                                    <Icon style={styles.destinationIcon} name="location-arrow" />
                                    <View style={styles.locationValueContainer}>
                                        <Text style={styles.locationDropOff}>{this.props.booking.drop_off1.address}</Text>
                                    </View>
                                </View>
                            </View>
                        }

                        { this.props.booking.drop_off2 &&
                            <View>
                                <View style={styles.ellipsisContainer}>
                                    <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                                </View>
                                <View style={styles.dropOffContainer}>
                                    <Icon style={styles.destinationIcon} name="location-arrow" />
                                    <View style={styles.locationValueContainer}>
                                        <Text style={styles.locationDropOff}>{this.props.booking.drop_off2.address}</Text>
                                    </View>
                                </View>
                            </View>
                        }

                        { this.props.booking.drop_off3 &&
                            <View>
                                <View style={styles.ellipsisContainer}>
                                    <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                                </View>
                                <View style={styles.dropOffContainer}>
                                    <Icon style={styles.destinationIcon} name="location-arrow" />
                                    <View style={styles.locationValueContainer}>
                                        <Text style={styles.locationDropOff}>{this.props.booking.drop_off3.address}</Text>
                                    </View>
                                </View>
                            </View>
                        }

                        { this.props.booking.drop_off4 &&
                            <View>
                                <View style={styles.ellipsisContainer}>
                                    <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                                </View>
                                <View style={styles.dropOffContainer}>
                                    <Icon style={styles.destinationIcon} name="location-arrow" />
                                    <View style={styles.locationValueContainer}>
                                        <Text style={styles.locationDropOff}>{this.props.booking.drop_off4.address}</Text>
                                    </View>
                                </View>
                            </View>
                        }

                    </View>

                    { this.props.booking.additional_services && 
                        <View style={styles.additionalContainer}>
                            <Text style={styles.additionalHeader}>Additional:</Text>
                            <List dataArray={this.props.booking.additional_services.value}
                                renderRow={(item) =>
                                <View style={styles.additionalListContainer}>
                                    <Icon style={styles.additionalIcon} name="plus" />
                                    <View style={styles.additionalValueContainer}>
                                        <Text style={styles.additionalText}>{item}</Text>
                                    </View>
                                </View>
                                }>
                            </List>
                        </View>
                    }

                    { (this.props.booking.note || this.props.booking.note !== "") && 
                        <View style={styles.noteContainer}>
                            <Text style={styles.additionalHeader}>Note:</Text>
                            <View style={styles.additionalListContainer}>
                                <Icon style={styles.additionalIcon} name="sticky-note" />
                                <View style={styles.additionalValueContainer}>
                                    <Text style={styles.additionalText}>{this.props.booking.note}</Text>
                                </View>
                            </View>
                        </View>
                    }

                    { this.props.bookingHistory && 
                        <View style={styles.historyContainer}>
                            <Text style={styles.historyHeader}>History:</Text>
                            <List dataArray={this.props.bookingHistory}
                                renderRow={(item) =>
                                <View style={styles.historyListContainer}>
                                    <Icon style={styles.historyIcon} name="history" />
                                    <View style={styles.historyValueContainer}>
                                        <Text style={styles.historyText}>{item.status}</Text>
                                    </View>
                                    <View style={styles.historyTimeContainer}>
                                        <Text style={styles.historyTimeText}>{item.timestamp}</Text>
                                    </View>
                                </View>
                                }>
                            </List>
                        </View>
                    }
                </Content>
                { (this.props.currentBooking.status !== "JOB COMPLETED") && 
                    <Footer>
                        <FooterTab style={styles.footerContainer}>
                            <Button success style={styles.button} onPress={() => updateBookingStatus()} >
                                <Text style={styles.subText}>{this.props.nextBookingStatus}</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                }
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    headerColor: {
        backgroundColor: "#E90000"
    },
    job: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#FFFFFF"
    },
    menu: {
		color: "#fff",
		fontSize: 20
    },
    footerContainer:{
		backgroundColor:"#fff",
    },
    button: {
		margin: 5,
		height: 40
	},
	subText:{
		fontSize:14,
		fontWeight: "bold",
		color: "#FFFF"
    },
    spinner: {
        color: "#E90000",
        alignSelf: "center"
    },
    floatView: {
        position: 'absolute',
        width: 100,
        height: 100,
        top: 200,
        alignSelf: "center"
    },
    driverContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10
    },
    driverDetailsContainer: {
        flex: 1
    },
    driverName: {
        fontSize: 14,
        fontWeight: "bold"
    },
    driverVehicle: {
        fontSize: 12,
    },
    statusContainter: {
        flex: 1,
        backgroundColor: "#F4F6F6",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    statusValue: {
        fontSize: 12,
        fontWeight: "bold"
    },
    priceContainter: {
        flex: 1,
        backgroundColor: "#CCD1D1",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    priceValue: {
        fontSize: 12,
        fontWeight: "bold"
    },
    additionalPriceContainter: {
        flex: 1,
        backgroundColor: "#E5E8E8",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    additionalPriceValue: {
        fontSize: 12,
        fontWeight: "bold"
    },
    locationContainter: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    locationTime: {
        fontSize: 13,
    },
    locationPickup: {
        fontSize: 13,
    },
    locationDropOff: {
        fontSize: 13,
    },
    locationValueContainer: {
        flex: 1,
        paddingLeft: 10
    },
    additionalValueContainer: {
        flex: 1,
        paddingLeft: 10
    },
    pickUpContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 2
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 11
    },
    ellipsisContainer: {
        flex: 1,
        paddingLeft: 5
    },
    dropOffContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    timeIcon:{
        fontSize:20,
        color:"#00FF00",
	},
    fromIcon:{
        fontSize:20,
        color:"#E90000",
	},
	destinationIcon:{
        fontSize:20,
        color:"#999999",
    },
    additionalIcon:{
        fontSize:15,
        color:"#E90000",
	},
    ellipsisIcon: {
        fontSize:10,
        color:"#3498DB",
    },
    historyIcon:{
        fontSize:20,
        color:"#E90000",
	},
    additionalContainer: {
        flex: 1,
        backgroundColor: "#FBFCFC",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    noteContainer: {
        flex: 1,
        backgroundColor: "#F4F6F6",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    additionalText: {
        flex: 1,
        fontSize: 13,
    },
    additionalHeader: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 10
    },
    additionalListContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 11
    },
    historyContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    historyText: {
        flex: 1,
        fontSize: 13,
    },
    historyTimeText: {
        flex: 1,
        fontSize: 10,
        textAlign: 'right'
    },
    historyHeader: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 15
    },
    historyListContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 11
    },
    historyValueContainer: {
        flex: 1,
        paddingLeft: 10
    },
    historyTimeContainer: {
        flex: 1,
        paddingRight: 10
    },
  });

export default BookingDetail;