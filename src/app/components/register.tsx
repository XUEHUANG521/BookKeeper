import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
	const router = useRouter();
	const [username, setUsername] = useState("");
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
		console.log(username, email, password);
		const response = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
		});
		const data = await response.json();
		if (data.token) {
			localStorage.setItem("token", data.token);
			router.push("/");
		}
	};		
	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
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
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default RegisterPage;