import React from "react";
import { NavigationContainer, Route } from "@react-navigation/native";
import HomeScreen from "src/screens/HomeScreen/HomeScreen";
import VideoScreen from "src/screens/VideoScreen/VideoScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Screens } from "src/types/types";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "src/styles/colors";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Home: undefined;
  Bookmarks: undefined;
  Video: undefined;
};

function getNavigationIcon(route: Route<string>, focused: boolean) {
  if (route.name === Screens.home) {
    return focused ? "play-circle" : "play-circle-outline";
  }

  return focused ? "folder-star" : "folder-star-outline";
}

function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <MaterialCommunityIcons
              name={getNavigationIcon(route, focused)}
              size={size}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.blue,
        inactiveTintColor: Colors.grey,
      }}
    >
      <Tab.Screen name={Screens.home} component={HomeScreen} />
      <Tab.Screen name={Screens.bookmarks} component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Screens.home} component={MainNavigator} />
        <Stack.Screen name={Screens.video} component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
