import React from 'react'
import Button from './button'
import { TiLocationArrow } from 'react-icons/ti'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)
const Hero = () => {
  const [currentIndex, setCurrentIndex] = React.useState(1)
  const [hasClicked, setHasClicked] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [loadedVideos, setLoadedVideos] = React.useState(0)
  const totalVideos = 2
  const nextVideoRef = React.useRef(null)
  const mainVideoRef = React.useRef(null)

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });
  const handleVideoLoaded = () => {
    setLoadedVideos((prev) => prev + 1)
  }

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`

  const handleMiniVideoClick = () => {
    setHasClicked(true)
    setCurrentIndex(upcomingVideoIndex)
  }

  return (
    <section id='intro'>
      <div className='relative h-dvh w-screen overflow-x-hidden'>
        <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
          <div>
            <div className='mask-clip-path absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-64 h-64 cursor-pointer overflow-hidden rounded-lg'>
              <div onClick={handleMiniVideoClick} className='origin-center scale-50 opacity-0 transition-all duration-300 ease-in hover:scale-100 hover:opacity-100'>
                <video
                  ref={nextVideoRef}
                  src={getVideoSrc(upcomingVideoIndex)}
                  className='w-64 h-64 origin-center scale-150 object-cover object-center'
                  muted
                  loop
                  onLoadedData={handleVideoLoaded}
                />
              </div>
            </div>
            <video
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 invisible z-20 w-64 h-64 object-cover object-center'
              ref={mainVideoRef}
              src={getVideoSrc(currentIndex)}
              id="next-video"
              loop
              muted
              autoPlay
              onLoadedData={handleVideoLoaded}
            />
            <video
              src={getVideoSrc(currentIndex)}
              autoPlay
              loop
              muted
              className='absolute left-0 top-0 w-full h-full object-cover object-center'
              onLoadedData={handleVideoLoaded}
            />
          </div>
          <h1 className='font-circular-web text-9xl font-bold absolute bottom-5 right-5 z-40 text-blue-75'>
            PORTFOLIO
          </h1>
          <div className='absolute left-0 top-0 z-40 w-full h-full'>
            <div className='mt-24 px-5 sm:px-10'>
              <h1 className='font-circular-web text-9xl font-bold text-blue-100'>
                REDEFINE
              </h1>
              <p className='mb-5 max-w-64 text-2xl font-robert-regular text-blue-100'>
                Explore my journey through code, design, and creativity
              </p>
              <Button
                id='git'
                title='My Github Page'
                onClick={() => {
                  window.open('https://github.com/ahmed-aa2204608', '_blank');
                }}
                leftIcon={<TiLocationArrow />}
                containerClass='bg-yellow-300 flex items-center justify-center gap-1'
              />
            </div>
          </div>
        </div>
        <h1 className='font-circular-web text-9xl font-bold absolute bottom-5 right-5 text-black'>
          PORTFOLIO
        </h1>
      </div>
    </section>
  )
}

export default Hero