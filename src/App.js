import { Suspense, useEffect } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { Route, Routes } from 'react-router-dom';
import Products from './component/Products';
import Login from './component/Login';
import Detail from './component/Detail';
import Cart from './component/Cart';
import { useSelector } from 'react-redux';

function App() {
  let cart = useSelector((state) => state.cart);
  let user = useSelector((state) => state.user);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('cart', JSON.stringify(cart));
      sessionStorage.setItem('user', JSON.stringify(user));
    });
  });
  return (
    <div className="w-full">
      <Navbar />
      <Suspense fallback={<div>...loading</div>}>
        <Routes>
          <Route path="*" element={<div>404 page</div>}></Route>
          <Route path="/" element={<Products></Products>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/detail/:id" element={<Detail></Detail>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
