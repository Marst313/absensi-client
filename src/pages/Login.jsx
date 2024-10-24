import { useEffect, useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import useUserStore from '../features/userStore';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ nim: '', password: '' });
  const { isLoading, token, login, validateToken } = useUserStore((state) => state);

  const navigate = useNavigate();

  // ! Toggle password vissible or not
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // ! For Input NIM & Password
  const handleChangeFormLogin = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  // ! For Submit Button
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const success = await login(loginForm);

    if (success) {
      navigate('/');
    }
  };

  useEffect(() => {
    // ! Check if token exist and valid
    const checkToken = async () => {
      if (token) {
        const isValid = await validateToken(token);
        if (isValid) {
          navigate('/');
        }
      }
    };
    checkToken();
  }, [token, validateToken, navigate]);

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <form className="w-full max-w-sm p-8 bg-white shadow-lg rounded-xl" onSubmit={handleSubmitLogin}>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login Absensi</h1>

        {/* NIM Field */}
        <div className="mb-4">
          <label htmlFor="nim" className="block text-sm font-medium text-gray-700 mb-1">
            NIM
          </label>
          <input
            type="text"
            id="nim"
            name="nim"
            value={loginForm.nim}
            onChange={handleChangeFormLogin}
            placeholder="21.11.4110"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />
        </div>

        {/* Password Field with Toggle Visibility */}
        <div className="mb-5 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={loginForm.password}
            onChange={handleChangeFormLogin}
            placeholder="********"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />
          <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-3 top-5 flex items-center">
            {showPassword ? <IoEyeOutline className="w-5 h-5 text-slate-600 hover:text-slate-900" /> : <IoEyeOffOutline className="w-5 h-5 text-slate-600 hover:text-slate-900" />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2.5 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold rounded-lg transition focus:ring-2 focus:ring-blue-300 focus:outline-none`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </section>
  );
}

export default Login;
