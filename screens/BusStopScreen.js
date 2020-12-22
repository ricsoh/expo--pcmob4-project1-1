import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, TextInput, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BusStopScreen({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [arrivalMinutes, setArrivalMinutes] = useState("");
  const [seqArrival, setSeqArrival] = useState("");
  const [seqArrivalMinutes, setSeqArrivalMinutes] = useState("");
  const [busTempNumber, setBusTempNumber] = useState("");
  const [busNumber, setBusNumber] = useState(route.params.recBusNumber);
  const [busStop, setBusStop] = useState(route.params.recBusStop);
  const [BUSSTOP_URL, setBUSSTOP_URL] = useState("https://arrivelah2.busrouter.sg/?id=" + busStop);
  const [intervalID, setIntervalID] = useState("");
  const [debug, setdebug] = useState("true"); // set to "false" to stop console.log and reload

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
    
    // Start the timer set state id
    setIntervalID(setInterval(loadBusStopData, 15000));
    loadBusStopData();  // Force start, not waiting for timer to start

    // Return the function to run when unmouting
    return () => stopTimer(); // Stop the timer
//    return () => clearInterval(intervalID);     // Stop the timer
  }, []);

  // This will retrive data using API
  function loadBusStopData() {
    if (debug == 'true') {
      console.log("loadBusStopData => Interval: " + intervalID + " busStop: " + busStop + " busNumber: " + busNumber);
    }

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

  // Return formatted date
  function dateConvert(time) {
    const day = new Date(time);
    let [hour, minute, second] = day.toLocaleTimeString("en-US").split(":");
    const timeArranged = `${hour}:${minute}:${second}`
    
    return timeArranged;
  }

  // Stop timer, set bus number, reload data and start timer
  function submitPressed(recBusStop, recBusNumber) {

    if (debug == 'true') {
      console.log("submitPressed => Interval: " + intervalID + " busStop: " + busStop + " busNumber: " + recBusNumber);
    }
    
    // Clear the text input box
    setBusTempNumber("");
    // Hid the keyboard
    Keyboard.dismiss();
    // Set the new bus number
    setBusNumber(recBusNumber);

    // stop timer, set timer and reload data
    refreshData();
  }

  // stop timer, set timer and reload data
  function refreshData() {

    // Stop the timer
    stopTimer();
//    clearInterval(intervalID);

    if (debug == 'true') {
      console.log("refreshData => Interval: " + intervalID + " busStop: " + busStop + " busNumber: " + busNumber);
    }
    
    // Start the timer set state id
    setIntervalID(setInterval(loadBusStopData, 15000));
    loadBusStopData();  // Force start, not waiting for timer to start
  }

  function stopTimer() {
    if (debug == 'true') {
      console.log("stopTimer => Interval: " + intervalID + " busStop: " + busStop + " busNumber: " + busNumber);
    }

    // Stop the timer
    clearInterval(intervalID);
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
        <TouchableOpacity style={[ styles.button, styles.refreshButton ]} onPress={() => refreshData()}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
        {/* Below for chnaging bus number on particular bus stop */}
        <Text style={styles.textLabel}>New Bus Number Query</Text>        
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
          <TouchableOpacity onPress={() => submitPressed(busStop, busTempNumber)}>
            <MaterialCommunityIcons
              name="location-enter"
              size={36}
              color="blue"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        </View>
        {/* Below for chnaging bus number on particular bus stop */}
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
    marginRight: 10,
  },
  textInputView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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


