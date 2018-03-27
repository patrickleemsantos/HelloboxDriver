import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = {
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
        // paddingTop: 10,
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
    countDownContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
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
        flex: 1,
        // paddingLeft: 10
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
    cd: {
      textAlign: 'center',
      color: 'white',
      fontSize: 20,
    }
};

export default styles;

