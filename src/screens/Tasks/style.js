import { COLORS, FONT_SIZE } from "../../context/constants";


export const styles = {
    appointment: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.gray4,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: COLORS.gray1,
        shadowOffiset: { width: 1, height: 2 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    headerBg: {
        width: "100%",
        height: 50,
    },

    imageHeader: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-end",
        resizeMode: "cover",
        position: "relative",
        flexDirection: "row",
        width: "100%",
    },
    imageagenda: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
        position: "relative",
        flexDirection: "row",
        width: "100%",
    },
    textAgenda: {
        fontSize: 30,
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
    bgpagestyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    name: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray1,
        marginBottom: 2,
    },
    specialty: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray3,
        marginBottom: 4
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 5
    },
    bookingDate: {
        fontSize: FONT_SIZE.sm - 1,
        color: COLORS.gray2,
        marginTop: 3
    },
    bookingHour: {
        fontSize: FONT_SIZE.sm - 2,
        color: COLORS.gray2,
        marginTop: 3
    },
    booking: {
        flexDirection: "row"
    },
    containerBooking: {
        flex: 1
    },
    containerButton: {
        marginTop: 15,
    },
    container: {
        flex: 1,
        width: "100%",
    },
    headerText: {
        textAlign: "right",
        paddingRight: 10,
        paddingBottom: 5,
        color: "#fff",
    },
    headerTextTop: {
        textAlign: "left",
        justifyContent: "flex-start",
        color: "#fff",
        fontSize: 16,
        paddingBottom: 5,
        paddingLeft: 10,
    },
    noappointments: {
        color: "red",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {        
        width: "95%",
        height: 60,        
        borderRadius: 12,
        justifyContent: "center",
        marginHorizontal: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    buttonTouchable: {
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 60,
        paddingLeft:15,
        justifyContent: "start",
        
    },
    buttonText: {
        color: "#333",
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 10,
    },
    buttonTextClient: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 10,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    tasksList: {
        flex: 1,
        padding: 10,
    },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    margin: 16,
    elevation: 4, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
    label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 12,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
   picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  buttonCard: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonTextCard: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

}