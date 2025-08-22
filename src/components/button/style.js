import { COLORS, FONT_SIZE } from "../../context/constants.js";

export const ButtonStyles = {
    btn: {
        width: "100%",
        borderRadius: 6,
        padding: 12,
        borderRadius: 12,
        marginBottom: 15,
    },
    primary: {
        backgroundColor: COLORS.green1,
        marginBottom: 10,
    },
    danger: {
        backgroundColor: COLORS.red1,
        marginBottom: 10,
    },
    text: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        textAlign: "center",
    }

}