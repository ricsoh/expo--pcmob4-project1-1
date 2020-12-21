import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (

    <View style={styles.container}>
      <Text style= { styles.textLabel }>Bus Stop Number</Text>
      <TextInput
        placeholder= "Enter number here..."
        style= {styles.textInput}
        keyboardType= "number-pad"
      >
      </TextInput>
      <TouchableOpacity style= { styles.button }>
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


