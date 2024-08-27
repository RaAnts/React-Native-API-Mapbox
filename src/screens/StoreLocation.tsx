import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import MapboxGL, {Logger, UserLocation} from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {APIKEY} from '../utils/key';
import ColorfulCard from "react-native-colorful-card";
import Icon from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

Logger.setLogCallback(log => {
  const {message} = log;

  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});
MapboxGL.setAccessToken(APIKEY);
// MapboxGL.setConnected(true);
MapboxGL.setTelemetryEnabled(false);
// MapboxGL.setWellKnownTileServer('Mapbox');
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'auto',
});

const routeProfiles = [
  {id: 'walking', label: 'Walking', icon: 'walking'},
  {id: 'cycling', label: 'Cylcing', icon: 'bicycle'},
  {id: 'driving', label: 'Driving', icon: 'car'},
];

const stylesMaps = [
  {id: 'light', url: "mapbox://styles/mapbox/navigation-day-v1"},
  {id: 'navigation', url: "mapbox://styles/mapbox/navigation-night-v1"}, 
  {id: 'satellite', url: "mapbox://styles/mapbox/satellite-streets-v12"},
]

const StoreLocation: React.FC = () => {
  const [routeDirections, setRouteDirections] = useState<any | null>(null);
  const [coords, setCoords] = useState<[number, number]>([47.09113, -21.45222]); 
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState<[number, number]>([
    47.0897, -21.4513,
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedRouteProfile, setselectedRouteProfile] =
    useState<string>('walking');

  const [urlStyle, setUrlStyle] = useState<string>("mapbox://styles/mapbox/navigation-day-v1");
  
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const {store} = route.params;
  // async function getPermissionLocation() {
  //   try {
  //     const geo = await Geolocation.getCurrentPosition(
  //       location => {
  //         setCoords([location.coords.longitude, location.coords.latitude]);
  //         console.log('user location', coords)
  //       },
  //       err => console.log(err),
  //       {enableHighAccuracy: true},
  //     );
  //     console.log("user location: ", coords)
  //   } catch (error) {
  //     console.error('Error getting location 1', error);
  //   }
  // }
  async function getPermissionLocation() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          setCoords([position.coords.longitude, position.coords.latitude]);
          resolve(position);
        },
        (error) => {
          console.error('Error getting location 1', error);
          reject(error);
        },   
        { enableHighAccuracy: true }
      );
    });
  }

  // useEffect(() => {
  //   getPermissionLocation()
  //   .then((position) => {
  //     console.log('User location :', position);
  //     // Utilisez la position ici
  //   })
  //   .catch((error) => {
  //     console.error('Error getting location 1:', error);
  //   });
  //   console.log("user location ", coords)
  //   //console.log(store.longitude);
  //   if (selectedRouteProfile !== null) {
  //     createRouterLine(coords, selectedRouteProfile);
  //   }
  // }, [selectedRouteProfile]);

  useEffect(() => {
    getPermissionLocation()
      .then((position) => {
        console.log('User location 1:', position);
        console.log('Coords est maintenant: ', coords);
        // Utilisez la position ici
      })
      .catch((error) => {
        console.error('Error getting location 1:', error);
      });
    if (selectedRouteProfile !== null) {
      createRouterLine(coords, selectedRouteProfile);
    }
  }, [selectedRouteProfile, urlStyle]);

  function makeRouterFeature(coordinates: [number, number][]): any {
    let routerFeature = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      ],
    };
    return routerFeature;
  }

  async function createRouterLine(
    coords: [number, number],
    routeProfile: string,
  ): Promise<void> {
    const startCoords = `${coords[0]},${coords[1]}`;
    const endCoords = `${[store.longitude, store.latitude]}`;
    const geometries = 'geojson';
    const url = `https://api.mapbox.com/directions/v5/mapbox/${routeProfile}/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${APIKEY}`;

    try {
      let response = await fetch(url);
      let json = await response.json();

      const data = json.routes.map((data: any) => {
        console.log(data);
        setDistance((data.distance / 1000).toFixed(2));
        setDuration((data.duration / 3600).toFixed(2));
      });

      let coordinates = json['routes'][0]['geometry']['coordinates'];
      let destinationCoordinates =
        json['routes'][0]['geometry']['coordinates'].slice(-1)[0];
      setDestinationCoords(destinationCoordinates);
      if (coordinates.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        setRouteDirections(routerFeature);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  const renderItem = ({
    item,
  }: {
    item: {id: string; label: string; icon: string};
  }) => (
    <TouchableOpacity
      style={[
        styles.routeProfileButton,
        item.id == selectedRouteProfile && styles.selectedRouteProfileButton,
      ]}
      onPress={() => setselectedRouteProfile(item.id)}>
      <Icon
        name={item.icon}
        size={24}
        color={
          item.id == selectedRouteProfile ? 'white' : 'rgba(255,255,255,0.6)'
        }
      />
      <Text
        style={[
          styles.routeProfileButtonText,
          item.id == selectedRouteProfile &&
            styles.selectedRouteProfileButtonText,
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderItemStyle = ({
    item,
  }: {
    item: {id: string; url: string};
  }) => (
    <TouchableOpacity
      style={[
        styles.urlStyleButton,
        item.url == urlStyle && styles.selectedRouteProfileButton,
      ]}
      onPress={() => setUrlStyle(item.url)}>
      <Text
        style={[
          styles.routeProfileButtonText,
          item.url == urlStyle &&
            styles.selectedRouteProfileButtonText,
        ]}>
        {item.id}
      </Text>
    </TouchableOpacity>
  );

  
  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        zoomEnabled={true}
        // styleURL="mapbox://styles/mapbox/navigation-night-v1"
        // styleURL="mapbox://styles/mapbox/satellite-streets-v12"
        // styleURL="mapbox://styles/mapbox/navigation-day-v1"
        styleURL={urlStyle}
        rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
          await createRouterLine(coords, selectedRouteProfile);
        }}>
        <MapboxGL.Camera
          zoomLevel={13}
          centerCoordinate={[47.0897, -21.45134]}
          animationMode={'flyTo'}
          animationDuration={6000}
        />
        {routeDirections && (
          <MapboxGL.ShapeSource id="line1" shape={routeDirections}>
            <MapboxGL.LineLayer
              id="routerLine01"
              style={{
                lineColor: '#FA9E14',
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        {destinationCoords && (
          <MapboxGL.PointAnnotation
            id="destinationPoint"
            coordinate={destinationCoords}>
            <View style={styles.destinationIcon}>
              <MaterialIcons name="local-hospital" size={24} color="#00ff00" />
            </View>
          </MapboxGL.PointAnnotation>
        )}
        {/* { coords && (<MapboxGL.UserLocation
          animated={true}
          androidRenderMode={'gps'}
          showsUserHeadingIndicator={true}
        />)}  */}
         {coords && (
          <MapboxGL.PointAnnotation
            id="InitatialePoint"
            coordinate={coords}>
            <View style={styles.InitialeIcon}>
              <Ionicons name="location" size={40} color="#1e90ff" />
            </View>
          </MapboxGL.PointAnnotation>
        )}
      </MapboxGL.MapView>
      <FlatList
        data={stylesMaps}
        renderItem={renderItemStyle}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.routeProfileList}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList1}
      />
      <FlatList
        data={routeProfiles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.routeProfileList}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#ffffff" />
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.loadingIndicator}
        />
      ) : (
        routeDirections && (
          <View style={styles.cardContainer}>
            <ColorfulCard
              title={`${store.name}`}
              value={`${duration} h`}
              footerTitle="Distance"
              footerValue={`${distance} km`}
              iconImageSource={require('../assets/icons/info.png')}
              style={{backgroundColor: '#2e8b57'}}
              // style={{backgroundColor: '#3cb371'}}
              // style={{backgroundColor: '#33495F'}}
              onPress={() => {}}
            />
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0 ,0 , 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
  },
  cardContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  InitialeIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeProfileList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  flatList: {
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width / 2 - 40,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  flatList1: {
    position: 'absolute',
    top: 60,
    // left: Dimensions.get('window').width / 2 - 40,
    left: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  routeProfileButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 8,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  urlStyleButton: {
    width: 80,
    height: 30,
    borderRadius: 30,
    marginVertical: 8,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  selectedRouteProfileButton: {
    backgroundColor: '#FA9E14',
    borderColor: '#FA9E14',
  },
  routeProfileButtonText: {
    color: '#fff',
    marginTop: 5,
  },
  selectedRouteProfileButtonText: {
    color: 'white',
  },
});

export default StoreLocation;
