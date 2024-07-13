// components/Navbar.js
import useAuth from '../utils/hooks/useAuth';


const Navbar = () => {
	const username = useAuth();
	return (
		<nav className='flex justify-end text-white px-2 py-2 bg-gray-500 border-b-2'>
			<div className='text-2xl px-2 py-2'><span>{username}</span></div>
		</nav>
	);
};

export default Navbar;
