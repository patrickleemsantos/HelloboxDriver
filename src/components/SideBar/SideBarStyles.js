import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    sideBarContent: {
        backgroundColor: "#FFFFFF"
    },  
    profileContainer: {
        height: 200,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E90000"
    },
    profileImage: {
        height: 100, 
        width: 100, 
        borderRadius: 50
    },
    profileName: {
        marginTop: 10,
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },
	listText: {
        fontWeight: "bold"
    }
});

export default styles;