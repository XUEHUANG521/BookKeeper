import React, { useState } from 'react';
import Navbar from '../NavBar';
import UserManagement from './UserManagement';
import UserProfile from './UserProfile';
import BillManagement from './BillManagement';
import Reports from './Report'; 

const sections = [
	{ id: 'user-management', label: 'User Management', component: <UserManagement /> },
	{ id: 'bill-management', label: 'Bill Management', component: <BillManagement /> },
	{ id: 'reports', label: 'Reports', component: <Reports /> },
	{ id: 'user-profile', label: 'User Profile', component: <UserProfile /> },
];

const Dashboard = () => {
	const [activeSection, setActiveSection] = useState('bill-management');
	const renderSection = () => {
		const section = sections.find(sec => sec.id === activeSection);
		return section ? section.component : <BillManagement />;
	};
	return (
	<div className="flex h-screen">
		<aside className="w-64 bg-gray-800 text-white">
			<nav className="mt-20">
				<ul>
					{sections.map(section => (
						<li
							key={section.id}
							className={`py-8 px-8 mt-2 mb-16 cursor-pointer ${
								activeSection === section.id
									? 'bg-gray-700 text-white'
									: 'hover:bg-gray-700 hover:text-white'
							}`}
							onClick={() => setActiveSection(section.id)}
						>
							{section.label}
						</li>
					))}
				</ul>
			</nav>
		</aside>
		<div className="flex-1 flex flex-col">
			<Navbar />
		<main className="main-content flex-1 p-10 bg-gray-100">
			{renderSection()}
		</main>
		</div>
	</div>
  );
};

export default Dashboard;
