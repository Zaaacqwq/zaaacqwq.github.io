import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import About from './about.jsx';
import Projects from './projects.jsx';
import Blogs from './blogs.jsx';
import Media from './media.jsx';

const App = () => {
    // Initialize currentPage state
    const [currentPage, setCurrentPage] = useState('Home');
    const [isScrollable, setIsScrollable] = useState(true);

    useEffect(() => {
        // Define the event handler
        const handleNavigate = (e) => {
            // console.log(`Navigating to ${e.detail.label}`); // Confirm navigation
            setCurrentPage(e.detail.label); // Update state based on event
        };

        const handleScrollControl = (e) => {
            setIsScrollable(e.detail.allowScroll); // Update isScrollable based on the event
        };

        // Attach event listener for 'navigate' events
        document.addEventListener('navigate', handleNavigate);
        document.addEventListener('scrollControl', handleScrollControl); // Listen for scroll control events

        // Clean up by removing the event listener
        return () => {
            document.removeEventListener('navigate', handleNavigate);
            document.removeEventListener('scrollControl', handleScrollControl); // Clean up
        };
    }, []); // Empty dependency array means this effect runs once on mount

    const renderPage = () => {
        switch (currentPage) {
            case 'About':
                return <About />;
            case 'Projects':
                return <Projects />;
            case 'Blogs':
                return <Blogs />;
            case 'Media':
                return <Media />;
            default:
                return <div>Welcome to the homepage!</div>;
        }
    };

    return (
        <div style={{ overflowY: isScrollable ? 'hidden' : 'scroll' }}>
        {/* <div> */}
            {renderPage()}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('react-root'));
