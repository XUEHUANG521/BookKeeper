import { useState } from "react";
import { useRouter } from "next/router";
import axiosInstnace from "../utils/axiosInstance";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstnace.post("/api/auth/register", { email, password, username });
      sessionStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      setError("Registration failed. Username or email already exists.");
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center relative">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="mt-4 text-center">
          <Link className="text-blue-500" href="/auth/login">
          Already have an account? Login here
          </Link>
        </div>
      </form>
    </div>
  );
}
