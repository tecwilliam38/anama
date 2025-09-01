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
        flex: 1,
        width: '100%',
    },
    contactBody: {
        flexDirection: "row-reverse",
        alignItems: "center",
        width: '100%',        
        height: 'auto',
        backgroundColor: "#fff",        
    },
    friendCenter: {
        flexDirection: "row",       
        alignItems: "center",       
        justifyContent: "space-around",
        width: '90%',        
    },
    userImage: {
        marginHorizontal: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    friendDatastyle: {
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
        width: "100%",
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
        justifyContent: "space-between",                
        width: "80%",
    },
    friendBottomText: {
        textAlign: "center",
        fontSize: 16,
        color: "#333",
    },
})






