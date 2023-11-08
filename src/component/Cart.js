import { useDispatch, useSelector } from 'react-redux';
import bigCartIamge from '../assets/shopping-bigcart.png';
import { useNavigate } from 'react-router-dom';
import trashIamge from '../assets/trash-2.png';
import { inputAmount, minusAmount, plusAmount, removeFromCart, setCart } from '../store/cartSlice';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const totalPrice = Math.floor(cart.reduce((acc, cur) => (acc += cur.price * cur.amount), 0) * 100) / 100;

  return (
    <div className="w-full p-5 flex items-center justify-center">
      {cart.length !== 0 ? (
        <div className="w-full">
          <div className="text-2xl font-bold text-center">장바구니</div>
          {cart.map((product) => {
            return (
              <div key={product.id} className="p-1 w-full flex border-b-2 border-gray-300">
                <div className="p-2">
                  <img src={product.image} alt={product.image} width={80} />
                </div>
                <div className="w-80 gird grid-cols-1 justify-center items-center p-2 h-full">
                  <div className="pb-1 text-sm font-bold text-gray-400">{product.category}</div>
                  <div className="pb-1 font-bold">{product.title}</div>
                  <div className="pb-1 font-semibold">
                    {product.price} x {product.amount} = $ {product.price * product.amount}
                  </div>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                  <button
                    className={`${
                      product.amount === 1 ? 'text-gray-300 cursor-default' : 'text-black '
                    } border-2 inline-block w-10 h-10 m-1`}
                    onClick={() => dispatch(minusAmount(product.id))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="border-2 inline-block w-10 h-10 m-1 text-center"
                    value={product.amount}
                    onChange={(e) => dispatch(inputAmount({ id: product.id, input: e.target.value }))}
                  />
                  <button
                    className="border-2 inline-block w-10 h-10 m-1"
                    onClick={() => dispatch(plusAmount(product.id))}
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <img
                    className="cursor-pointer"
                    src={trashIamge}
                    alt={trashIamge}
                    width={24}
                    onClick={() => dispatch(removeFromCart(product.id))}
                  />
                </div>
              </div>
            );
          })}
          <div className="w-full p-5 flex justify-end">
            <div className="p-3 bg-orange-100 mr-5 px-10 font-bold rounded">합계: &nbsp;&nbsp; ${totalPrice}</div>
            <button
              className="px-10 py-3 border-2 rounded border-gray-500 hover:bg-gray-500 hover:text-white text-sm"
              onClick={() => {
                if (user) {
                  dispatch(setCart([]));
                } else {
                  navigate('/react-shop/login');
                }
              }}
            >
              계산하기
            </button>
          </div>
        </div>
      ) : (
        <div className="p-10 text-center">
          <div className="p-10">
            <img src={bigCartIamge} alt={bigCartIamge} width={200} height={200} />
          </div>
          <div className="p-2 text-2xl font-bold">Cart가 비어있습니다.</div>
          <div className="p-2">Cart에 상품을 넣어주세요.</div>
          <div className="underline p-2 cursor-pointer" onClick={() => navigate('/react-shop')}>
            계속 쇼핑하기
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
