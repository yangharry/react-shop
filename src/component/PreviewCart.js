import { useDispatch, useSelector } from 'react-redux';
import trashIamge from '../assets/trash-2.png';
import { removeFromCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

function PreviewCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const totalPrice = Math.floor(cart.reduce((acc, cur) => (acc += cur.price * cur.amount), 0) * 100) / 100;

  return (
    <div className="w-96 absolute text-xs shadow-md right-5 top-6 bg-white">
      {cart.map((product) => (
        <div className="w-full flex border-b p-1" key={product.id}>
          <div className="p-2">
            <img src={product.image} alt={product.image} width={70} />
          </div>
          <div className="w-full p-2">
            <div className="flex items-center mb-2 justify-between">
              <div className="text-gray-300 font-bold">{product.category}</div>
              <div>
                {' '}
                <img
                  className="cursor-pointer"
                  src={trashIamge}
                  alt={trashIamge}
                  width={20}
                  onClick={() => dispatch(removeFromCart(product.id))}
                />
              </div>
            </div>
            <div className="font-extrabold mb-2">{product.title}</div>
            <div className="font-bold">
              {product.price}x{product.amount}=${product.price * product.amount}
            </div>
          </div>
        </div>
      ))}
      <div className="border-b font-extrabold text-xl p-3 text-right">합계:${totalPrice}</div>
      <div className="p-3 text-center text-sm font-bold cursor-pointer" onClick={() => navigate('/react-shop/cart')}>
        장바구니로 이동
      </div>
    </div>
  );
}

export default PreviewCart;
