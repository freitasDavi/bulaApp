import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Alarm from "../Alarm";
import Favorites from "../Favorites";
import Home from "../Home";
import Profile from "../Profile";

const Tab = createBottomTabNavigator();

export default Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          elevation: 1,
          paddingHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 10,
          height: 60,
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={35}
              color={focused ? "#318450" : "#78c896"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Alarm"
        component={Alarm}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="bell"
              size={35}
              color={focused ? "#318450" : "#78c896"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="star"
              size={35}
              color={focused ? "#318450" : "#78c896"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user"
              size={35}
              color={focused ? "#318450" : "#78c896"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
