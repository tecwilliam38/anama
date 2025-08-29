import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    editButton: {
        marginLeft: 12,
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 20,
    },
    card: {
        backgroundColor: '#fff',
        width: '95%',
        marginVertical: 20,
        paddingVertical: 20,
        paddingHorizontal: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 6,
    },
    label: {
        fontWeight: '600',
        color: '#000',
        width: 'auto',
    },
    value: {
        flex: 1,
        color: '#222',
        marginLeft: 5
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        padding:3,
        borderRadius: 60,
        marginBottom: 12,
    },
    icon: {
        marginRight: 8,
    }
})

