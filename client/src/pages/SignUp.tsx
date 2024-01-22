import { FormEvent, MouseEvent, useState } from 'react';
import Logo from '../assets/signUp.tsx'
import InputField from '../components/InputField.tsx';
import Button from '../components/Button.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Upload from '../components/Upload.tsx';

type Error = {
  message: string
  name: string
}

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setname] = useState('')
  const [telephone, settelephone] = useState('')
  const [profileImage, setProfileImage] = useState({
    url: "",
    name: "",
  })

  const [isError, setisError] = useState<Error>()
  const navigate = useNavigate()

  const onSubmit = async (e: FormEvent<HTMLInputElement> | undefined | MouseEvent<HTMLElement>) => {
    e?.preventDefault()
    try {
      await axios.post('http://localhost:3001/create', {
        email,
        password,
        name,
        telephone,
        profileImage: profileImage.url
      })
      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors) {
          if (error.response?.data.errors.length > 0) { 
            setisError(error.response?.data.errors[0]);
          } 
        } else {
          setisError(error.response?.data);
        }
      }
    }
  }


  return (
    <main className="w-full h-[100dvh] flex">
      <form className="bg-red w-full flex flex-col justify-center items-center gap-3">
        <h1 className='font-bold text-2xl'>Criar uma conta</h1>
        <InputField
          id='name'
          placeholder='Digite seu nome'
          type='text'
          value={name}
          className='max-lg:w-11/12'
          onChange={(event) => setname(event.target.value)}
          label='Nome'
          isError={isError?.name === 'name' ? isError.message : ''}
        />
        <InputField
          id='email'
          placeholder='Digite seu email'
          type='text'
          value={email}
          className='max-lg:w-11/12'
          onChange={(event) => setEmail(event.target.value)}
          label='Email'
          isError={isError?.name === 'email' ? isError.message : ''}
        />
        <InputField
          id='senha'
          placeholder='Digite sua senha'
          type='password'
          value={password}
          className='max-lg:w-11/12'
          onChange={(event) => setPassword(event.target.value)}
          label='Senha'
          isError={isError?.name === 'password' ? isError.message : ''}
        />
        <InputField
          id='telephone'
          placeholder='Digite seu telefone'
          type='text'
          value={telephone}
          className='max-lg:w-11/12'
          onChange={(event) => settelephone(event.target.value)}
          label='Telefone'
          isError={isError?.name === 'telephone' ? isError.message : ''}
        />
        <Upload
          label="Imagem de Perfil"
          isError={isError?.name === 'profileImage' ? true : false}
          setProfileImage={setProfileImage}
          profileImage={profileImage}
        />
        <Button
          title='Cadastrar'
          type='submit'
          onClick={onSubmit}
          className='bg-white text-[20px]'
        />
        <a href="/" className="font-semibold text-white not-italic hover:text-gray-300">
          Já tem conta? Iniciar sessão
        </a>
      </form>
      <div className="bg-white w-full justify-center items-center flex max-md:hidden">
        <Logo className='w-3/4' />
      </div>
    </main>
  );
}
