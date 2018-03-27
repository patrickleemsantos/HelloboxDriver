import React from "react";
import { View, Text } from "react-native";
import { List, Container, Header, Left, Body, Right, Button, Title, Content, Card, CardItem, Form, Item, Label, Footer, FooterTab } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./BookingRequestStyles";
import { Actions } from "react-native-router-flux";
import CountdownCircle from 'react-native-countdown-circle';

export const BookingRequest = ({ bookingRequest, updateBookingStatus }) => {    
    return (
        <Container>
            <Header style={styles.headerColor} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                <Left>
                </Left>
                <Body>
                    <Title style={styles.job}>JOB ID: {bookingRequest.booking_id}</Title>
                </Body>
                <Right>
                </Right>
            </Header> 
            <Content>
                <View style={styles.countDownContainer}>
                    <CountdownCircle
                        seconds={10}
                        radius={40}
                        borderWidth={8}
                        color="#ff003f"
                        bgColor="#fff"
                        textStyle={{ fontSize: 20 }}
                        onTimeElapsed={() => updateBookingStatus("REJECTED")}
                    />
                </View>
                <View style={styles.driverContainer}>
                    {/* <Thumbnail source={{uri: bookingRequest.driver.profile_picture}} /> */}
                    <View style={styles.driverDetailsContainer}>
                        <Text style={styles.driverName}>{"Customer: " + bookingRequest.account.first_name + " " + bookingRequest.account.last_name}</Text>
                        {/* <Text style={styles.driverVehicle}>{bookingRequest.driver.vehicle.body_type + " " + bookingRequest.driver.vehicle.model + " " + bookingRequest.driver.vehicle.plate_number}</Text> */}
                    </View>
                </View>
                <View style={styles.statusContainter}>
                    <Text style={styles.statusValue}>Status: {bookingRequest.status}</Text>
                </View>
                <View style={styles.priceContainter}>
                    <Text style={styles.priceValue}>Fare: P {bookingRequest.fare}</Text>
                </View>
                <View style={styles.additionalPriceContainter}>
                    <Text style={styles.additionalPriceValue}>Additional Price: P {bookingRequest.additional_price}</Text>
                </View>
                <View style={styles.locationContainter}>
                    <View style={styles.timeContainer}>
                        <Icon style={styles.timeIcon} name="clock-o" />
                        <View style={styles.locationValueContainer}>
                            <Text style={styles.locationTime}>{bookingRequest.pick_up_date}</Text>
                        </View>
                    </View>
                    <View style={styles.pickUpContainer}>
                        <Icon style={styles.fromIcon} name="map-marker" />
                        <View style={styles.locationValueContainer}>
                            <Text style={styles.locationPickup}>{bookingRequest.pick_up.address}</Text>
                        </View>
                    </View>
                    <View style={styles.ellipsisContainer}>
                        <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                    </View>
                    <View style={styles.dropOffContainer}>
                        <Icon style={styles.destinationIcon} name="location-arrow" />
                        <View style={styles.locationValueContainer}>
                            <Text style={styles.locationDropOff}>{bookingRequest.drop_off.address}</Text>
                        </View>
                    </View>
                    
                    { bookingRequest.drop_off1 &&
                        <View>
                            <View style={styles.ellipsisContainer}>
                                <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                            </View>
                            <View style={styles.dropOffContainer}>
                                <Icon style={styles.destinationIcon} name="location-arrow" />
                                <View style={styles.locationValueContainer}>
                                    <Text style={styles.locationDropOff}>{bookingRequest.drop_off1.address}</Text>
                                </View>
                            </View>
                        </View>
                    }

                    { bookingRequest.drop_off2 &&
                        <View>
                            <View style={styles.ellipsisContainer}>
                                <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                            </View>
                            <View style={styles.dropOffContainer}>
                                <Icon style={styles.destinationIcon} name="location-arrow" />
                                <View style={styles.locationValueContainer}>
                                    <Text style={styles.locationDropOff}>{bookingRequest.drop_off2.address}</Text>
                                </View>
                            </View>
                        </View>
                    }

                    { bookingRequest.drop_off3 &&
                        <View>
                            <View style={styles.ellipsisContainer}>
                                <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                            </View>
                            <View style={styles.dropOffContainer}>
                                <Icon style={styles.destinationIcon} name="location-arrow" />
                                <View style={styles.locationValueContainer}>
                                    <Text style={styles.locationDropOff}>{bookingRequest.drop_off3.address}</Text>
                                </View>
                            </View>
                        </View>
                    }

                    { bookingRequest.drop_off4 &&
                        <View>
                            <View style={styles.ellipsisContainer}>
                                <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                            </View>
                            <View style={styles.dropOffContainer}>
                                <Icon style={styles.destinationIcon} name="location-arrow" />
                                <View style={styles.locationValueContainer}>
                                    <Text style={styles.locationDropOff}>{bookingRequest.drop_off4.address}</Text>
                                </View>
                            </View>
                        </View>
                    }
                </View>

                { bookingRequest.additional_services && 
                    <View style={styles.additionalContainer}>
                        <Text style={styles.additionalHeader}>Additional:</Text>
                        <List dataArray={bookingRequest.additional_services.value}
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

                { (bookingRequest.note || bookingRequest.note !== "") && 
                    <View style={styles.noteContainer}>
                        <Text style={styles.additionalHeader}>Note:</Text>
                        <View style={styles.additionalListContainer}>
                            <Icon style={styles.additionalIcon} name="sticky-note" />
                            <View style={styles.additionalValueContainer}>
                                <Text style={styles.additionalText}>{bookingRequest.note}</Text>
                            </View>
                        </View>
                    </View>
                }
            </Content>
            <Footer>
                <FooterTab style={styles.footerContainer}>
                    <Button success style={styles.button} onPress={() => updateBookingStatus("APPROVED")}>
                        <Text style={styles.subText}>APPROVE</Text>
                    </Button>
                    <Button danger style={styles.button} onPress={() => updateBookingStatus("REJECTED")}>
                        <Text style={styles.subText}>REJECT</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}

export default BookingRequest;