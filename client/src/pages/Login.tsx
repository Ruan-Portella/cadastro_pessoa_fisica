import { useState } from 'react';
import Logo from '../assets/signin.tsx'
import InputField from '../components/InputField.tsx';
import Button from '../components/Button.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password
      })
      localStorage.setItem('token', response.data.token)
      navigate('/home')
    } catch(error) {
      setError(axios.isAxiosError(error))
    }
  }

  return (
    <main className="w-full h-[100dvh] flex">
      <div className="bg-red w-full flex flex-col justify-center items-center gap-3">
        <h1 className='font-bold text-2xl'>Seja Bem-Vindo!</h1>
        <InputField 
        id='email' 
        placeholder='Digite seu email' 
        type='text' 
        value={email} 
        onChange={(event) => setEmail(event.target.value)} 
        label='Email' 
        />
        <InputField 
        id='senha' 
        placeholder='Digite sua senha' 
        type='password' 
        value={password} 
        onChange={(event) => setPassword(event.target.value)} 
        label='Senha' 
        />
        {
          error && <p className='text-red-500'>Email ou senha incorretos</p>
        }
        <Button 
        title='Entrar' 
        onClick={onSubmit} 
        className='bg-white text-[20px]' 
        />
        <a href="/signUp" className="font-semibold text-white not-italic hover:text-gray-300">
            Não tem conta? Se inscreva-se
        </a>
      </div>
      <div className="bg-white w-full justify-center items-center flex">
        <Logo className='w-3/4'/>
      </div>
    </main>
  );
}
