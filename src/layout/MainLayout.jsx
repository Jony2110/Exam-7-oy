
import Header from '../components/Header'


function MainLayout({children}) {
  return (
    < >
    <Header></Header>
    {
        children
    }
    </>
  )
}

export default MainLayout