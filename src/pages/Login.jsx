import { useEffect, useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import useUserStore from '../features/userStore';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ nim: '', password: '' });
  const { isLoading, token, login, validateToken } = useUserStore((state) => state);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const success = await login(loginForm);
    if (success) navigate('/');
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        const isValid = await validateToken(token);
        if (isValid) navigate('/');
      }
    };
    verifyToken();
  }, [token, validateToken, navigate]);

  return (
    <section className="flex items-center justify-center h-screen p-4 bg-gradient-to-r from-blue-500 to-purple-600">
      <form onSubmit={handleLoginSubmit} className="w-full max-w-sm p-8 bg-white shadow-lg rounded-xl">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Login Absensi</h1>

        {/* NIM Input */}
        <div className="mb-4">
          <label htmlFor="nim" className="block mb-1 text-sm font-medium text-gray-700">
            NIM
          </label>
          <input
            type="text"
            id="nim"
            name="nim"
            value={loginForm.nim}
            onChange={handleInputChange}
            placeholder="21.11.4110"
            className="w-full px-4 py-2 text-gray-700 transition border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Password Input with Toggle */}
        <div className="relative mb-5">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={loginForm.password}
            onChange={handleInputChange}
            placeholder="********"
            className="w-full px-4 py-2 text-gray-700 transition border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-3 top-5 flex items-center">
            {showPassword ? <IoEyeOutline className="w-5 h-5 text-slate-600 hover:text-slate-900" /> : <IoEyeOffOutline className="w-5 h-5 text-slate-600 hover:text-slate-900" />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2.5 text-white font-semibold rounded-lg transition focus:ring-2 focus:ring-blue-300 focus:outline-none ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </section>
  );
}

export default Login;
