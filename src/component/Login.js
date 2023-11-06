import { useEffect, useState } from 'react';
import { signIn, logIn } from '../api/api-util';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isStauts, setIsStauts] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStauts(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isStauts]);

  function subminHandler(e) {
    e.preventDefault();

    if (isSignIn) {
      signIn(email, password)
        .then(() => {
          setIsStauts('success');
          setIsSignIn(false);
        })
        .catch(() => {
          setIsStauts('signinError');
        });
    } else {
      logIn(email, password)
        .then((res) => {
          dispatch(setUser(res.user.uid));
          navigate('/react-shop');
        })
        .catch(() => {
          setIsStauts('loginError');
        });
    }
  }

  return (
    <div className="w-full p-20">
      <div className="p-5 w-96 text-sm shadow-lg shadow-black rounded-sm m-auto">
        <div className="w-full text-center text-2xl font-bold pb-4">{isSignIn ? '회원가입' : '로그인'}</div>
        <form onSubmit={subminHandler}>
          <div>
            <input
              type="email"
              className="w-full p-2 border-2 rounded mb-2 border-gray-500 placeholder:text-gray-500"
              placeholder="E-mail"
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="w-full p-2 border-2 rounded mb-2  border-gray-500  placeholder:text-gray-500"
              placeholder="Password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="w-full bg-gray-500 text-white p-3">
            {isSignIn ? '등록' : '로그인'}
          </button>
        </form>
        <div className="p-2 w-full flex items-center justify-center">
          <span className="font-bold">{isSignIn ? '이미 계정이 있습니까?' : '계정이 없습니까?'}</span>
          <span
            className="text-gray-500 cursor-pointer"
            onClick={() => {
              setIsSignIn(!isSignIn);
            }}
          >
            {isSignIn ? '로그인하기' : '가입하기'}
          </span>
        </div>
      </div>
      {isStauts && (
        <div className="py-10 w-full flex items-center justify-center text-white">
          <div
            className={`${
              isStauts === 'success' ? 'bg-green-500' : isStauts === 'signinError' ? 'bg-yellow-500' : 'bg-red-500'
            } rounded border w-full text-center py-4`}
          >
            {isStauts === 'success'
              ? '가입완료! 로그인하세요!'
              : isStauts === 'signinError'
              ? '이미 사용중인 이메일입니다.'
              : '이메일 또는 비밀번호가 올바르지 않습니다.'}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
