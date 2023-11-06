import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Products() {
  const categorys = [
    { title: '모두', name: null },
    { title: '전자기기', name: 'electronics' },
    { title: '쥬얼리', name: 'jewelery' },
    { title: '남성의류', name: "men's clothing" },
    { title: '여성의류', name: "women's clothing" },
  ];
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategroy] = useState('');
  const navigate = useNavigate();

  function categoryHandler(category) {
    setSelectedCategroy(category);
  }

  function filterHandler(category) {
    if (!category) {
      setFilteredProducts(products);
    } else {
      let filteredProducts = products.filter((product) => product.category === category);
      setFilteredProducts(filteredProducts);
    }
  }

  return (
    <div className="m-auto w-4/5 min-w-max">
      <div className="text-2xl font-bold p-4 text-center">Products</div>
      <div className="p-4 flex justify-center items-center">
        {categorys.map((category, i) => {
          return (
            <button
              key={i}
              className={`${
                category.name === selectedCategory ? 'bg-gray-500 text-white' : 'none'
              } border-gray-500 border w-40 h-12 rounded mr-4 hover:bg-gray-500 hover:text-white`}
              onClick={() => {
                categoryHandler(category.name);
                filterHandler(category.name);
              }}
            >
              {category.title}
            </button>
          );
        })}
      </div>
      <div className="py-2 text-gray-500">Showing: {filteredProducts.length} items</div>
      <div className="grid grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} className="p-4 flex flex-col justify-center items-center rounded border-4">
              <img
                className="p-2 w-48 h-48 object-fill cursor-pointer"
                src={product.image}
                alt={product.description}
                onClick={() => navigate(`/react-shop/detail/${product.id}`)}
              />
              <div className="p-2 w-32 h-8 overflow-hidden text-ellipsis whitespace-nowrap text-center font-bold">
                {product.title}
              </div>
              <div className="p-2 flex w-full justify-between items-center">
                <button
                  className="flex font-bold border-gray-500 text-gray-500 border text-sm p-2 px-6 rounded mr-4 items-center hover:bg-gray-500 hover:text-white"
                  onClick={() => navigate(`/react-shop/detail/${product.id}`)}
                >
                  장바구니에 담기
                </button>
                <div className="font-bold text-sm">${product.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
