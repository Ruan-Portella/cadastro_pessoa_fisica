import InputField from './InputField';
import Button from './Button';

type Adress = {
  logradouro: string;
  number: string;
  CEP: string;
  complemento: string;
  City: string;
  state: string;
}

type AdressesModalProps = {
  isError: string
  index: number
  adresses: Adress
  onClick?: () => void,
  count: number,
  setAdresses: (value: Adress[] | ((prevAdresses: Adress[]) => Adress[])) => void
}

export default function AdressesModal({ isError, index, adresses, count, setAdresses }: AdressesModalProps) {

  const adicionarEndereco = () => {
    setAdresses((prevAdresses: Adress[]) => [
      ...prevAdresses,
      {
        logradouro: '',
        number: '',
        CEP: '',
        complemento: '',
        City: '',
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
        <InputField disabled={index + 1 !== count}  labelClassName='text-black' label="Logradouro" placeholder="Digite seu logradouro" className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' id='logradouro' onChange={(e) => handleAdresses(index, 'logradouro', e.target.value)} type='text' value={adresses.logradouro} errorMessage='Logradouro invalido' isError={isError === 'logradouro' ? true : false} />
        <InputField disabled={index + 1 !== count}  labelClassName='text-black' label="Numero" placeholder="Digite seu numero" className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' id='numero' onChange={(e) => handleAdresses(index, 'number', e.target.value)}type='text' value={adresses.number} errorMessage='Numero invalido' isError={isError === 'number' ? true : false} />
        <InputField disabled={index + 1 !== count}  labelClassName='text-black' label="CEP" placeholder="Digite seu CEP" className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' id='cep' onChange={(e) => handleAdresses(index, 'CEP', e.target.value)} type='text' value={adresses.CEP} errorMessage='CEP invalida' isError={isError === 'cep' ? true : false} />
        <InputField disabled={index + 1 !== count}  labelClassName='text-black' label="Complemento" placeholder="Digite seu complemento" className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' id='complemento' onChange={(e) => handleAdresses(index, 'complemento', e.target.value)} type='text' value={adresses.complemento} errorMessage='Complemento invalido' isError={isError === 'email' ? true : false} />
        <InputField disabled={index + 1 !== count}  labelClassName='text-black' label="Cidade" placeholder="Digite sua Cidade" className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' id='cidade' onChange={(e) => handleAdresses(index, 'City', e.target.value)} type='text' value={adresses.City} errorMessage='Cidade invalida' isError={isError === 'city' ? true : false} />
        <InputField disabled={index + 1 !== count}  labelClassName='text-black' label="Estado" placeholder="Digite seu Estado" className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' id='estado' onChange={(e) => handleAdresses(index, 'state', e.target.value)} type='text' value={adresses.state} errorMessage='Estado invalido' isError={isError === 'state' ? true : false} />
      </div>
      {
        index + 1 === count ? (
          <Button type='button' title='Adicionar novo endereço' className='flex bg-black text-white w-1/6 text-[14px] justify-center hover:bg-slate-700' onClick={adicionarEndereco}/>
        ) : (
          <div className='flex justify-end'>
             <Button type='button' title='Remover Endereço' className='flex bg-black text-white w-1/6 text-[14px] justify-center hover:bg-slate-700' onClick={() => removeAdresses(index)}/>
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