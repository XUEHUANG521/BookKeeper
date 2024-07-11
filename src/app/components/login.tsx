import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			router.push("/");
		}
	}, [router]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		if (data.token) {
			localStorage.setItem("token", data.token);
			router.push("/");
		}
	};		
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>		
				</label>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};
export default LoginPage;