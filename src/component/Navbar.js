import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import userIamge from '../assets/user.png';
import loginIamge from '../assets/log-in.png';
import logoutIamge from '../assets/log-out.png';
import cartIamge from '../assets/shopping-cart.png';
import { setCart } from '../store/cartSlice';
import PreviewCart from './PreviewCart';
import { useState } from 'react';

function Navbar() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let user = useSelector((state) => {
    return state.user;
  });
  let cart = useSelector((state) => state.cart);
  const [isHovering, setIsHovering] = useState(false);

  function mouseOverHandler() {
    setIsHovering(true);
  }
  function mouseOutHandler() {
    setIsHovering(false);
  }

  return (
    <div className="p-2 text-2xl w-full shadow-md h-12 flex items-center justify-between min-w-max">
      <div>
        <span className="font-bold pl-4 cursor-pointer" onClick={() => navigate('/react-shop')}>
          Shop
        </span>
      </div>
      <div className="text-2xl flex">
        <div className="pr-3 relative" onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler}>
          {cart.length !== 0 && (
            <div
              className="bg-amber-800 w-5 h-5 absolute rounded-full text-xs flex justify-center items-center text-white right-1 bottom-3 cursor-pointer"
              onClick={() => navigate('/react-shop/cart')}
            >
              {cart.length}
            </div>
          )}
          {cart.length !== 0 && isHovering && <PreviewCart />}
          <img
            className="cursor-pointer "
            src={cartIamge}
            alt={cartIamge}
            onClick={() => navigate('/react-shop/cart')}
          />
        </div>
        <div className="pr-3 cursor-pointer">
          <img src={userIamge} alt={userIamge} />
        </div>
        {user ? (
          <div className="pr-3 cursor-pointer">
            <img
              src={logoutIamge}
              alt={logoutIamge}
              onClick={() => {
                dispatch(setUser(null));
                dispatch(setCart([]));
                navigate('/react-shop', { replace: true });
              }}
            />
          </div>
        ) : (
          <div className="pr-3 cursor-pointer" onClick={() => navigate('/react-shop/login')}>
            <img src={loginIamge} alt={loginIamge} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
