import InputField from './InputField';
import Button from './Button';
import SelectField from './SelectField';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Adress = {
  street: string,
  number: string,
  zipCode: string,
  complement: string,
  city: string,
  state: string
}

type ErrorMessage = {
  message: string;
  name: string;
}

export type State = {
  id: number,
  nome: string,
}

type AdressesModalProps = {
  verifyError: (x: string) => string | undefined,
  index: number
  adresses: Adress
  onClick?: () => void,
  count: number,
  setAdresses: (value: Adress[] | ((prevAdresses: Adress[]) => Adress[])) => void,
  setIsError: (value: ErrorMessage[] | ((prevAdresses: ErrorMessage[]) => ErrorMessage[])) => void,
  isUpdate: boolean
}

export default function AdressesModal({ 
  verifyError, 
  index, 
  adresses, 
  count, 
  setAdresses, 
  setIsError,
  isUpdate
  }: AdressesModalProps) {
  const [data, setData] = useState<State[]>([]);

  useEffect(() => {
    const getStates = async () => {
      const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      setData(response.data);
    }
    getStates();
  }, [])

  const adicionarEndereco = () => {
    setAdresses((prevAdresses: Adress[]) => [
      ...prevAdresses,
      {
        street: '',
        number: '',
        zipCode: '',
        complement: '',
        city: '',
        state: ''
      }
    ]);
  };

  const removeAdresses = (index: number) => {
    setAdresses((prevAdresses) => {
      const novosAdresses = [...prevAdresses];
      novosAdresses.splice(index, 1);
      return novosAdresses;
    });
  };

  const handleAdresses = (index: number, campo: keyof Adress, valor: string) => {
    setAdresses((prevAdresses) => {
      const novosAdresses = [...prevAdresses];
      novosAdresses[index][campo] = valor;
      return novosAdresses;
    });
  };
  
  

  return (
    <div key={`${index+count}-address`}>
      <div className='flex flex-wrap gap-x-2 gap-y-2'>
        <InputField 
        disabled={index + 1 !== count && !isUpdate}  
        labelClassName='text-black' 
        label="Logradouro" 
        placeholder="Digite seu logradouro" 
        className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' 
        id='logradouro' 
        onChange={(e) => {
          handleAdresses(index, 'street', e.target.value); 
          setIsError((prevStatet) => (
          prevStatet.filter((error) => error.name !== 'street')
        ))}} 
        type='text' 
        value={adresses.street}  
        isError={verifyError('street')} 
        />
        <InputField 
        disabled={index + 1 !== count && !isUpdate}  
        labelClassName='text-black' 
        label="Numero" 
        placeholder="Digite seu numero" 
        className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' 
        id='numero' 
        onChange={(e) => {
          handleAdresses(index, 'number', e.target.value); 
          setIsError((prevStatet) => (
          prevStatet.filter((error) => error.name !== 'number')
        ))}} 
        type='text' 
        value={adresses.number} 
        isError={verifyError('number')} 
        />
        <InputField 
        disabled={index + 1 !== count && !isUpdate} 
        labelClassName='text-black' 
        label="CEP" 
        placeholder="Digite seu CEP" 
        className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' 
        id='cep' 
        onChange={(e) => {
          let valor = e.target.value.replace(/\D/g, '');

          if (valor.length > 8) {
            valor = valor.slice(0, 8);
          }

          if (valor.length === 8) {
            valor = valor.replace(/(\d{5})(\d{3})/, '$1-$2');
          }

          handleAdresses(index, 'zipCode', valor); 
          setIsError((prevStatet) => (
          prevStatet.filter((error) => error.name !== 'zipCode')
        ))}} 
        type='text' 
        value={adresses.zipCode} 
        isError={verifyError('zipCode')} 
        />
        <InputField 
        disabled={index + 1 !== count && !isUpdate}  
        labelClassName='text-black' 
        label="Complemento" 
        placeholder="Digite seu complemento" 
        className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' 
        id='complemento' 
        onChange={(e) => {
          handleAdresses(index, 'complement', e.target.value); 
          setIsError((prevStatet) => (
          prevStatet.filter((error) => error.name !== 'complement')
        ))}} 
        type='text' 
        value={adresses.complement} 
        isError={verifyError('complement')} 
        />
        <InputField 
        disabled={index + 1 !== count && !isUpdate}  
        labelClassName='text-black' 
        label="Cidade" 
        placeholder="Digite sua Cidade" 
        className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' 
        id='cidade' 
        onChange={(e) => {
          handleAdresses(index, 'city', e.target.value); 
          setIsError((prevStatet) => (
          prevStatet.filter((error) => error.name !== 'city')
        ))}} 
        type='text' 
        value={adresses.city} 
        isError={verifyError('city')} 
        />
        <SelectField 
        disabled={index + 1 !== count && !isUpdate}  
        labelClassName='text-black' 
        label="Estado" 
        placeholder="Escolha seu Estado" 
        className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' 
        id='estado' 
        onChange={(e) => {
          handleAdresses(index, 'state', e.target.value); 
          setIsError((prevStatet) => (
          prevStatet.filter((error) => error.name !== 'state')
        ))}} 
        type='text' 
        value={adresses.state} 
        errorMessage='Estado invalido' 
        data={data}
        />
      </div>
      {
        index + 1 === count ? (
          <Button 
          type='button' 
          title='Adicionar novo endereço' 
          className='flex bg-black text-white w-1/6 text-[14px] justify-center hover:bg-slate-700 max-sm:w-2/3 max-sm:text-[12px]' 
          onClick={adicionarEndereco}
          />
        ) : (
          <div className='flex justify-end'>
             <Button 
             type='button' 
             title='Remover Endereço' 
             className='flex bg-black text-white w-1/6 text-[14px] justify-center hover:bg-slate-700 max-sm:w-2/3 max-sm:text-[12px]' 
             onClick={() => removeAdresses(index)}
             />
          </div>
        )
      }
      <div className='mt-4'>
        <svg height="1" width="100%">
          <line x1="0" y1="0" x2="100%" y2="0" stroke="black" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}