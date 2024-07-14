import useAuth from '@/app/utils/hooks/useAuth';
import React from 'react';

const UserProfile = () => {
	const username = useAuth()

  if (!username) return null;

  return (
	<div>
		<h1 className="text-2xl font-bold mb-4">User Profile</h1>
		<p><strong>Username:</strong> {username}</p>
	</div>
	);
};

export default UserProfile;
