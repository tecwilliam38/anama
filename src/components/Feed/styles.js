import { StyleSheet } from "react-native";



export const feedStyle = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
    },
    listContainer: {
        width: "100%",
        height:500,
    },
    itemBody: {
        alignItems: 'center',
        justifyContent:"flex-start",
        marginHorizontal: "1%",
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 3,
        borderRadius: 12,
        width: "98%",
        height: 'auto',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Android shadow
        elevation: 1,
    },
    title: {
        color: '#000',
        width: "100%",
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    titleDescription: {
        flex: 1,
        flexDirection: "row",
        width:"95%",
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginTop:10,
    },
    titleEpisodios: {
        fontSize: 20,
        color: "#000",
    },
    titleRank: {
        fontSize: 18,
        color: "#888",
    },
    itemDescription:{
        color:"#000",
        flex:1,
        alignItems:"flex-start",
    },
    itemImage: {
        width: "100%",
        height: 460,
        borderRadius: 12,  
        border:3      
    }
})