import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions, Alert, AsyncStorage, NetInfo } from "react-native";
import RNGooglePlaces from "react-native-google-places";
// import Polyline from '@mapbox/polyline';
import request from "../../../util/request";

//------------------------
//Constants
//------------------------
const { GET_USERNAME,
        GET_PASSWORD,
        GET_LOGIN_STATUS,
        LOGIN,
        UPDATE_LOADING_STATUS,
        SET_DRIVER
	} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//------------------------
//Actions
//------------------------
//Get username
export function getUsername(payload) {
	return{
		type: GET_USERNAME,
		payload
	}
}

//Get password
export function getPassword(payload) {
	return{
		type: GET_PASSWORD,
		payload
	}
}

export function setDriver(payload) {
    return{
		type: SET_DRIVER,
		payload
	}
}

export function login() {
    return(dispatch, store)=>{

        if (store().login.username != "" && store().login.password != "") {
            const payload = {
                username: store().login.username,
                password: store().login.password
            }

            dispatch({
                type: UPDATE_LOADING_STATUS,
                payload: true
            });

            NetInfo.isConnected.fetch().then(isConnected => {
                if(isConnected) {
                    request.get("http://52.220.212.6:3121/api/driverLogin")
                    .query({
                        username: store().login.username,
                        password:store().login.password
                    })
                    .finish((error, res)=>{
                        if (res.body.error) {
                            const response = {
                                status: false,
                                message: res.body.error
                            }
                            
                            dispatch({
                                type: LOGIN,
                                payload: response
                            });
                            
                            Alert.alert('Error', res.body.error);
                        } else {
                            const response = {
                                status: true,
                                message: "Success"
                            }

                            AsyncStorage.setItem('driver', JSON.stringify(res.body));

                            dispatch({
                                type: LOGIN,
                                payload: response
                            });

                            dispatch({
                                type: SET_DRIVER,
                                payload: res.body
                            });
                        }
                    });
                } else {
                    Alert.alert('Error', "Please connect to the internet");
                }

                dispatch({
                    type: UPDATE_LOADING_STATUS,
                    payload: false
                });
            });
        } else {
            Alert.alert('Error', "Please enter username/password");
        }
	};
}

//------------------------
//Action Handlers
//------------------------
function handleGetUsername(state, action) {
	return update(state, {
		username: {
			$set: action.payload
		}
	})
}

function handleGetPassword(state, action) {
	return update(state, {
		password: {
			$set: action.payload
		}
	})
}

function handleLogin(state, action) {
	return update(state, {
		loginResult: {
			status: {
				$set: action.payload.status
			},
			message: {
				$set: action.payload.message
			}
		}
    })
    
    if (action.payload.status == true) {
        return update(state, {
            username: {
                $set: ""
            },
            password: {
                $set: ""
            }
        })
    }
}

function handleLoadingStatus(state, action) {
    return update(state, {
        isLoading: {
            $set: action.payload
        }
    })
}

function handleSetDriver(state, action) {
    return update(state, {
        driver: {
            $set: action.payload
        }
    })
}

const ACTION_HANDLERS = {
	GET_USERNAME: handleGetUsername,
    GET_PASSWORD: handleGetPassword,
    LOGIN: handleLogin,
    SET_DRIVER: handleSetDriver,
    UPDATE_LOADING_STATUS: handleLoadingStatus
}

const initialState = {
    username: "",
    password: "",
    loginResult: {},
    isLoading: false,
    driver: {}
};

export function LoginReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
