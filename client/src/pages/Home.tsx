import { useEffect, useState } from 'react';
import Header from '../components/Header'
import axios from 'axios'
import OperationCard from '../components/OperationCard';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get('http://localhost:3001/pj', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data);
    }
    getUsers();
  }, [])

  const deleteUser = (async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/user/${id}`, {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
        const newUsers= users.filter((pet: {id: string}) => pet.id !== id)
        setUsers(newUsers)
    } catch {
      console.log('error');
    }
})


  return (
    <main className="w-full flex max-sm:flex-col-reverse min-h-screen">
      <div className={`sm:w-[90px] max-sm:flex max-sm:justify-center`}>
        <Header />
      </div>
      <div className="w-full p-4 max-sm:p-0 max-sm:mb-[80px]">
        <div className="flex flex-col p-4 pl-10 pr-10 gap-6 w-full justify-center items-center rounded-lg 
    border-[#D3E2E5] border-[1px] bg-[white] max-sm:w-full max-sm:px-4 max-sm:py-6 max-sm:border-none">
          <div className="flex flex-col w-[100%] items-start">
            <h1 className="font-semibold text-[24px] text-black font-nunito leading-[32px]">Bem-Vindo ao Sistema de Cadastro!</h1>
          </div>
          <div className="flex flex-col w-full">
            <table className='table-auto text-black'>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Email</th>
                  <th>Operações</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((user: {id: string, name: string, cpf: string, email: string}) => (
                    <tr key={user.id} className='text-center'>
                      <td>{user.name}</td>
                      <td>{user.cpf}</td>
                      <td>{user.email}</td>
                      <td>
                        <OperationCard user={user} deleteUser={deleteUser} />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
