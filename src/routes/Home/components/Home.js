import React from "react";
import { View, Alert, AsyncStorage, StyleSheet, TouchableOpacity, BackHandler, Platform } from "react-native";
import { Container, Content, Card, CardItem, Body, List, Left, Right, Text, Drawer } from "native-base";
import { Actions } from "react-native-router-flux";
import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import BookingRequest from "./BookingRequest";
import SideBar from '../../../components/SideBar';
import Icon from "react-native-vector-icons/FontAwesome";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import OneSignal from 'react-native-onesignal';

var deepEqual = require('fast-deep-equal');
var Spinner = require("react-native-spinkit");

const helloboxLogo = require("../../../assets/images/logo.png");

class Home extends React.Component {
    
    componentDidMount() {
        // Check if driver is already set
        AsyncStorage.getItem('driver', (err, result) => {
            if (result) {
                let driver = JSON.parse(result);
                this.props.getBookings(driver.driver_id);
            }
        });

        // Check location service for Android
        if (Platform.OS === 'android') {
            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "<h2>Use Location?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
                ok: "YES",
                cancel: "NO",
                enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
                showDialog: true, // false => Opens the Location access page directly
                openLocationServices: true // false => Directly catch method is called if location services are turned off
            }).then(function(success) {
                var rx = this;
                setInterval(function(){
                    rx.props.getCurrentLocation();
                }, 2000);
            }.bind(this)
            ).catch((error) => {
                console.log(error.message);
            });
            
            // Handle back press for Android
            BackHandler.addEventListener('hardwareBackPress', () => {
                LocationServicesDialogBox.forceCloseDialog();
            });
        }

        // Initialize One Signal
        OneSignal.configure({});
        OneSignal.enableSound(true);
        OneSignal.enableVibrate(true);
        OneSignal.getPermissionSubscriptionState((status) => {
          this.props.updatePushNotificationID(status.userId);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bookingRequest !== this.props.bookingRequest) {
            if (this.props.bookingRequest.status === "PENDING" || this.props.bookingRequest.status === "CANCELLED") {
                AsyncStorage.getItem('driver', (err, result) => {
                    let driver = JSON.parse(result);
                    if (driver.driver_id === this.props.bookingRequest.driver.driver_id) {          
                        if (this.props.bookingRequest.status === "PENDING") { 
                            this.props.updateBookingModal(true);
                        }

                        if (this.props.bookingRequest.status === "CANCELLED") {
                            this.props.updateBookingModal(false);
                        }
                    }
                });
            }
        } else {
            return false;
        }
    }

    shouldComponentUpdate(nextProps) {
        return !deepEqual(this.props, nextProps);
    }

    render () {
        closeDrawer = () => {
            this.drawer._root.close()
        };
        
        openDrawer = () => {
            this.drawer._root.open()
        }; 

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigator={this.navigator} driver={this.props.driver} homeLogout={this.props.logout}/>}
                onClose={() => closeDrawer()} >
                <Container>
                    { (this.props.showBookingModal === false) &&
                        <View style={{flex:1}}>
                            <HeaderComponent 
                                logo={helloboxLogo}
                                getBookings={this.props.getBookings} />      
                            <Content>
                                <Spinner style={styles.spinner} isVisible={this.props.showBookingLoader} size={40} type="Wave" color="#ffffff"/>
                                { this.props.bookings && 
                                    <List dataArray={this.props.bookings}
                                        renderRow={(booking) =>
                                        <TouchableOpacity
                                            onPress={() => Actions.bookingDetail({booking: booking})}
                                            activeOpacity={1}>
                                            <Card>
                                                <CardItem>
                                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                                        <View style={styles.headerContainer}>
                                                            <Icon style={styles.bookingIcon} name="truck" />
                                                            <View style={styles.jobContainer}>
                                                                <Text style={styles.job}>JOB ID: {booking.booking_id}</Text>
                                                                <Text style={styles.note}>CUSTOMER: {booking.account.first_name.toUpperCase() + " " + booking.account.last_name.toUpperCase()}</Text>
                                                            </View>
                                                            <View style={styles.statusContainer}>
                                                                <Text style={ styles.status }>{booking.status}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.locationContainter}>
                                                            <View style={styles.timeContainer}>
                                                                <Icon style={styles.timeIcon} name="clock-o" />
                                                                <View style={styles.locationValueContainer}>
                                                                    <Text style={styles.locationTime}>{booking.pick_up_date}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.pickUpContainer}>
                                                                <Icon style={styles.fromIcon} name="map-marker" />
                                                                <View style={styles.locationValueContainer}>
                                                                    <Text style={styles.locationPickup}>{booking.pick_up.address}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.ellipsisContainer}>
                                                                <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                                                            </View>
                                                            <View style={styles.dropOffContainer}>
                                                                <Icon style={styles.destinationIcon} name="location-arrow" />
                                                                <View style={styles.locationValueContainer}>
                                                                    <Text style={styles.locationDropOff}>{booking.drop_off.address}</Text>
                                                                </View>
                                                            </View>
                                                            { booking.drop_off1 &&
                                                                <View>
                                                                    <View style={styles.ellipsisContainer}>
                                                                        <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                                                                    </View>
                                                                    <View style={styles.dropOffContainer}>
                                                                        <Icon style={styles.destinationIcon} name="location-arrow" />
                                                                        <View style={styles.locationValueContainer}>
                                                                            <Text style={styles.locationDropOff}>{booking.drop_off1.address}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            }

                                                            { booking.drop_off2 &&
                                                                <View>
                                                                    <View style={styles.ellipsisContainer}>
                                                                        <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                                                                    </View>
                                                                    <View style={styles.dropOffContainer}>
                                                                        <Icon style={styles.destinationIcon} name="location-arrow" />
                                                                        <View style={styles.locationValueContainer}>
                                                                            <Text style={styles.locationDropOff}>{booking.drop_off2.address}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            }

                                                            { booking.drop_off3 &&
                                                                <View>
                                                                    <View style={styles.ellipsisContainer}>
                                                                        <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                                                                    </View>
                                                                    <View style={styles.dropOffContainer}>
                                                                        <Icon style={styles.destinationIcon} name="location-arrow" />
                                                                        <View style={styles.locationValueContainer}>
                                                                            <Text style={styles.locationDropOff}>{booking.drop_off3.address}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            }

                                                            { booking.drop_off4 &&
                                                                <View>
                                                                    <View style={styles.ellipsisContainer}>
                                                                        <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                                                                    </View>
                                                                    <View style={styles.dropOffContainer}>
                                                                        <Icon style={styles.destinationIcon} name="location-arrow" />
                                                                        <View style={styles.locationValueContainer}>
                                                                            <Text style={styles.locationDropOff}>{booking.drop_off4.address}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            }
                                                        </View>
                                                    </View>
                                                </CardItem>
                                            </Card>
                                        </TouchableOpacity>
                                        }>
                                    </List>
                                }
                            </Content>
                            <FooterComponent 
                                updateDriverStatus={this.props.updateDriverStatus}
                                driverStatus={this.props.driverStatus}/>   
                        </View>

                        ||

                        <BookingRequest 
                            bookingRequest={this.props.bookingRequest}
                            updateBookingStatus={this.props.updateBookingStatus}/>
                    }
                </Container>
            </Drawer>
        )
    }
}

const styles = StyleSheet.create({
    headerColor: {
        backgroundColor: "#E90000"
	},
	headerContainer: {
		flex: 1,
		flexDirection: 'row'
	},
    job: {
        fontWeight: "bold",
        fontSize: 14
	},
	title: {
		color: "#FFFFFF",
	},
	menu: {
		color: "#fff",
		fontSize: 20
    },
    pickUp: {
		fontSize: 13
    },
    dropOff: {
		fontSize: 13
	},
	status: {
		fontSize: 12,
		textAlign: 'right',
        color: "#1589FF",
        fontWeight: 'bold'
    },
    bookingIcon:{
        fontSize:20,
        color:"#E90000",
	},
	fromIcon:{
        fontSize:20,
        color:"#E90000",
	},
	destinationIcon:{
        fontSize:20,
        color:"#999999",
	},
	ellipsisIcon: {
        fontSize:10,
        color:"#3498DB",
    },
	note: {
		marginTop: 5,
		fontSize:  13,
		color: "#999999"
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
	jobContainer: {
        flex: 1,
        paddingLeft: 10
	},
	statusContainer: {
		flex: 1
	},
	timeIcon:{
        fontSize:20,
        color:"#00FF00",
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
	spinnerContainer: {
		position: 'absolute',
        width: 100,
        height: 100,
        top: 200,
        alignSelf: "center"
	},
	spinner: {
        color: "#E90000",
        marginTop: 15,
        alignSelf: "center"
    },
  });

export default Home;