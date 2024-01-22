import InputField from './InputField';
import Button from './Button';
import SelectField from './SelectField';

type Contact = {
  typeContact: string,
  name: string,
  contact: string,
}

type ErrorMessage = {
  message: string;
  name: string;
}

type ContactsModalProps = {
  verifyError: (x: string) => string | undefined,
  index: number
  contacts: Contact
  onClick?: () => void,
  count: number,
  setContacts: (value: Contact[] | ((prevContacts: Contact[]) => Contact[])) => void
  setIsError: (value: ErrorMessage[] | ((prevAdresses: ErrorMessage[]) => ErrorMessage[])) => void,
  isUpdate: boolean
}

export default function ContactsModal({ 
  verifyError, 
  index, 
  contacts, 
  count,
  setContacts,
  setIsError,
  isUpdate
}: ContactsModalProps) {

  const addContact = () => {
    setContacts((prevContacts: Contact[]) => [
      ...prevContacts,
      {
        typeContact: '',
        name: '',
        contact: '',
      }
    ]);
  };

  const removeContacts = (index: number) => {
    setContacts((prevContacts) => {
      const novosAdresses = [...prevContacts];
      novosAdresses.splice(index, 1);
      return novosAdresses;
    });
  };

  const handleContacts = (index: number, campo: keyof Contact, valor: string) => {
    setContacts((prevContacts) => {
      const novosAdresses = [...prevContacts];
      novosAdresses[index][campo] = valor;
      return novosAdresses;
    });
  };

  return (
    <div  key={`${index+count}-contact`}>
      <div className='flex flex-wrap gap-x-2 gap-y-2'>
        <InputField 
        disabled={index + 1 !== count && !isUpdate} 
        labelClassName='text-black' 
        label="Nome" 
        placeholder="Digite seu nome" 
        className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' 
        id='name' 
        onChange={(e) => {
          handleContacts(index, 'name', e.target.value); 
          setIsError((prevStatet) => (
          prevStatet.filter((error) => error.name !== 'nameContact')
        ))}} 
        type='text' 
        value={contacts.name} 
        isError={verifyError('nameContact')} 
        />
        <InputField 
        disabled={index + 1 !== count && !isUpdate}  
        labelClassName='text-black' 
        label="Contato" 
        placeholder="Digite seu email ou numero" 
        className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full'
        id='type' 
        onChange={(e) => {
          handleContacts(index, 'contact', e.target.value); 
          setIsError((prevStatet) => (
          prevStatet.filter((error) => error.name !== 'contact')
        ))}} 
        type='text' 
        value={contacts.contact} 
        isError={verifyError('contact')} 
        />
        <SelectField 
        disabled={index + 1 !== count && !isUpdate}  
        labelClassName='text-black' 
        label="Tipo de Contato" 
        placeholder="Digite o tipo de contato" 
        className='xl:w-[32.9%] sm:w-[49%] max-sm:w-full' 
        id='type' 
        onChange={(e) => {
          handleContacts(index, 'typeContact', e.target.value); 
          setIsError((prevStatet) => (
          prevStatet.filter((error) => error.name !== 'typeContact')
        ))}} 
        type='text' 
        value={contacts.typeContact} 
        errorMessage='Tipo invalido' 
        isError={verifyError('typeContact') === 'Type contact is required' ? true : false} 
        data={[
        {
          id: 1,
          nome: 'Telefone'
        },
        {
          id: 2,
          nome: 'Celular'
        },
        {
          id: 3,
          nome: 'Email'
        },]}
        />
      </div>
      {
        index + 1 === count ? (
          <Button 
          type='button' 
          title='Adicionar novo contato' 
          className='flex bg-black text-white w-1/6 text-[14px] justify-center hover:bg-slate-700 max-sm:w-2/3 max-sm:text-[12px]'
          onClick={addContact}
          />
        ) : (
          <div className='flex justify-end'>
             <Button 
             type='button' 
             title='Remover Contato' 
             className='flex bg-black text-white w-1/6 text-[14px] justify-center hover:bg-slate-700 max-sm:w-2/3 max-sm:text-[12px]' 
             onClick={() => removeContacts(index)}
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