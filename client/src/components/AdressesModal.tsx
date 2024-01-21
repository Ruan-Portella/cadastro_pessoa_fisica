import InputField from './InputField';
import Button from './Button';

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

type AdressesModalProps = {
  verifyError: (x: string) => boolean | undefined,
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
        errorMessage='Logradouro invalido' 
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
        errorMessage='Numero invalido' 
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
          handleAdresses(index, 'zipCode', e.target.value); 
          setIsError((prevStatet) => (
          prevStatet.filter((error) => error.name !== 'zipCode')
        ))}} 
        type='text' 
        value={adresses.zipCode} 
        errorMessage='CEP invalida' 
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
        errorMessage='Complemento invalido' 
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
        errorMessage='Cidade invalida' 
        isError={verifyError('city')} 
        />
        <InputField 
        disabled={index + 1 !== count && !isUpdate}  
        labelClassName='text-black' 
        label="Estado" 
        placeholder="Digite seu Estado" 
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
        isError={verifyError('state')} 
        />
      </div>
      {
        index + 1 === count ? (
          <Button 
          type='button' 
          title='Adicionar novo endereço' 
          className='flex bg-black text-white w-1/6 text-[14px] justify-center hover:bg-slate-700' 
          onClick={adicionarEndereco}
          />
        ) : (
          <div className='flex justify-end'>
             <Button 
             type='button' 
             title='Remover Endereço' 
             className='flex bg-black text-white w-1/6 text-[14px] justify-center hover:bg-slate-700' 
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