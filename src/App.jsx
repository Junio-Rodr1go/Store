import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Wishes from './pages/Wishes'
import Footer from './components/footer'
import { ProductsProvider } from './context/productsContext'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <ProductsProvider>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/sobre' element={<About />}></Route>
            <Route path='/produtos' element={<Products />}></Route>
            <Route path='/carrinho' element={<Wishes />}></Route>
          </Routes>
          <Footer />
        </Router>
      </ProductsProvider>
    </>
  )
}

export default App
