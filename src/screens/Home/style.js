import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor:"rgba(5,5,5,0.3)",
    },
    topSearch: {
        top: 5,
        flexDirection: "row",
        height: 100,
        width: windowWidth,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Android shadow
        elevation: 5,

    },
    topSearchComponent: {
        height: 80,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        width: "70%",
        backgroundColor: "#fff",
        color: "#fff",
        paddingStart: 15,
        fontSize: 20,
        paddingVertical: 10,
    },
    topSearchText: {
        fontSize: 25,
        color: "#000",
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
})

