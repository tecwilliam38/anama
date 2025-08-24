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
        marginVertical: 1.5,
        height: 90,
        backgroundColor: "#fff",
    },
    friendCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: "#000",
        // marginVertical: 1,
        // height: 80,
        // backgroundColor: "#fff",
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
        width: '55%',
        alignItems: "flex-start",        
    },
    friendIcons: {
        flexDirection: "column",
        width: "25%",
        alignItems: "center",
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
        padding: 10,
        fontSize: 20,
        color: "#000",
        width:"120%",
        borderWidth:1,
        borderColor:"#000",
    },
    friendLastMessage: {
        fontSize: 15,
        color: "#555",
    },
    friendTime:{
        fontSize:12,
        color:"#666",
    },
    friendNotifications:{

    },
})






