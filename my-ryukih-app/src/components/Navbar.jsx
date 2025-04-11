import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useImagePath from '../hooks/useImagePath.jsx';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = ['Home', 'Mind', 'Builds', 'Insights', 'Connect', 'Core'];
    const dropdownRefs = useRef(navItems.map(() => React.createRef()));
    const logoPath = useImagePath('/assets/logo', '/assets/fallback-image.png');
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const adjustDropdownPosition = (index) => {
        const dropdown = dropdownRefs.current[index].current;
        if (!dropdown) return;

        const rect = dropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        if (rect.right > viewportWidth) {
            dropdown.style.left = 'auto';
            dropdown.style.right = '0';
        } else {
            dropdown.style.left = '0';
            dropdown.style.right = 'auto';
        }

        if (rect.left < 0) {
            dropdown.style.left = '0';
            dropdown.style.right = 'auto';
        }
    };

    useEffect(() => {
        const handleResize = () => {
            navItems.forEach((_, index) => adjustDropdownPosition(index));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isActive = (item) => {
        const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`; // Correct path for Home
        const currentPath = location.pathname;
        return currentPath === path || currentPath.startsWith(`${path}/`);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-[1000] min-h-[60px] flex items-center justify-between px-4 sm:px-6 md:px-8 py-4">
            <div className="max-w-[150px]">
                <Link to="/">
                    <img
                        src={logoPath}
                        alt="Ryukih Logo"
                        className="h-10 w-auto object-contain"
                        onError={(e) => {
                            console.error('Failed to load logo:', logoPath);
                            e.target.src = '/assets/fallback-image.png';
                        }}
                    />
                </Link>
            </div>
            <div className="md:hidden ml-8 mr-4">
                <button onClick={toggleMenu} className="flex flex-col gap-1.5 z-[1001]">
                    <span className={`block w-6 h-0.5 bg-[#f2cc8f] transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-2 rotate-45 bg-[#fb6107]' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-[#f2cc8f] transition-all duration-300 ease-in-out delay-75 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-[#f2cc8f] transition-all duration-300 ease-in-out delay-150 ${isOpen ? 'translate-y-[-0.5rem] rotate-[-45deg] bg-[#fb6107]' : ''}`}></span>
                </button>
            </div>
            <ul className={`md:flex md:gap-6 md:items-center md:static absolute top-[60px] left-0 w-full md:w-auto bg-[#1b2a33] md:bg-transparent p-4 md:p-0 transition-all duration-300 z-[1000] ${isOpen ? 'block' : 'hidden md:flex'}`}>
                {navItems.map((item, index) => (
                    <li
                        key={item}
                        className="relative group md:flex-1 text-center"
                        onMouseEnter={() => adjustDropdownPosition(index)}
                    >
                        <Link
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} // Corrected Home link to '/'
                            className={`nav-link block text-[#f2cc8f] font-['Outfit'] text-base md:text-base font-semibold tracking-wide no-underline transition-all duration-300 hover:text-[#fb6107] hover:scale-105 hover:shadow-[0_0_10px_#fb6107] px-2 py-1 rounded-md relative ${isActive(item) ? 'text-[#fb6107] after:absolute after:bottom-[-4px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-8 after:h-1 after:bg-[#fb6107] after:rounded-full' : ''}`}
                        >
                            {item}
                        </Link>
                        {item === 'Mind' ? (
                            <ul
                                ref={dropdownRefs.current[index]}
                                className="dropdown absolute top-[50px] bg-[#1b2a33] border border-[#fb6107]/30 p-2 w-[150px] md:w-[180px] opacity-0 group-hover:opacity-100 group-hover:visible group-hover:dropdown-visible invisible transition-all duration-300 rounded-md shadow-lg z-[1000]"
                            >
                                <li>
                                    <Link
                                        to="/mind/sub1"
                                        className={`block p-2 text-[#f2cc8f] font-['Outfit'] text-sm font-medium tracking-wide hover:text-[#fb6107] hover:bg-[#fb6107]/10 hover:shadow-[0_0_5px_#fb6107] drop-shadow-[0_0_2px_#000] rounded ${location.pathname === '/mind/sub1' ? 'text-[#fb6107]' : ''}`}
                                    >
                                        Pathfinding Visualizer
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/mind/sub2"
                                        className={`block p-2 text-[#f2cc8f] font-['Outfit'] text-sm font-medium tracking-wide hover:text-[#fb6107] hover:bg-[#fb6107]/10 hover:shadow-[0_0_5px_#fb6107] drop-shadow-[0_0_2px_#000] rounded ${location.pathname === '/mind/sub2' ? 'text-[#fb6107]' : ''}`}
                                    >
                                        AI Experiments
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/mind/sub2"
                                        className={`block p-2 text-[#f2cc8f] font-['Outfit'] text-sm font-medium tracking-wide hover:text-[#fb6107] hover:bg-[#fb6107]/10 hover:shadow-[0_0_5px_#fb6107] drop-shadow-[0_0_2px_#000] rounded ${location.pathname === '/mind/sub2' ? 'text-[#fb6107]' : ''}`}
                                    >
                                        Code Puzzles
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/mind/seemore"
                                        className={`block p-2 text-[#f2cc8f] font-['Outfit'] text-sm italic font-medium tracking-wide hover:text-[#fb6107] hover:bg-[#fb6107]/20 hover:shadow-[0_0_5px_#fb6107] drop-shadow-[0_0_2px_#000] rounded ${location.pathname === '/mind/seemore' ? 'text-[#fb6107]' : ''}`}
                                    >
                                        See More
                                    </Link>
                                </li>
                            </ul>
                        ) : item !== 'Home' ? (
                            <ul
                                ref={dropdownRefs.current[index]}
                                className="dropdown absolute top-[50px] bg-[#1b2a33] border border-[#fb6107]/30 p-2 w-[150px] md:w-[120px] opacity-0 group-hover:opacity-100 group-hover:visible group-hover:dropdown-visible invisible transition-all duration-300 rounded-md shadow-lg z-[1000]"
                            >
                                <li>
                                    <Link
                                        to={`/${item.toLowerCase()}/sub1`}
                                        className={`block p-2 text-[#f2cc8f] font-['Outfit'] text-sm font-medium tracking-wide hover:text-[#fb6107] hover:bg-[#fb6107]/10 hover:shadow-[0_0_5px_#fb6107] drop-shadow-[0_0_2px_#000] rounded ${location.pathname === `/${item.toLowerCase()}/sub1` ? 'text-[#fb6107]' : ''}`}
                                    >
                                        Sub 1
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/${item.toLowerCase()}/sub2`}
                                        className={`block p-2 text-[#f2cc8f] font-['Outfit'] text-sm font-medium tracking-wide hover:text-[#fb6107] hover:bg-[#fb6107]/10 hover:shadow-[0_0_5px_#fb6107] drop-shadow-[0_0_2px_#000] rounded ${location.pathname === `/${item.toLowerCase()}/sub2` ? 'text-[#fb6107]' : ''}`}
                                    >
                                        Sub 2
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/${item.toLowerCase()}/seemore`}
                                        className={`block p-2 text-[#f2cc8f] font-['Outfit'] text-sm italic font-medium tracking-wide hover:text-[#fb6107] hover:bg-[#fb6107]/20 hover:shadow-[0_0_5px_#fb6107] drop-shadow-[0_0_2px_#000] rounded ${location.pathname === `/${item.toLowerCase()}/seemore` ? 'text-[#fb6107]' : ''}`}
                                    >
                                        See More
                                    </Link>
                                </li>
                            </ul>
                        ) : null}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;