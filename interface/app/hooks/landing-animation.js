import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const useGsapAnimations = () => {
  useEffect(() => {
    // Create a GSAP timeline for initial animations
    const tl = gsap.timeline();

    // Animate the H1 first
    tl.fromTo(
      '#animated-h1',
      { opacity: 0, y: -50 }, // Initial state
      { 
        opacity: 1, // End state for opacity
        y: 0, // End state for vertical position
        duration: 0.75, // Duration of the animation
        ease: 'power3.out', // Easing function
        delay: 0.25, // Delay before animation starts
      }
    );

    // Animate the Left and Right SVGs together
    tl.fromTo(
      '#left-svg',
      { opacity: 0, x: -50 }, // Initial state: invisible and off-screen to the left
      { 
        opacity: 1, // End state for opacity
        x: 0, // End state for horizontal position
        duration: 0.75, // Duration of the animation
        ease: 'power3.out', // Easing function
      },
      '-=0.5' // Start this animation 0.5 seconds before the H1 animation finishes
    )
    .fromTo(
      '#right-svg',
      { opacity: 0, x: 50 }, // Initial state: invisible and off-screen to the right
      { 
        opacity: 1, // End state for opacity
        x: 0, // End state for horizontal position
        duration: 0.75, // Duration of the animation
        ease: 'power3.out', // Easing function
      },
      '-=0.75' // Start this animation 0.75 seconds before the H1 animation finishes
    );

    // Animate the Hero Description after SVGs
    tl.fromTo(
      '#hero-description',
      { opacity: 0, y: 30 }, // Initial state (starting from below the page)
      { 
        opacity: 1, // End state
        y: 0, // End position
        duration: 0.75, // Duration of the animation
        ease: 'power3.out', // Easing function
        delay: 0.25, // Delay before animation starts
      }
    );

    // Animate the Waitlist Button last
    tl.fromTo(
      '#waitlist-btn',
      { opacity: 0, y: 30 }, // Initial state (starting from below the page)
      { 
        opacity: 1, // End state
        y: 0, // End position
        duration: 0.75, // Duration of the animation
        ease: 'power3.out', // Easing function
        delay: 0.25, // Delay before animation starts
      }
    );

    // Animate problem texts on scroll
    gsap.utils.toArray('#problem-text').forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: -30 }, // Initial state (starting from above the page)
        { 
          opacity: 1, // End state
          y: 0, // End position
          duration: 0.75, // Duration of the animation
          ease: 'power3.out', // Easing function
          scrollTrigger: {
            trigger: element,
            start: 'top 60%', // Trigger when the top of the element hits 80% of the viewport height
            end: 'bottom 40%', // End when the bottom of the element hits 20% of the viewport height
            toggleActions: 'play none none reverse', // Play animation on scroll in, reverse on scroll out
          }
        }
      );
    });


    // Animate "There is an easier way" text on scroll
    gsap.fromTo(
      '#easier-way-text',
      { opacity: 0, scale: 0.8 }, // Initial state (faded and scaled down)
      { 
        opacity: 1, // End state for opacity
        scale: 1, // End state for scale
        duration: 0.75, // Duration of the animation
        ease: 'power3.out', // Easing function
        scrollTrigger: {
          trigger: '#easier-way-text',
          start: 'top 60%', // Trigger when the top of the element hits 80% of the viewport height
          end: 'bottom 40%', // End when the bottom of the element hits 20% of the viewport height
          toggleActions: 'play none none reverse', // Play animation on scroll in, reverse on scroll out
        }
      }
    );

    // Animate "There is an features-h2" text on scroll
    gsap.fromTo(
      '#features-h2',
      { opacity: 0, scale: 0.8 }, // Initial state (faded and scaled down)
      { 
        opacity: 1, // End state for opacity
        scale: 1, // End state for scale
        duration: 0.75, // Duration of the animation
        ease: 'power3.out', // Easing function
        scrollTrigger: {
          trigger: '#features-h2',
          start: 'top 60%', // Trigger when the top of the element hits 80% of the viewport height
          end: 'bottom 40%', // End when the bottom of the element hits 20% of the viewport height
          toggleActions: 'play none none reverse', // Play animation on scroll in, reverse on scroll out
        }
      }
    );
// Animate the feature cards
const featureCards = gsap.utils.toArray('.feature-card');
featureCards.forEach((card, index) => {
  const fromDirection = index % 2 === 0 ? -50 : 50; // Left for even, right for odd index
  gsap.fromTo(
    card,
    { opacity: 0, x: fromDirection }, // Initial state (from left or right)
    { 
      opacity: 1, // End state
      x: 0, // End position
      duration: 1, // Duration of the animation
      ease: 'power3.out', // Easing function
      scrollTrigger: {
        trigger: card,
        start: 'top 70%', // Trigger when the top of the element hits 80% of the viewport height
        end: 'bottom 40%', // End when the bottom of the element hits 20% of the viewport height
        toggleActions: 'play none none reverse', // Play animation on scroll in, reverse on scroll out
      }
    }
  );
});

 // Animation for "Existing Solution" card
 gsap.fromTo(
  '.existing-solution-card',
  { x: -100, opacity: 0 }, // Start off-screen to the left
  {
    x: 0, // Slide in to original position
    opacity: 1, // Fade in
    duration: 2, // Duration of animation
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.existing-solution-card',
      start: 'top 70%', // Animation starts when the section enters the viewport
      end: 'bottom 10%', // End when the bottom of the element hits 20% of the viewport height
      toggleActions: 'play reverse play reverse', // Play the animation on enter, reverse on exit
    },
  }
);

// Animation for "Our Solution" card
gsap.fromTo(
  '.our-solution-card',
  { x: 100, opacity: 0 }, // Start off-screen to the right
  {
    x: 0, // Slide in to original position
    opacity: 1, // Fade in
    duration: 2, // Duration of animation
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.our-solution-card',
      start: 'top 70%', // Animation starts when the section enters the viewport
      end: 'bottom 10%', // End when the bottom of the element hits 20% of the viewport height
      toggleActions: 'play reverse play reverse', // Play the animation on enter, reverse on exit
    },
  }
);

// Animation for the content inside "Existing Solution" card
gsap.fromTo(
  '.existing-solution-card .content-item',
  { opacity: 0, y: 50 }, // Start below and hidden
  {
    opacity: 1, 
    y: 0, 
    duration: 2, // Increased duration
    stagger: 0.3, // Increased stagger delay for each content item
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.existing-solution-card',
      start: 'top 70%',
      end: 'bottom 10%', // End when the bottom of the element hits 20% of the viewport height
      toggleActions: 'play reverse play reverse', // Play the animation on enter, reverse on exit
    },
  }
);

// Animation for the content inside "Our Solution" card
gsap.fromTo(
  '.our-solution-card .content-item',
  { opacity: 0, y: 50 }, // Start below and hidden
  {
    opacity: 1, 
    y: 0, 
    duration: 2, // Increased duration
    stagger: 0.3, // Increased stagger delay for each content item
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.our-solution-card',
      start: 'top 70%',
      end: 'bottom 10%', // End when the bottom of the element hits 20% of the viewport height
      toggleActions: 'play reverse play reverse', // Play the animation on enter, reverse on exit
    },
  }
);

// Animate problem texts on scroll
gsap.utils.toArray('#footer-section').forEach((element, index) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: -30 }, // Initial state (starting from above the page)
    { 
      opacity: 1, // End state
      y: 0, // End position
      duration: 0.75, // Duration of the animation
      ease: 'power3.out', // Easing function
      scrollTrigger: {
        trigger: element,
        start: 'top 80%', // Trigger when the top of the element hits 80% of the viewport height
        end: 'bottom 10%', // End when the bottom of the element hits 20% of the viewport height
        toggleActions: 'play none none reverse', // Play animation on scroll in, reverse on scroll out
      }
    }
  );
});


}, []);
};

export default useGsapAnimations;
