import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../store/cartSlice';

function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector((state) => state.products.find((product) => product.id === Number(id)));
  const cart = useSelector((state) => state.cart.find((product) => product.id === Number(id)));
  return (
    <div className="w-full flex p-10">
      <div className="w-2/5">
        <img src={product.image} alt={product.description} />
      </div>
      <div className="w-3/5 py-10 pl-10">
        <div className="font-bold text-gray-400 text-xl pt-5">{product.category}</div>
        <div className="pt-5 text-3xl">{product.title}</div>
        <div className="pt-10 text-3xl font-bold">$ {product.price}</div>
        <div className="pt-10 text-gray-400 text-sm">{product.description}</div>
        <div className=" pt-14 flex">
          {cart ? (
            <button className="bg-gray-500 text-white text-sm py-4 px-10 mr-10">장바구니에 담긴 상품</button>
          ) : (
            <button
              className="border-gray-500 border text-sm py-4 px-10 mr-10 hover:bg-gray-500 hover:text-white"
              onClick={() => {
                dispatch(
                  addToCart({
                    id: product.id,
                    image: product.image,
                    category: product.category,
                    title: product.title,
                    price: product.price,
                    amount: 1,
                  })
                );
              }}
            >
              장바구니에 담기
            </button>
          )}
          <button className="bg-gray-500 text-white text-sm py-4 px-10" onClick={() => navigate('/react-shop/cart')}>
            장바구니로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
