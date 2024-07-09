// components/Navbar.js
import Link from 'next/link';


const Navbar = () => {
	return (
		<nav className='flex flex-row justify-between text-white px-4 py-2 bg-gray-500 border-b-2'>
			<div>
				<Link href='/'>Home</Link>
			</div>
			<div>
				<Link href='/about'>About</Link>
			</div>
		</nav>
	);
};

export default Navbar;
