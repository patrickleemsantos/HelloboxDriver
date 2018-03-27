import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions, NetInfo } from "react-native";
import request from "../../../util/request";

//------------------------
//Constants
//------------------------
const { 
        GET_EARNINGS,
        SET_SELECTED_EARNINGS,
        SHOW_EARNINGS_LOADER
	} = constants;

//------------------------
//Actions
//------------------------
export function getEarnings(payload) {
	return(dispatch, store) => {
        dispatch({
            type: SHOW_EARNINGS_LOADER,
            payload: true
        });

        NetInfo.isConnected.fetch().then(isConnected => {
			if(isConnected) {
				request.get("http://52.220.212.6:3121/api/earningsByDriver")
				.query({
					driver_id: payload,
					order: store().earnings.selectedEarnings,
				})
				.finish((error, res)=>{
					if(res){
						dispatch({
							type:GET_EARNINGS,
							payload:res.body
						});
					}

                    dispatch({
                        type: SHOW_EARNINGS_LOADER,
                        payload: false
                    });
				});
			} else {
				Alert.alert('Error', "Please connect to the internet");
			}
		});
    }
}

export function setSelectedEarnings(payload) {
    return {
		type: SET_SELECTED_EARNINGS,
		payload
	}
}

//------------------------
//Action Handlers
//------------------------
function handleGetEarnings(state, action) {
	return update(state, {
		driverEarnings: {
			$set: action.payload
		}
	})
}

function handleSetSelectedEarnings(state, action) {
	return update(state, {
		selectedEarnings: {
			$set: action.payload
		}
	})
}

function handleShowEarningsModel(state, action) {
    return update(state, {
		showEarningsLoader: {
			$set: false
		}
	})
}

const ACTION_HANDLERS = {
    GET_EARNINGS: handleGetEarnings,
    SET_SELECTED_EARNINGS: handleSetSelectedEarnings,
    SHOW_EARNINGS_LOADER: handleShowEarningsModel
}

const initialState = {
    driverEarnings: {},
    selectedEarnings: "day",
    showEarningsLoader: false
};

export function EarningsReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
