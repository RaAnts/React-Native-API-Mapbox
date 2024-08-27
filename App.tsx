// import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import MapboxGL, {Logger} from '@rnmapbox/maps'
// import Fontisto from 'react-native-vector-icons/Fontisto'

// Logger.setLogCallback(log => {
//   const {message} = log;

//   if (
//     message.match('Request failed due to a permanent error: Canceled') ||
//     message.match('Request failed due to a permanent error: Socket Closed')
//   ) {
//     return true;
//   }
//   return false;
// });
// MapboxGL.setAccessToken('sk.eyJ1IjoiYW50c2EwMyIsImEiOiJjbHpmZmVkNTIwdm1oMnNzYWlxcWMwM2pxIn0.1F8XmASvC5s6UjVgwrJe3w');
// // MapboxGL.setConnected(true)
// MapboxGL.setTelemetryEnabled(false)
// // MapboxGL.setWellKnownTileServer('Mapbox')


// const App = () => {
//   const [modalVisible, setmodalVisible] = useState<boolean>(false)
//   const [locationData, setLoactionData] = useState<any>(null)

//   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${30.802499}&lon=${10.195590}`

//   const onMarkerPress = () => {
//     setmodalVisible(true);
//   }

//   const closeModal = () => {
//     setmodalVisible(false);
//   }

//   useEffect(() => {
//     fetch(url)
//     .then(response => response.json())
//     .then(data => setLoactionData(data))
//     .catch(error => console.error('Error fetching reverse data', error));
//     console.log(locationData)
//   }, [])

//   return (
//       <View style={styles.container}>
//         <MapboxGL.MapView
//         style={styles.map}
//         zoomEnabled={true}
//         styleURL='mapbox://styles/mapbox/streets-v12'
//         rotateEnabled={true}
//         >
//           <MapboxGL.Camera
//           zoomLevel={5}
//           centerCoordinate={[10.181667, 30.886389]}
//           pitch={60}
//           animationMode={'flyTo'}
//           animationDuration={6000}
//           />
//           <MapboxGL.PointAnnotation
//           id='marker'
//           coordinate={[10.181667, 30.886389]}
//           onSelected={onMarkerPress}
//           >
//             <View style={styles.markerContainer}>
//               <Fontisto name="shopping-store" size={20} color="white" />
//             </View>
//           </MapboxGL.PointAnnotation>
//         </MapboxGL.MapView>
//         <Modal visible={modalVisible} animationType='none' transparent >
//           <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
//               <Text style={styles.closeButtonText} >Close</Text>
//             </TouchableOpacity>
//             <Text>City: {locationData?.address.county}</Text>
//             <Text>Country : {locationData?.address.country}</Text>
//           </View>
//           </View>
//         </Modal>
//       </View>    
//   );
// }

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   map: {
//     flex: 1
//   },
//   markerContainer: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "red",
//     borderRadius: 20
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     marginHorizontal: 20,
//     padding: 20,
//     elevation: 5,
//     width: Dimensions.get('window').width - 40
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//   },
//   closeButtonText: {
//     color: 'black',
//     fontSize: 16,
//     padding: 10
//   }
// });



// // const App = () => {
// //   return (
// //     <View style={styles.page}>
// //       <View style={styles.container}>
// //         <Mapbox.MapView style={styles.map}
// //         zoomEnabled={true}
// //         >
// //           <Mapbox.Camera
// //             zoomLevel={11}
// //             centerCoordinate={[10.181667, 30.886389]}
// //             pitch={60}
// //             animationMode={'flyTo'}
// //             animationDuration={6000}
// //           />
// //         </Mapbox.MapView>
// //       </View>
// //     </View>
// //   );
// // }

// // export default App;

// // const styles = StyleSheet.create({
// //   page: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   container: {
// //     height: 300,
// //     width: 300,
// //   },
// //   map: {
// //     flex: 1
// //   }
// // });

import React, {useEffect, useState} from 'react';
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StoreLocation from './src/screens/StoreLocation';
import HeaderComponent from './src/components/HeaderComponent';
import Demarrage from './src/screens/Demarrage';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

const App = () => {

  const [showSplashScreen, setShowSplashScreen] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
      SplashScreen.hide();
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  // return (
  //   <NavigationContainer>
  //     <HeaderComponent />
  //     <Stack.Navigator initialRouteName="Demarrage">
  //       <Stack.Screen
  //         options={{headerShown: false}}
  //         name="Home"
  //         component={Home}
  //       />
  //       <Stack.Screen
  //         options={{headerShown: false}}
  //         name="StoreLocation"
  //         component={StoreLocation}
  //       />
        
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  return (
    <NavigationContainer>
      {showSplashScreen ? <Demarrage /> : (
        <>
          <HeaderComponent />
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="StoreLocation"
              component={StoreLocation}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;
