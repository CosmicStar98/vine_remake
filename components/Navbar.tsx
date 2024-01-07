import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/vinelogo.png';
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div>
      <header>
        <div className="nav-buttons">
          <span>
            <Link href="/">
              <a className="active">
                <button className="clear icon index">
                  <div className="icon-index"></div>
                </button>
              </a>
            </Link>
          </span>
          <span>
            <Link href="/popular-now">
              <a>
                <button className="clear icon popular-now">
                  <div className="icon-popular_now"></div>
                </button>
              </a>
            </Link>
          </span>
        </div>
        <div className="global-search" style={{ right: "162px" }}>
          <div>
            <form className="search" onSubmit={handleSearch}>
              <input
                placeholder="Search"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="submit" className="clear icon-search"></button>
              <button type="submit" className="clear icon-carrow"></button>
            </form>
          </div>
        </div>
        <div>
          <Link href="/">
            <a className="active">
              <div className="logo">
                <div className="icon-vine_logo"></div>
              </div>
            </a>
          </Link>
        </div>
      </header>
      {userProfile ? (
        <>
          <button id="upload_btn" className="login-link small" style={{ right: "77px", marginTop: "0px" }}>
            <div href="/upload">Upload</div>
          </button>
          {userProfile['image'] && (
            <button className="current-user small" style={{ right: "15px", marginTop: "-9px" }} onClick={() => {
				googleLogout()
				removeUser()
			}}>
              <Link href="/">
                <Image
                  width={30}
                  height={30}
                  src={userProfile['image']}
                  alt='Profile (logout)'
				  title='Profile (logout)'
				  style={{borderRadius: "15px"}}
                />
              </Link>
            </button>
          )}
        </>
      ) : (
        <div className="login-link small" style={{ left: "100px", top: "0px" }}><GoogleLogin
          onSuccess={(response) => createOrGetUser(response, addUser)}
          onError={() => console.log('Error')}
        /></div>
      )}
    </div>
  );
};

export default Navbar;