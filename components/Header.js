import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

export const Header = () => (
  <Text style={styles.encabezado}>Criptomonedas</Text>
);

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    paddingBottom: 10,
    fontFamily: 'Lato-Black',
    fontSize: 20,
    backgroundColor: '#5E49E2',
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 30,
  },
});
