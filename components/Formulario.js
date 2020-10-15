import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
export const Formulario = ({
  moneda,
  criptomoneda,
  setMoneda,
  setCriptomoneda,
  setConsultarApi,
}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  const consultarApi = async () => {
    const url =
      'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    const resultado = await axios.get(url);
    setCriptomonedas(resultado.data.Data);
  };

  useEffect(() => {
    consultarApi();
  }, []);

  const handleMoneda = (moneda) => {
    setMoneda(moneda);
  };

  const handleCriptomoneda = (crypto) => {
    setCriptomoneda(crypto);
  };

  const handleSubmit = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios', [{text: 'OK'}]);
      return;
    }
    setConsultarApi(true);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker onValueChange={handleMoneda} selectedValue={moneda}>
        <Picker.Item label="- Selecciona -" value="" />
        <Picker.Item label="Peso Argentino" value="ARG" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Dolar USA" value="USD" />
        <Picker.Item label="Euro" value="EUR" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker onValueChange={handleCriptomoneda} selectedValue={criptomoneda}>
        <Picker.Item label="- Selecciona -" value="" />
        {criptomonedas.map((cripto) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight style={styles.btnCotizar} onPress={handleSubmit}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    fontSize: 22,
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 25,
  },
  textoCotizar: {
    color: '#FFF',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Lato-Black',
    fontSize: 18,
  },
});
