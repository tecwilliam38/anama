import { Dimensions, StyleSheet } from "react-native";

export const ContactStyles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height - 20,
        width: "100%",
        backgroundColor: "rgba(153, 153, 153, 0.5)",
        marginTop: 10,
        marginBottom: 10,
    },
    itemStyle: {
        width: '100%',
    },
    contactBody: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        marginVertical: 1,
        height: 90,
        backgroundColor: "#fff",
    },
    friendCenter: {
        flexDirection: "row",
        // paddingLeft:10,
        alignItems: "center",
        // justifyContent: 'space-between',            
    },
    userImage: {
        margin: 10,
        width: 60,
        padding: 10,
        height: 60,
        borderRadius: 50,
        resizeMode: 'stretch',
        backgroundColor: "rgba(204, 204, 204, 0.5)",
    },
    friendData: {
        flexDirection: "column",
        width: '60%',
        alignItems: "flex-start",
        // borderWidth: 2,
        // borderColor: "#555",
    },
    friendIcons: {
        flexDirection: "column",
        width: "25%",
        alignItems: "center",
        height: 80,
        justifyContent: "space-around",
        paddingVertical: 8,

        // borderWidth: 2,
        // borderColor: "#555",
    },
    bodyStyle: {
        marginVertical: 5,
        backgroundColor: "#fff",
        width: "99%",
        height: 40,
    },
    empty: {
        fontSize: 16,
        color: '#777',
    },
    friendImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    friendName: {
        paddingVertical: 10,
        fontSize: 18,
        color: "#555",
        fontWeight: "bold",
        width: "150%",
    },
    friendLastMessage: {
        width: "150%",
        fontSize: 13,
        color: "#777",
    },
    friendTime: {
        width: "15%",
        fontSize: 12,
        color: "#666",
    },
    friendNotifications: {
        width: "15%",
        fontSize: 12,
        color: "#000",
    },
    friendBottomIcons: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingHorizontal: 7,
        // marginRight: 20,
        width: "100%",
    },
    friendBottomText: {
        // borderWidth:2,
        // borderColor:"#555",
        // marginRight:15,
        textAlign: "center",
        fontSize: 14,
        color: "#555",
    },
})






