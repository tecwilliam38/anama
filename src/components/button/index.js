import { Alert, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { ButtonStyles } from "./style.js";
import { COLORS } from "../../context/constants.js";

function Button(props) {
    return (
        <LinearGradient
            colors={["rgba(21, 56, 130, 1)", "rgba(31,143,78, 1)" , "rgba(237, 247, 124, 1)" ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}           
            style={[ButtonStyles.btn]}
        >
            <TouchableOpacity             
            onPress={props.onPress}>
                <Text style={ButtonStyles.text}>{props.text}</Text>
            </TouchableOpacity>
        </LinearGradient>

    )
}

export default Button;