'use client'
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import useGsapAnimations from '../hooks/navbar-animation';


export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useGsapAnimations();

  return (
    <div className="bg-black text-white">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <img id="animated-logo" src="/next.svg" alt="Logo" className="invert" />
            <span id="animated-name" className=" text-xl tracking-wide font-medium font-inter" >AISaaS</span>
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="hidden gap-5 mr-5 lg:flex space-x-4 font-semibold">
            <Link id="animated-btn" href="#feature1" className="hover:text-purple-500 tracking-wide font-medium font-inter transition-colors duration-300">Home</Link>
            <Link id="animated-btn" href="#feature2" className="hover:text-purple-500 tracking-wide font-medium font-inter transition-colors duration-300">Features</Link>
            <Link id="animated-btn" href="#feature3" className="hover:text-purple-500 tracking-wide font-medium font-inter transition-colors duration-300">Contact</Link>
            <Link id="animated-btn" href="#feature4" className="hover:text-purple-500 tracking-wide font-medium font-inter transition-colors duration-300">About</Link>
          </div>
          {!session ? (
            <div className="hidden lg:flex space-x-4"> 
              <Link id='animated-auth-btn' href="/login" className="bg-white text-black tracking-normal font-sans font-semibold px-3 py-2 rounded-lg hover:bg-purple-500 hover:text-white transition-colors duration-300">Login</Link>
              <Link id = 'animated-auth-btn' href="/signup" className="bg-white text-black px-3 py-2 tracking-normal font-sans font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-colors duration-300">Sign Up</Link>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4 items-center">
              <span>{session.user?.email}</span>
              <button onClick={() => signOut()} className="bg-white text-black font-inter font-bold px-4 py-2 rounded hover:bg-purple-500 hover:text-white transition-colors duration-300">Logout</button>
            </div>
          )}
          <button onClick={toggleMenu} className="block lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 p-4">
          <Link id="animated-btn" href="#feature1" className="hover:text-purple-500 transition-colors duration-300">Home</Link>
          <Link id="animated-btn" href="#feature2" className="hover:text-purple-500 transition-colors duration-300">Features</Link>
          <Link id="animated-btn" href="#feature3" className="hover:text-purple-500 transition-colors duration-300">Contact</Link>
          <Link id="animated-btn" href="#feature4" className="hover:text-purple-500 transition-colors duration-300">About</Link>
          {!session ? (
            <>
              <Link id = 'animated-auth-btn' href="/login" className="bg-white text-black px-3 py-2 font-sans font-semibold rounded-lg  hover:bg-purple-500 hover:text-white transition-colors duration-300">Login</Link>
              <Link id = 'animated-auth-btn' href="/signup" className="bg-white text-black px-3 py-2 font-sans font-semibold rounded-lg  hover:bg-purple-500 hover:text-white transition-colors duration-300">Sign Up</Link>
            </>
          ) : (
            <>
              <span>{session.user?.email}</span>
              <button onClick={() => signOut()} className="bg-white text-black font-semibold font-sans px-4 py-2 rounded hover:bg-purple-500 hover:text-white transition-colors duration-300">Logout</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
