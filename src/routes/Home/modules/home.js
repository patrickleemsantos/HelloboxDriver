import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions, Alert, AsyncStorage, NetInfo, Platform } from "react-native";
import RNGooglePlaces from "react-native-google-places";
// import Polyline from '@mapbox/polyline';
import request from "../../../util/request";

//------------------------
//Constants
//------------------------
const { GET_CURRENT_LOCATION,
		SAVE_DRIVER_PROFILE, 
		UPDATE_DRIVER_STATUS,
		BOOKING_APPROVED,
		BOOKING_REJECTED,
		SHOW_BOOKING_MODAL,
		GET_BOOKINGS,
		UPDATE_BOOKING_LOADER,
		LOGOUT
	} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//------------------------
//Actions
//------------------------
export function updatePushNotificationID(payload) {
	return(dispatch, store) => {
		if (Platform.OS === 'ios') {
			request.put("http://52.220.212.6:3121/api/updateDriverPushNotificationID")
			.send({
				driver_id: store().login.driver.driver_id,
				notification_id: payload
			})
			.finish((error, res)=>{
				// console.log(res);
			});
		} else {
			NetInfo.isConnected.fetch().then(isConnected => {
				if(isConnected) {
					request.put("http://52.220.212.6:3121/api/updateDriverPushNotificationID")
					.send({
						driver_id: store().login.driver.driver_id,
						notification_id: payload
					})
					.finish((error, res)=>{
						// console.log(res);
					});
				} else {
					Alert.alert('Unable to update notification ID', "Please connect to the internet");
				}
			});
		}
	}
}

export function getCurrentLocation(){
	return(dispatch, store) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				dispatch({
					type: GET_CURRENT_LOCATION,
					payload: position
				});

				NetInfo.isConnected.fetch().then(isConnected => {
					if(isConnected) {
						request.put("http://52.220.212.6:3121/api/updateDriverLocation")
						.send({
							driver_id: store().login.driver.driver_id,
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
						})
						.finish((error, res)=>{
							// console.log(res);
						});
					} else {
						Alert.alert('Error', "Please connect to the internet");
					}
				});
			},
			(error) => console.log(error.message),
			{enableHighAccuracy: false, timeout: 20000, maximumAge:1000}
		);
	}
}

export function getBookings(payload) {
	return(dispatch, store)=>{
		dispatch({
			type:UPDATE_BOOKING_LOADER,
			payload:true
		});

		NetInfo.isConnected.fetch().then(isConnected => {
			if(isConnected) {
				request.get("http://52.220.212.6:3121/api/bookingsByDriver")
				.query({
					driver_id: payload,
				})
				.finish((error, res)=>{
					dispatch({
						type:UPDATE_BOOKING_LOADER,
						payload:false
					});
					
					if(res){
						dispatch({
							type:GET_BOOKINGS,
							payload:res.body
						});
					}
				});
			} else {
				Alert.alert('Error', "Please connect to the internet");
			}
		});
	};
}

export function updateBookingModal(payload) {
	return(dispatch) => {
		dispatch({
			type: SHOW_BOOKING_MODAL,
			payload
		});
	}
}

export function updateBookingStatus(payload) {
	return(dispatch, store) => {
		NetInfo.isConnected.fetch().then(isConnected => {
			if(isConnected) {
				request.put("http://52.220.212.6:3121/api/updateBookingStatus")
				.send({
					id: store().home.bookingRequest._id,
					status: payload
				})
				.finish((error, res)=> {
					

					if (payload === "APPROVED") {
						dispatch({
							type: BOOKING_APPROVED,
							payload: res.body
						})
					} else {
						dispatch({
							type: BOOKING_REJECTED,
							payload: res.body
						})
					}

					dispatch({
						type: SHOW_BOOKING_MODAL,
						payload: false
					})
				});
			} else {
				Alert.alert('Error', "Please connect to the internet");
			}
		});
	}
}

export function updateDriverStatus(payload) {
	return(dispatch, store) => {
		dispatch({
			type:UPDATE_BOOKING_LOADER,
			payload:true
		});

		NetInfo.isConnected.fetch().then(isConnected => {
			if(isConnected) {
				request.put("http://52.220.212.6:3121/api/updateDriverStatus")
				.send({
					driver_id: store().login.driver.driver_id,
					status: payload
				})
				.finish((error, res)=>{
					dispatch({
						type: UPDATE_DRIVER_STATUS,
						payload
					})
				});
			} else {
				Alert.alert('Error', "Please connect to the internet");
			}

			dispatch({
				type:UPDATE_BOOKING_LOADER,
				payload:false
			});
		});
	}
}

export function logout(payload) {
	return {
		type: LOGOUT,
		payload
	}
}

//------------------------
//Action Handlers
//------------------------
function handleGetCurrentLocation(state, action){
	return update(state, {
		region:{
			latitude:{
				$set: action.payload.coords.latitude
			},
			longitude:{
				$set: action.payload.coords.longitude
			},
			latitudeDelta:{
				$set: LATITUDE_DELTA
			},
			longitudeDelta:{
				$set: LONGITUDE_DELTA
			}
		}
	})
}

function handleGetBookings(state, action) {
	return update(state, {
		bookings: {
			$set: action.payload
		}
	})
}

function handleSaveDriverProfile(state, action) {
	return update(state, {
		driver: {
			$set: action.payload
		}
	})
} 

function handleDriverStatus(state, action) {	
	return update(state, {
		driverStatus: {
			$set: action.payload
		}
	})
}

function handleShowBookingModal(state, action) {
	return update(state, {
		showBookingModal:{
			$set:action.payload
		}
	});
}

function handleBookingLoader(state, action) {
	return update(state, {
		showBookingLoader:{
			$set:action.payload
		}
	});
}

function handleBookingReceived(state, action) {
	return update(state, {
		bookingRequest:{
			$set:action.payload
		}
	});
}

function handleBookingApproved(state, action) {
	return update(state, {
		bookingRequest:{
			$set:action.payload
		}
	});
}

function handleBookingRejected(state, action) {
	return update(state, {
		bookingRequest:{
			$set:action.payload
		}
	});
}

function handleBookingCancelled(state, action) {
	return update(state, {
		bookingRequest:{
			$set:action.payload
		}
	});
}

function handleLogOut(state, action) {
	return update(state, {
		$set: initialState
	});
}

const ACTION_HANDLERS = {
	LOGOUT: handleLogOut,
	GET_CURRENT_LOCATION: handleGetCurrentLocation,
	GET_BOOKINGS: handleGetBookings,
	UPDATE_DRIVER_STATUS: handleDriverStatus,
	SHOW_BOOKING_MODAL: handleShowBookingModal,
	UPDATE_BOOKING_LOADER: handleBookingLoader,
	BOOKING_CANCELLED: handleBookingCancelled, // Handle when user cancelled a booking
	BOOKING_RECEIVED: handleBookingReceived, // Handle when driver receives a customer's booking
	BOOKING_APPROVED: handleBookingApproved, // Handle when driver approved a customer's booking
	BOOKING_REJECTED: handleBookingRejected // Handle when driver rejected a customer's booking,
}

const initialState = {
	region: {},
	bookings: [],
	showBookingModal: false,
	showBookingLoader: false,
	driverStatus: "offline"
};

export function HomeReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
