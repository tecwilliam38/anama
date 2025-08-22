// Pages
import { Image, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Icons

import { COLORS } from "../context/constants.js";
import Home from "../screens/Home/index.js";
import icon from "./icon.js";
// import AbaCalendar from "../screens/appointments/index.js";

const TopTab = createMaterialTopTabNavigator();

function PrivateRoutes() {

    return <TopTab.Navigator screenOptions={{
        tabBarStyle: {
            backgroundColor: COLORS.white,
            marginTop: 30,
            height: 70,
            alignItems: "center"
        },
        // headerShown: false,
    }}>
        <TopTab.Screen name="Home" component={Home} options={{
            tabBarShowLabel: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
                return <Image source={icon.home} style={
                    {
                        width: focused ? 35 : 20,
                        height: focused ? 35 : 20,
                        textDecorationLine: focused ? "underline" : "none",
                        borderColor: focused ? COLORS.white : "transparent",
                        borderWidth: focused ? 2 : 0,
                        borderRadius: focused ? 12.5 : 0,
                        opacity: focused ? 1 : 0.8
                    }
                } />
            }
        }} />
        <TopTab.Screen name="Calendar" component={Home} options={{
            tabBarShowLabel: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
                return <Image source={icon.home} style={
                    {
                        width: focused ? 35 : 20,
                        height: focused ? 35 : 20,
                        textDecorationLine: focused ? "underline" : "none",
                        borderColor: focused ? COLORS.white : "transparent",
                        borderWidth: focused ? 2 : 0,
                        borderRadius: focused ? 12.5 : 0,
                        opacity: focused ? 1 : 0.8
                    }
                } />
            }
        }} />
        <TopTab.Screen name="Profile" component={Home} options={{
            tabBarShowLabel: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
                return <Image source={icon.home} style={
                    {
                        width: focused ? 35 : 20,
                        height: focused ? 35 : 20,
                        textDecorationLine: focused ? "underline" : "none",
                        borderColor: focused ? COLORS.white : "transparent",
                        borderWidth: focused ? 2 : 0,
                        borderRadius: focused ? 12.5 : 0,
                        opacity: focused ? 1 : 0.8
                    }
                } />
            }
        }} />
        <TopTab.Screen name="Reels" component={Home} options={{
            tabBarShowLabel: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
                return <Image source={icon.home} style={
                    {
                        width: focused ? 35 : 20,
                        height: focused ? 35 : 20,
                        textDecorationLine: focused ? "underline" : "none",
                        borderColor: focused ? COLORS.white : "transparent",
                        borderWidth: focused ? 2 : 0,
                        borderRadius: focused ? 12.5 : 0,
                        opacity: focused ? 1 : 0.8
                    }
                } />
            }
        }} />

        {/* <TopTab.Screen name="Agenda" component={AbaCalendar} options={{
                headerTitleAlign: "center",
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {
                    return <Image source={icon.calendar} style={
                        {
                            width: 25,
                            height: 25,
                            textDecorationLine: focused ? "underline" : "none",
                            borderColor: focused ? COLORS.white : "transparent",
                            borderWidth: focused ? 2 : 0,
                            borderRadius: focused ? 12.5 : 0,
                            opacity: focused ? 1 : 0.8,
                            color: focused ? COLORS.red : COLORS.red,
                        }
                    } />
                }
            }} />
            <TopTab.Screen name="Profile" component={Home} options={{
                headerTitleAlign: "center",
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {
                    return <Image source={icon.profile} style={
                        {
                            width: 25,
                            height: 25,
                            textDecorationLine: focused ? "underline" : "none",
                            borderColor: focused ? COLORS.white : "transparent",
                            borderWidth: focused ? 2 : 0,
                            borderRadius: focused ? 12.5 : 0,
                            opacity: focused ? 1 : 0.8,
                            color: focused ? COLORS.red : COLORS.red,
                        }
                    } />
                }
            }} /> */}
    </TopTab.Navigator>
}

export default PrivateRoutes;