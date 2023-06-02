'use client';

import { UserMenuButtonProps } from '@/lib/types/types';
import Image from 'next/image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signIn, signOut } from 'next-auth/react';
import profilePicture from '@/assets/profile_placeholder.png';

const UserMenuButton = ({ session }: UserMenuButtonProps) => {
  const user = session?.user;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {user ? 
        <Image 
        src={user?.image || 'https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_640.png'} // profilePicture
        alt="profile Picture"
        title='profile Picture'
        width={40}
        height={40}
        className="rounded-full w-10"
        /> : <AccountCircleIcon sx={{width: 50, height: 50, marginLeft: "1rem"}} />}
      </label>
      <ul tabIndex={0} className="p-2 mt-3 shadow menu-md menu dropdown-content bg-base-200 rounded-box w-52 z-30">
        <li>
          {user ? 
          <button onClick={()=> signOut({callbackUrl: "/"})} className="btn btn-ghost btn-sm rounded-btn">Sign Out </button> :
          <button onClick={()=> signIn()} className="btn btn-ghost btn-sm rounded-btn">Sign In </button>
          }
        </li>
      </ul>
    </div>
  );
};

export default UserMenuButton;

{/* <a href="/api/auth/signout">Sign out</a> */}