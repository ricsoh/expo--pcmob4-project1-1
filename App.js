import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen"
import BusStopScreen from "./screens/BusStopScreen"

const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name= "Home"
          component= {HomeScreen}
          options= {
            {
              headerTitle: "Bus App",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 24,
                color: "black",
              },
              headerStyle: {
                height: 80,
                backgroundColor: "gray",
              },            
            }
          }
        />
        <Stack.Screen
          name= "BusStop"
          component= {BusStopScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
