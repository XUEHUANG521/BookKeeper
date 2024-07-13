import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const  [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", { email, password, username });
      sessionStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="username"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
