import React, { useState } from 'react';
import SectionHeading from '../components/section-heading';
import TestimonialCard from '../components/testimonal-card';
import Image from 'next/image';


type Props = {};

export default function Testimonials({ }: Props) {
  const testimonialsData = [
    {
      author: 'Emily H. - College Senior',
      text: '“GeniusDraft is a game-changer! It mirrors my writing style flawlessly, saving me hours on assignments. It\'s like having a personal writing assistant dedicated to my success.”',
      image: '/assets/eh.jpg'
    },
    {
      author: 'John M. - Graduate Student',
      text: '"As a graduate student, the demands on my writing are high. GeniusDraft has become an invaluable tool in my arsenal. It not only saves time but enhances the quality of my work. It\'s a must- have for anyone serious about academic writing."',
      image: '/assets/jm.jpg'
    },
    {
      author: 'Samantha R. - High School Junior',
      text: '"I\'m so glad I found GeniusDraft! It\'s been a lifesaver. I\'m able to write better papers in less time. I\'ve also learned a lot about writing from using it. I highly recommended it to all my friends."',
      image: '/assets/sr.jpg'
    },
    {
      author: 'David A. - Aspiring Author',
      text: '"I\'m a writer and have been using GeniusDraft to help me write my first novel. It\'s been a tremendous help. I\'ve been able to write more and better than ever before. I\'m so glad I found it."',
      image: '/assets/da.jpg'
    }
    // Add more testimonials as needed
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [transitioning, setTransitioning] = useState('n');

  function handleNextCard() {
    if (transitioning == 'n') {
      setTransitioning('r');
      console.log(transitioning)

      setTimeout(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
        setTransitioning('n');
      }, 300);
    }
  }

  function handlePrevCard() {
    if (transitioning == 'n') {
      setTransitioning('l');
      setTimeout(() => {
        console.log(transitioning)
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
        setTransitioning('n');
      }, 300);
    }
  }

  return (
    <div className='flex justify-center items-center mt-8 relative border-box py-20'>
      <div className='w-[1200px] flex justify-between mt-8'>
        <div className='flex flex-col space-y-4 p-4 w-1/2'>
          <SectionHeading>TESTIMONIALS</SectionHeading>
          <h2 className='text-4xl font-bold w-full'>What Students Are Saying About GeniusDraft</h2>
          <p className='font-extralight'>Discover how GeniusDraft has transformed the writing experience for people just like you.</p>
          <div className='flex gap-2 z-30'>
            <button
              onClick={handlePrevCard}
              className='w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-2xl flex justify-center items-center text-black transition-transform ease-in-out duration-300 hover:scale-110'
            >
              &lt;
            </button>
            <button
              onClick={handleNextCard}
              className='w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-2xl flex justify-center items-center text-black transition-transform ease-in-out duration-300 hover:scale-110'
            >
              &gt;
            </button>
          </div>
        </div>

        <div className='overflow-hidden'>
          <div className={`transition-transform ease-in-out duration-300`} style={{ transform: `translateX(${transitioning == 'l' ? '-110%' : transitioning == 'r' ? '110%' : '0'})` }}>
            <TestimonialCard
              testimonalAuthor={testimonialsData[currentCardIndex]?.author!}
              testimonalText={testimonialsData[currentCardIndex]?.text!}
              testimonalImageSource={testimonialsData[currentCardIndex]?.image!}
            />
          </div>
        </div>
        
      </div>
      <Image src='/assets/grid.png' alt='' width={1600} height={1600} className='absolute w-[1600px] h-[600px] object-cover z-0 blur-smf' />
      <div className='absolute z-20 w-[80vw] h-[100vh] -rotate-45 bg-primary rounded-full blur-3xl right-[40vw] bottom-4 opacity-[1%]'></div>
      <div className='absolute z-20 w-[80vw] h-[100vh] -rotate-45 bg-secondary rounded-full blur-3xl left-[40vw] bottom-[4vh] opacity-[2%]'></div>
    </div>
  );
}
