import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {

  const [busStop, setBusStop] = useState("xxxxxx");

  useEffect(() => {

    // This sets up the top right button
    navigation.setOptions({
      title: "Bus App ( " + (busStop) + " )",
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
    });
    
    return () => {

    };

  }, []);

  return (

    <View style={styles.container}>
      <Text style= { styles.textLabel }>Bus Stop Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel:{
    fontWeight: 'bold',
  },
  textInput: {
    alignItems: 'center',
    width: '60%',
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  button: {
    width: 100,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "blue",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: 'center',
  },
});


