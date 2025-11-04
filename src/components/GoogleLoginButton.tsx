import { useEffect, useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userState } from "../redux/slices/UserLoginSlice";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

const GoogleLoginButton = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  // 🔹 Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(userState());
      localStorage.setItem("isLogin", JSON.stringify(true));
    } else {
      localStorage.removeItem("user");
      localStorage.setItem("isLogin", JSON.stringify(false));
      dispatch(userState());
    }
  }, [user]);

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center">
      {!user ? (
        <button
          onClick={() => handleLogin()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="relative">
          {/* Profile Row */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <img
              src={user.picture}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <span className="text-gray-800 dark:text-gray-100 font-medium md:block hidden">
              {user.name}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                menuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Logout Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 w-20 md:w-40 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-10">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 sm:py-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-800 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
