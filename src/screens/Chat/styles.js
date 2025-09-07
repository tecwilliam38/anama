import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

export const ChatStyles = StyleSheet.create({
    container: {
        flex: 1,
        height: windowHeight,
        width: windowWidth,
        justifyContent: "space-around",
        backgroundColor: "rgba(255,255,255, 0.3)",
    },
    chatBody: {
        flex: 1,
        marginTop: 10,
        width: "100%",
        height: windowHeight,
        alignItems: "center",
        marginBottom: 30,
        backgroundColor: "rgba(255,255,255,1)",
    },
    chatList: {
        flex: 2,
        color: "#fff",
    },
    scrollStyle: {
        marginBottom: 100,
        width: "100%",
        paddingHorizontal: 10,
        paddingBottom: 30,
    },
    buttonStyle: {
        borderRadius: 50,
        height: 60,
        width: 60,
        marginLeft: 12,
        alignItems: "center",
        justifyContent: "center",

    },
    buttonText: {
        fontSize: 35,
        paddingHorizontal: 5,
    },
    inputArea: {
        flex: 1,
        position: "absolute",
        width: windowWidth,
        flexDirection: 'row',
        bottom: 0,
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 5,
        backgroundColor: "#fff",
        width: windowWidth,
        height: 90,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#000',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,


    },
    messageBubble: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 15,
        maxWidth: '100%',
    },
    myMessage: {
        backgroundColor: '#d1fcd3',
        alignSelf: 'flex-end',
    },
    otherMessage: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: "#000",
    },
    timestamp: { fontSize: 10, color: '#666', marginTop: 4 },
})


