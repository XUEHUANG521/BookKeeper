import { useRef, useState, useCallback, useEffect } from 'react';
import useAuth from '../utils/hooks/useAuth';

const Navbar = () => {
  const username = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  }, [dropdownRef]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleLogout = () => {
	sessionStorage.removeItem('token');
    alert('Logged out');
  };

  if (!username) return null;

  return (
    <nav className='flex justify-end text-white px-2 py-2 bg-gray-500 border-b-2'>
      <div className='relative' ref={dropdownRef}>
        <div className='text-2xl px-2 py-2'>
          <span>{username}</span>
          <button onClick={toggleDropdown} className="ml-4">Settings</button>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 transform transition-transform duration-300 ease-out origin-top overflow-hidden">
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Option 1</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Option 2</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleLogout}>Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
