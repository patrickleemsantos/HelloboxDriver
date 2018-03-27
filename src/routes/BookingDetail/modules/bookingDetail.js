import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions, NetInfo } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import request from "../../../util/request";

//------------------------
//Constants
//------------------------
const { 
		SET_CURRENT_BOOKING,
		UPDATE_BOOKING,
		UPDATE_LOADER,
		SET_NEXT_BOOKING_STATUS
	} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//------------------------
//Actions
//------------------------
export function setCurrentBooking(payload) {
	return {
		type: SET_CURRENT_BOOKING,
		payload
	}
}

export function setNextBookingStatus(payload) {
	return(dispatch) => {
		dispatch({
			type: SET_NEXT_BOOKING_STATUS,
			payload: payload
		})
	}
}

export function updateBookingStatus(payload) {
	return(dispatch, store) => {
		dispatch({
			type: UPDATE_LOADER,
			payload: true
		});

		NetInfo.isConnected.fetch().then(isConnected => {
			if(isConnected) {
				request.put("http://52.220.212.6:3121/api/updateBookingStatus")
				.send({
					id: store().bookingDetail.currentBooking._id,
					status: payload
				})
				.finish((error, res)=> {
					dispatch({
						type: UPDATE_BOOKING,
						payload: res.body
					});
					
					dispatch({
						type: SET_NEXT_BOOKING_STATUS,
						payload: res.body.status
					});
				});
			} else {
				Alert.alert('Error', "Please connect to the internet");
			}

			dispatch({
				type: UPDATE_LOADER,
				payload: false
			});
		});
	}
}

export function updateDriverLocation(payload) {
	return(dispatch, store) => {
		NetInfo.isConnected.fetch().then(isConnected => {
			if(isConnected) {
				request.put("http://52.220.212.6:3121/api/updateDriverLocation")
				.send({
					id: store().bookingDetail.currentBooking._id,
					status: payload
				})
				.finish((error, res)=> {
				});
			} else {
				Alert.alert('Error', "Please connect to the internet");
			}
		});
	}
}

//------------------------
//Action Handlers
//------------------------
function handleSetCurrentBooking(state, action) {
	return update(state, {
		currentBooking: {
			$set: action.payload
		}
	})
}

function handleUpdateBooking(state, action) {
	return update(state, {
		currentBooking: {
			$set: action.payload
		}
	})
}

function handleUpdateLoader(state, action) {
	return update(state, {
		showLoader: {
			$set: action.payload
		}
	})
}

function handleSetNextBookingStatus(state, action) {
	if (action.payload == "PENDING") {
		return update(state, {
			nextBookingStatus: {
				$set: "APPROVED"
			}
		})
	} else if (action.payload == "APPROVED") {
		return update(state, {
			nextBookingStatus: {
				$set: "ON MY WAY"
			}
		})
	} else if (action.payload == "ON MY WAY") {
		return update(state, {
			nextBookingStatus: {
				$set: "LOADED AND DELIVERY STARTED"
			}
		})
	} else if (action.payload == "LOADED AND DELIVERY STARTED") {
		return update(state, {
			nextBookingStatus: {
				$set: "ARRIVED AT DELIVERY LOCATION"
			}
		})
	} else if (action.payload == "ARRIVED AT DELIVERY LOCATION") {
		return update(state, {
			nextBookingStatus: {
				$set: "JOB COMPLETED"
			}
		})
	} else {
		return update(state, {
			nextBookingStatus: {
				$set: ""
			}
		})
	}
}

const ACTION_HANDLERS = {
	SET_CURRENT_BOOKING: handleSetCurrentBooking,
	UPDATE_BOOKING: handleUpdateBooking,
	UPDATE_LOADER: handleUpdateLoader,
	SET_NEXT_BOOKING_STATUS: handleSetNextBookingStatus
}

const initialState = {
	currentBooking: {},
	showLoader: false
};

export function BookingDetailReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
