import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Alarm from "../Alarm";
import CreateAlarm from "../CreateAlarm";
import Favorites from "../Favorites";
import Home from "../Home";
import Profile from "../Profile";
import SearchResults from "../SearchResults";

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
        component={HomeStackTabs}
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
        component={AlarmTabs}
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

const AlarmStack = createStackNavigator();

export const AlarmTabs = () => {
  return (
    <AlarmStack.Navigator
      initialRouteName="Alarms"
      screenOptions={{ headerShown: false }}
    >
      <AlarmStack.Screen name="Alarms" component={Alarm} />
      <AlarmStack.Screen name="CreateAlarm" component={CreateAlarm} />
    </AlarmStack.Navigator>
  );
};

const HomeStack = createStackNavigator();

export const HomeStackTabs = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeDefault" component={Home} />
      <HomeStack.Screen name="SearchResults" component={BulaStacks} />
    </HomeStack.Navigator>
  );
};

const BulaStack = createStackNavigator();

export const BulaStacks = () => {
  return (
    <BulaStack.Navigator screenOptions={{ headerShown: false }}>
      <BulaStack.Screen name="Resultados" component={SearchResults} />
    </BulaStack.Navigator>
  );
};
