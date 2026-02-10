import React from 'react';
import { useLoaderData } from 'react-router';

const UserDetails = () => {
    const user = useLoaderData()
    console.log(user)
  return (
    <div>
      i am users id wise details
    </div>
  );
};

export default UserDetails;