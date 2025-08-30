import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: windowHeight,
    },
    topSearch: {

        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // para Android
        margin: 10,
    },
    topSearchComponent: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
    },
    topSearchText: {
        fontSize: 25,
        color: "#000",
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#007AFF',
        marginBottom: 12,
    },
    previewImage: {
        height: 200,
        borderRadius: 12,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    actionButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 50,
    }
})

