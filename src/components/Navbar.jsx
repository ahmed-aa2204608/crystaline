import React from 'react'
import Button from './button';
import { TiLocationArrow } from 'react-icons/ti';
const navItems = ['Intro', 'About', 'Experiences', 'Projects']
const Navbar = () => {
    const navContainerRef = React.useRef(null);

    return (
        <div ref={navContainerRef} className='
        bg-black rounded-lg border fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
            <header className='absolute top-1/2 w-full -translate-y-1/2'>
                <nav className='flex size-full items-center justify-between p-4'>
                    <div className='flex items-center gap-7'>
                        <a
                            className='relative ms-10 font-general text-xs uppercase text-blue-50 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                window.open('https://www.linkedin.com/in/ahmed-adam-3952b125a/', '_blank');
                            }}
                            href='#'
                        >
                            LinkedIn Page
                        </a>
                    </div>
                    <div className='flex h-full items-center'>
                        <div className='hidden md:block'>
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.toLowerCase()}`}
                                    className='relative ms-10 font-general text-xs uppercase text-blue-50 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white cursor-pointer'
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                    </div>
                </nav></header>
        </div>
    )
}

export default Navbar