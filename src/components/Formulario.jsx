import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import useSelectMonedas from '../hooks/useSelectMonedas';
import Error from './Error';

import { monedas } from '../data/Monedas';


const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: all 200ms;
    margin-top: 25px;

    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`


const Formulario = ({ setMonedas }) => {

  //! STATE
  const [ criptos, setCriptos ] = useState([]);
  const [ error, setError ] = useState('');


  //! HOOK - SELECT 
  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas);
  const [ criptomoneda, SelectCriptomonedas ] = useSelectMonedas('Elige la Criptomoneda', criptos);


  useEffect( () => {

    const consultarApi = async () => {

      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      // console.log(resultado.Data);

      const arrayCriptos = resultado.Data.map( cripto => {

        const obj = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };

        return obj;
      } )
      
      setCriptos(arrayCriptos);
    }
    consultarApi();


  }, []);



  const handleSubmit = e => {
    e.preventDefault();

    if( !moneda || !criptomoneda ) {
      setError(true);
      return;
    };

    setError(false);
    setMonedas({ moneda, criptomoneda });

  };

  return (

    <>
      { error && <Error>Todos los campos son obligatorios</Error> }

      <form onSubmit={handleSubmit}>

      <SelectMonedas />
      <SelectCriptomonedas />
      <InputSubmit type="submit" value="Cotizar" />

      </form>

    </>

  )
}

export default Formulario