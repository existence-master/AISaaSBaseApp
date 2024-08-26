// useGsapAnimations.js
import { useEffect } from 'react';
import { gsap } from 'gsap';

const useGsapAnimations = () => {
  useEffect(() => {
    // Animate the H1
    gsap.fromTo(
      '#animated-name',
      { opacity: 0 }, // Initial state
      { 
        opacity: 1, // End state
        duration: 5, // Duration of the animation
        ease: 'power3.out', // Easing function
        delay: 1, // Delay before animation starts
      }
    );

    // Animate the Logo
    gsap.fromTo(
      '#animated-logo',
      { opacity: 0 }, // Initial state
      { 
        opacity: 1, // End state
        duration: 5, // Duration of the animation
        ease: 'power3.out', // Easing function
        delay: 1, // Delay before animation starts
      }
    );


    // Animate the Navigation Links
    gsap.fromTo(
      '#animated-btn',
      { opacity: 0 }, // Initial state
      { 
        opacity: 1, // End state
        duration: 5, // Duration of the animation
        ease: 'power3.out', // Easing function
        delay: 1, // Delay before animation starts
      }
    );

    // Animate the Auth Links
    gsap.fromTo(
      '#animated-auth-btn',
      { opacity: 0 }, // Initial state
      { 
        opacity: 1, // End state
        duration: 5, // Duration of the animation
        ease: 'power3.out', // Easing function
        delay: 1, // Delay before animation starts
      }
    );


  }, []);
};

export default useGsapAnimations;
