import { useEffect, useState } from 'react';
import Header from '../components/Header'
import InputField from '../components/InputField'
import AdressesModal from '../components/AdressesModal';
import ContactsModal from '../components/ContactsModal';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

interface ErrorMessage {
  message: string;
  name: string;
}

export default function CreateUser() {
  const [name, setName] = useState('');
  const [middlename, SetMiddleName] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [CPF, setCPF] = useState('');
  const [RG, setRG] = useState('');
  const [adresses, setAdresses] = useState([{
    street: '',
    number: '',
    zipCode: '',
    complement: '',
    city: '',
    state: ''
  }]);
  const [contacts, setContacts] = useState([{
    name: '',
    typeContact: '',
    contact: '',
  }]);
  const [isError, setIsError] = useState<ErrorMessage[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (window.location.pathname === '/create/user') {
        setIsUpdate(false)
        return;
      }
      const getUser = async () => {
        const response = await axios.get(`http://localhost:3001/pj/${window.location.pathname.split('/')[2]}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setName(response.data.name);
        SetMiddleName(response.data.middleName);
        setDate(response.data.dateOfBirth);
        setEmail(response.data.email);
        setCPF(response.data.cpf);
        setRG(response.data.rg);
        setAdresses(response.data.address);
        setContacts(response.data.contacts);
      }
      getUser();
      setIsUpdate(true);
    } catch {
      console.log('error');
    }
  }, [])



  const onSubmit = async () => {
    try {
      const data = {
        name,
        middleName: middlename,
        dateOfBirth: date,
        email,
        cpf: CPF,
        rg: RG,
        addresses: adresses,
        contacts
      }

      if (window.location.pathname === '/create/user') {
        await axios.post('http://localhost:3001/pj', data,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        navigate('/home')
      } else {
        await axios.put(`http://localhost:3001/pj/${window.location.pathname.split('/')[2]}`, data,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        navigate('/home')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response?.data.length) {
          setIsError([error.response?.data]);
        } else {
          setIsError(error.response?.data);
        }
      }
    }
  };

  const verifyError = (name: string) => {
    if (isError.length > 0) {
      if (isError.some((error) => error.name === name)) {
        return isError.filter((error) => error.name === name)[0].message;
      }
    }
  }

  return (
    <main className="w-full flex max-sm:flex-col-reverse min-h-screen max-sm:bg-[white]">
      <div className='sm:w-[90px] max-sm:flex max-sm:justify-center'>
        <Header />
      </div>
      <div className="w-full p-4 max-sm:p-0 max-sm:mb-[80px]">
        <form className="flex flex-col p-4 pl-10 pr-10 gap-6 w-full justify-center items-center rounded-lg 
    border-[#D3E2E5] border-[1px] bg-[white] max-sm:w-full max-sm:px-4 max-sm:py-6 max-sm:border-none">
          <div className="flex flex-col w-[100%] items-start">
            <h1 className="font-semibold text-[24px] text-black font-nunito leading-[32px]">
              {
                isUpdate ? 'Atualizar Pessoa Física' : 'Cadastrar Pessoa Física'
              }
            </h1>
            <p className="text-[16px] font-normal leading-6 text-[#6B7280]">Por favor, preencha todos os campos</p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className='w-full'>
              <h2 className='text-black text-[22px] font-semibold mb-2'>Dados Pessoais</h2>
              <div className='flex flex-wrap gap-x-2 gap-y-2'>
                <InputField
                  labelClassName='text-black'
                  label="Nome"
                  placeholder="Digite seu nome"
                  className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full'
                  id='name'
                  onChange={(event) => {
                    setName(event.target.value);
                    setIsError((prevStatet) => (
                      prevStatet.filter((error) => error.name !== 'name')
                    ))
                  }}
                  type='text' value={name}
                  isError={verifyError('name')}
                />
                <InputField
                  labelClassName='text-black'
                  label="Sobrenome"
                  placeholder="Digite seu sobrenome"
                  className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full'
                  id='sobrenome'
                  onChange={(event) => {
                    SetMiddleName(event.target.value);
                    setIsError((prevStatet) => (
                      prevStatet.filter((error) => error.name !== 'middleName')
                    ))
                  }}
                  type='text'
                  value={middlename}
                  isError={verifyError('middleName')}
                />
                <InputField
                  labelClassName='text-black'
                  label="Data de Nascimento"
                  placeholder="Digite sua Data de Nascimento"
                  className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full'
                  id='date'
                  onChange={(event) => {
                    let valor = event.target.value.replace(/\D/g, '');

                    if (valor.length > 2) {
                      valor = valor.substring(0, 2) + '/' + valor.substring(2);
                    }
                    if (valor.length > 5) {
                      valor = valor.substring(0, 5) + '/' + valor.substring(5, 9);
                    }

                    setDate(valor);
                    setIsError((prevStatet) => (
                      prevStatet.filter((error) => error.name !== 'dateOfBirth')
                    ))
                  }}
                  type='text'
                  value={date}
                  isError={verifyError('dateOfBirth')}
                />
                <InputField
                  labelClassName='text-black'
                  label="Email"
                  placeholder="Digite seu email"
                  className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full'
                  id='email'
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setIsError((prevStatet) => (
                      prevStatet.filter((error) => error.name !== 'email')
                    ))
                  }}
                  type='text'
                  value={email}
                  isError={verifyError('email')}
                />
                <InputField
                  labelClassName='text-black'
                  label="CPF"
                  placeholder="Digite seu CPF"
                  className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full'
                  id='cpf'
                  onChange={(event) => {
                    let valor = event.target.value.replace(/\D/g, '');

                    if (valor.length > 3) {
                      valor = valor.substring(0, 3) + '.' + valor.substring(3);
                    }

                    if (valor.length > 7) {
                      valor = valor.substring(0, 7) + '.' + valor.substring(7);
                    }

                    if (valor.length > 11) {
                      valor = valor.substring(0, 11) + '-' + valor.substring(11, 13);
                    }
                    setCPF(valor);
                    setIsError((prevStatet) => (
                      prevStatet.filter((error) => error.name !== 'cpf')
                    ))
                  }}
                  type='text'
                  value={CPF}
                  isError={verifyError('cpf')}
                />
                <InputField
                  labelClassName='text-black'
                  label="RG"
                  placeholder="Digite seu RG"
                  className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full'
                  id='rg'
                  onChange={(event) => {
                    let valor = event.target.value.replace(/\D/g, '');

                    if (valor.length > 2) {
                      valor = valor.substring(0, 2) + '.' + valor.substring(2);
                    }

                    if (valor.length > 6) {
                      valor = valor.substring(0, 6) + '.' + valor.substring(6);
                    }

                    if (valor.length > 10) {
                      valor = valor.substring(0, 10) + '-' + valor.substring(10, 11);
                    }
                    

                    setRG(valor);
                    setIsError((prevStatet) => (
                      prevStatet.filter((error) => error.name !== 'rg')
                    ))
                  }}
                  type='text'
                  value={RG}
                  isError={verifyError('rg')}
                />
              </div>
              <div className='mt-4'>
                <svg height="1" width="100%">
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="black" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className='w-full'>
              <h2 className='text-black text-[22px] font-semibold mb-2'>Endereços</h2>
              {
                adresses.map((adress, index) => (
                  <AdressesModal
                    index={index}
                    count={adresses.length}
                    adresses={adress}
                    setIsError={setIsError}
                    verifyError={verifyError}
                    setAdresses={setAdresses}
                    isUpdate={isUpdate}
                  />
                ))
              }
            </div>
            <div className='w-full'>
              <h2 className='text-black text-[22px] font-semibold mb-2'>Contatos</h2>
              {
                contacts.map((contact, index) => (
                  <ContactsModal
                    index={index}
                    count={contacts.length}
                    contacts={contact}
                    setIsError={setIsError}
                    verifyError={verifyError}
                    setContacts={setContacts}
                    isUpdate={isUpdate}
                  />
                ))
              }
            </div>
          </div>
          <div className="flex flex-col w-[100%] items-start">
            <Button type='button' className='mt-4 bg-black text-white w-1/6 hover:bg-slate-700 max-sm:w-2/3 max-sm:text-[12px]' title='Salvar' onClick={onSubmit} />
          </div>
        </form>
      </div>
    </main>
  )
}
