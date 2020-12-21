import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, TextInput, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [arrivalMinutes, setArrivalMinutes] = useState("");
  const [seqArrival, setSeqArrival] = useState("");
  const [seqArrivalMinutes, setSeqArrivalMinutes] = useState("");
  const [busTempNumber, setBusTempNumber] = useState("");
  const [busNumber, setBusNumber] = useState(route.params.recBusNumber);
  const [busStop, setBusStop] = useState(route.params.recBusStop);
  const [BUSSTOP_URL, setBUSSTOP_URL] = useState("https://arrivelah2.busrouter.sg/?id=" + busStop);

  // This will retrive data using API
  function loadBusStopData() {
    // Turn on the loading indicator each time
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const myBus = responseData.services.filter(
          (item) => item.no === busNumber
        )[0];
        setArrival(myBus.next.time);
        setArrivalMinutes(Math.round((myBus.next.duration_ms)/60000));
        setSeqArrival(myBus.subsequent.time);
        setSeqArrivalMinutes(Math.round((myBus.subsequent.duration_ms)/60000));
        setLoading(false);
      });
  }  

  useEffect(() => {

    // This sets up the top right button
    navigation.setOptions({
      title: "Bus App",
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
    
    const interval = setInterval(loadBusStopData, 15000);

    loadBusStopData(); // load immediately when start instead of waiting for interval

    // Return the function to run when unmouting
    return () => clearInterval(interval);

    return () => {
    };

  }, []);

  // Return formatted date
  function dateConvert(time) {
    const day = new Date(time);
    let [hour, minute, second] = day.toLocaleTimeString("en-US").split(":");
    const timeArranged = `${hour}:${minute}:${second}`
    
    return timeArranged;
  }

  function submitPressed(recBusNumber) {
    
    Keyboard.dismiss();

    setBusNumber(recBusNumber);
    loadBusStopData();
    // Clear the text input box
    setBusTempNumber("");
  }

  function refreshPressed() {
    loadBusStopData();
  }

  return (
    <View style={ styles.container }>
        <Text style={styles.textLabel}>Bus Stop</Text>
        <Text style={styles.arrivalInfo}>{busStop}</Text>
        <Text style={styles.textLabel}>Bus Number</Text>
        <Text style={styles.arrivalInfo}>{busNumber}</Text>
        <Text style={styles.textLabel}>Bus Arrival Time ( waiting time )</Text>
        <Text style={styles.arrivalInfo}>
          {loading ? <ActivityIndicator size="large" color="blue"/> : dateConvert(arrival)} ( {arrivalMinutes} mins )
        </Text>
        <Text style={styles.textLabel}>Subsq. Bus Arrival Time ( waiting time )</Text>
        <Text style={styles.arrivalInfo}>
          {loading ? <ActivityIndicator size="large" color="blue"/> : dateConvert(seqArrival)} ( {seqArrivalMinutes} mins )
        </Text>
        <TouchableOpacity style={[ styles.button, styles.refreshButton ]} onPress={() => refreshPressed()}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
        <Text style={styles.textLabel}>Bus Stop</Text>
        <View style={styles.textInputView}>
          <TextInput
            placeholder= "Enter bus number here..."
            style= {styles.textInput}
            value={busTempNumber}
            onChangeText={(input) => setBusTempNumber(input)}
            keyboardType= "number-pad"
            maxLength= {5}
          >
          </TextInput>
          <TouchableOpacity onPress={() => setBusTempNumber("")}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={36}
              color="gray"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>                
          <TouchableOpacity onPress={() => submitPressed(busTempNumber)}>
            <MaterialCommunityIcons
              name="location-enter"
              size={36}
              color="blue"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel:{
    fontSize: 15,
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
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: "blue",
  },
  refreshButton: {
    backgroundColor: "green",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: 'center',
  },
  arrivalInfo: {
    fontSize: 15,
    marginBottom: 25,
    height: 30,
   },
});


