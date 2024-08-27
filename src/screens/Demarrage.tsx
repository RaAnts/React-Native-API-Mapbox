import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Demarrage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Hôpital à proximité</Text>
      {/* <Image source={require('../assets/icons/info.png')} style={styles.logo} /> */}
      <MaterialIcons name="local-hospital" size={90} color="#2e8b57" />
      <Text style={styles.text}>Groupe 25 - Localisation et SIG</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Couleur de fond de votre choix
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50
  },
  titre: {
    fontSize: 20
  },
  text: {
    fontSize: 20
  }
});

export default Demarrage;
