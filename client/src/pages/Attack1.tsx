import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaRegUser, FaLock, FaUniversity } from "react-icons/fa";
import AccountDetails from "./AccountDetails";

interface User {
  username: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  branch: {
    branchName: string;
    branchCode: string;
    address: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  transactions: {
    transactionId: string;
    date: string;
    description: string;
    type: string;
    amount: number;
  }[];
}

const Attack1 = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const querySessionId = window.location.search.split("sessionId=")[1];
    if (querySessionId) {
      localStorage.setItem("sessionId", querySessionId);
    }

    axios
      .post("http://localhost:5000/auth/check-session", {
        sessionId: localStorage.getItem("sessionId") || querySessionId,
      })
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
      });
  }, []);

  const login = () => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 34);
    }
    axios
      .post("http://localhost:5000/auth/login", {
        username,
        password,
        sessionId,
      })
      .then((res) => {
        localStorage.setItem("sessionId", res.data.sessionId);
        toast.success("Logged in successfully");
        setLoggedIn(true);
      })
      .catch((err) => {
        toast.error("Invalid credentials");
        console.log(err);
      });
  };

  if (!loggedIn)
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-800 text-white p-4">
          <div className="max-w-6xl mx-auto flex items-center">
            <FaUniversity className="text-3xl mr-2" />
            <h1 className="text-2xl font-semibold">Maharashtra Masti Bank</h1>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Login to Your Account
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <FaRegUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={login}
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Login
              </button>
            </div>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </a>
            </div>
          </div>
        </main>

        <footer className="bg-gray-200 p-4 text-center text-sm text-gray-600">
          <p>&copy; 2024 Maharashtra Masti Bank. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-600 hover:underline mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-600 hover:underline mx-2">
              Terms of Service
            </a>
            <a href="#" className="text-blue-600 hover:underline mx-2">
              Contact Us
            </a>
          </div>
        </footer>
      </div>
    );
 
  return <AccountDetails user={user} setSignedIn={setLoggedIn} />;
};

export default Attack1;
