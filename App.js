import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import {Formulario} from './components/Formulario';
import {Header} from './components/Header';
import {Cotizacion} from './components/Cotizacion';
const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarApi, setConsultarApi] = useState(false);
  const [resultado, setResultado] = useState({});

  const cotizarCrypto = async () => {
    if (consultarApi) {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      setConsultarApi(false);
    }
  };

  useEffect(() => {
    cotizarCrypto();
  }, [consultarApi]);

  return (
    <>
      <ScrollView>
        <Header />
        <Image
          source={require('./assets/img/cryptomonedas.png')}
          style={styles.image}
        />
        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
            setConsultarApi={setConsultarApi}
          />
        </View>
        <Cotizacion resultado={resultado} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
