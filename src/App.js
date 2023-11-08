import { Suspense } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { Route, Routes } from 'react-router-dom';
import Products from './component/Products';
import Login from './component/Login';
import Detail from './component/Detail';
import Cart from './component/Cart';

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <Suspense fallback={<div>...loading</div>}>
        <Routes>
          <Route path="*" element={<div>404 page</div>}></Route>
          <Route path="/react-shop" element={<Products></Products>}></Route>
          <Route path="/react-shop/login" element={<Login></Login>}></Route>
          <Route path="/react-shop/detail/:id" element={<Detail></Detail>}></Route>
          <Route path="/react-shop/cart" element={<Cart></Cart>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
