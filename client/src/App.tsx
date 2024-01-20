import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import CreateUser from './pages/CreateUser'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/signUp' element={<SignUp />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/create/user' element={<CreateUser />}/>
    </Routes>
  )
}

export default App
