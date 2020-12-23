import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {

  const [busStop, setBusStop] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function submitPressed(recBusStop, recBusNumber) {

    // Check if 5 digits
    if(recBusStop.length != 5) {
      setErrorMessage("Error! Please enter 5 digits.")
      return;
    }

    // goto bus stop screen with bus stop number
    navigation.navigate("Bus", {recBusStop, recBusNumber});
    // Clear the text input box
    setBusStop("");
    setBusNumber("");
    setErrorMessage("");
  }

  return (

    <View style={styles.container}>
      <Text style= { styles.textLabel }>Bus Stop Number</Text>
      <View style={styles.textInputView}>
        <TextInput
          placeholder= "Enter 5 digit number here..."
          style= {styles.textInput}
          value={busStop}
          onChangeText={(input) => setBusStop(input)}
          keyboardType= "number-pad"
          maxLength= {5}
        >
        </TextInput>
        <TouchableOpacity onPress={() => setBusStop("")}>
          <MaterialCommunityIcons
            name="close-circle-outline"
            size={32}
            color="gray"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>                
      </View>
      <Text style= { styles.textLabel }>Bus Number</Text>
      <View style={styles.textInputView}>
        <TextInput
          placeholder= "Enter bus number here..."
          style= {styles.textInput}
          value={busNumber}
          onChangeText={(input) => setBusNumber(input)}
          keyboardType= "number-pad"
          maxLength= {5}
        >
        </TextInput>
        <TouchableOpacity onPress={() => setBusNumber("")}>
          <MaterialCommunityIcons
            name="close-circle-outline"
            size={32}
            color="gray"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>                
      </View>
      <Text style= { styles.errorText }>{errorMessage}</Text>      
      <TouchableOpacity style= { styles.button } onPress={() => submitPressed(busStop, busNumber)}>
        <Text style= { styles.buttonText }>Submit</Text>
      </TouchableOpacity>
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
    margin: 20,
    borderWidth: 1,
    width: "60%",
    padding: 10,
    borderColor: "#ccc",
    marginRight: 6,
  },
  textInputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',    
  },    
  button: {
    width: 100,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "blue",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: "red",
    height: 30,
    textAlign: 'center',
  },
});


