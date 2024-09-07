
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import MainLayout from './layout/MainLayout'


function App() {
  return (
    <>
      <Routes>
     <Route path='/' element={<MainLayout><Home></Home></MainLayout>}></Route>
     <Route path='/about/:slug' element={<MainLayout><About></About></MainLayout>}></Route>
     </Routes>
    </>
  )
}

export default App