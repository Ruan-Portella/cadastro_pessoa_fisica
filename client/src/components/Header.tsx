import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import ArrowBack from '../assets/ArrowBack';
import PlusIcon from '../assets/PlusIcon';

export default function Header() {
  const [selected, setSelected] = useState('home')
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    profileImage: ''
  });

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get('http://localhost:3001/user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        },)
        const pathname = window.location.pathname;
        pathname === '/create/user' && setSelected('create')
        setUser(response.data)
      } catch {
        navigate('/')
      }
    }
    validateToken()
  }, [navigate])

  const refreshPage = () => {
    navigate('/create/user')
    window.location.reload();
  }

  return (
    <div className='fixed items-center bg-white h-full flex flex-col justify-between p-[20px] max-sm:flex-row max-sm:h-[68px] max-sm:bottom-0 max-sm:z-40 max-sm:p-[10px] max-sm:rounded-[20px] max-sm:w-1/2  max-sm:mb-[10px]'>
      <div className='flex flex-col gap-4 max-sm:flex-row'>
        <div 
        className='cursor-pointer max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-1' 
        onClick={() => {
          setSelected('home');
          if (selected !== 'home') {
            navigate('/home')
          }
        }}>
          <img src={user.profileImage} className={`hover:fill-white h-[48px] w-[48px]`} />
          {
            selected === 'home' && <div className='max-sm:bg-black max-sm:h-[5px] max-sm:w-[5px] max-sm:rounded' />
          }
        </div>
        <div className='cursor-pointer max-sm:flex-col max-sm:items-center max-sm:gap-1 flex items-center justify-center' 
        onClick={() => {window.location.pathname.split('/')[1] === 'user' ? refreshPage() : navigate('/create/user') }}>
          <div className={`hover:bg-slate-800 h-[38px] w-[38px] bg-black rounded-[15px] flex justify-center items-center cursor-pointer  ${selected === 'create' && 'bg-slate-800'}`}>
            <PlusIcon className={`h-[28px] w-[28px]`} color='white' />
          </div>
          {
            selected === 'create' && <div className='max-sm:bg-black max-sm:h-[5px] max-sm:w-[5px] max-sm:rounded' />
          }
        </div>
      </div>
      <div className='max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-1' onClick={() => {
        if (window.location.pathname !== '/home') navigate('/home')
        else navigate('/')
        }}>
        <div
          className={`h-[48px] w-[48px] hover:bg-slate-800 bg-black rounded-[15px] flex justify-center items-center cursor-pointer max-sm:h-[38px] max-sm:w-[38px]`}>
          <ArrowBack />
        </div>
      </div>
    </div>
  )
}
