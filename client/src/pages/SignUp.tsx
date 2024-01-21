import { useState } from 'react';
import Logo from '../assets/signUp.tsx'
import InputField from '../components/InputField.tsx';
import Button from '../components/Button.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Upload from '../components/Upload.tsx';

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setname] = useState('')
  const [telephone, settelephone] = useState('')
  const [profileImage, setProfileImage] = useState({
    url: "",
    name: "",
  })

  const [isError, setisError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async () => {
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
        setisError(error.response?.data.name);
      }
    }
  }


  return (
    <main className="w-full h-[100dvh] flex">
      <div className="bg-red w-full flex flex-col justify-center items-center gap-3">
        <h1 className='font-bold text-2xl'>Cria uma conta</h1>
        <InputField id='name' placeholder='Digite seu nome' type='text' value={name} onChange={(event) => setname(event.target.value)} label='Nome' isError={isError === 'name' ? true : false} errorMessage='Nome invalido' />
        <InputField id='email' placeholder='Digite seu email' type='text' value={email} onChange={(event) => setEmail(event.target.value)} label='Email' isError={isError === 'email' ? true : false} errorMessage='Email invalido'  />
        <InputField id='senha' placeholder='Digite sua senha' type='password' value={password} onChange={(event) => setPassword(event.target.value)} label='Senha' isError={isError === 'password' ? true : false} errorMessage='Senha invalida'  />
        <InputField id='telephone' placeholder='Digite seu telefone' type='text' value={telephone} onChange={(event) => settelephone(event.target.value)} label='Telefone' isError={isError === 'telephone' ? true : false} errorMessage='Telefone invalido'  />
        <Upload label="Imagem de Perfil" isError={isError === 'profileImage' ? true : false} setProfileImage={setProfileImage} profileImage={profileImage} errorMessage='Imagem invalido'  />
        <Button title='Cadastrar' onClick={onSubmit} className='bg-white text-[20px]' />
        <a href="/" className="font-semibold text-white not-italic hover:text-gray-300">
          Já tem conta? Iniciar sessão
        </a>
      </div>
      <div className="bg-white w-full justify-center items-center flex">
        <Logo className='w-3/4' />
      </div>
    </main>
  );
}
