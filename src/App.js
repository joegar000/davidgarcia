import { useState } from "react";
import { Link, useOutlet, createHashRouter, useLocation } from "react-router-dom";
import './App.css';
import { Home } from "./components/home";
import { Blog, BlogPost, postsLoader, postLoader } from "./components/blog";
import { Projects, projectsLoader } from './components/projects';
import { Resume } from './components/resume';
import { resumeLoader } from "./components/resume";
import { AnimatePresence, motion } from "framer-motion";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/blog",
                loader: postsLoader,
                element: <Blog />
            },
            {
                path: "/blog/:postId",
                loader: postLoader,
                element: <BlogPost />
            },
            {
                path: "/projects",
                loader: projectsLoader,
                element: <Projects />
            },
            {
                path: "/resume",
                loader: resumeLoader,
                element: <Resume />
            }
        ]
    }
]);

function AnimatedOutlet() {
    const o = useOutlet();
    const [outlet] = useState(o);

    return <>{outlet}</>;
};

function App() {
    const { key } = useLocation();
    return (
        <>
            <Navbar />
            <AnimatePresence mode="wait">
                <motion.div className="container mx-auto" key={key}
                    initial={{ translateY: '5em', opacity: 0 }}
                    animate={{ translateY: '0', opacity: 1 }}
                    exit={{ opacity: 0, translateY: '-5em' }}
                    transition={{ duration: 0.25 }}
                >
                    <AnimatedOutlet />
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export function Navbar() {
    const { pathname } = useLocation();
    return (
        <nav className="navbar navbar-expand-sm bg-body p-3 shadow-sm" style={{ zIndex: 1 }}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#my-navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="my-navbar">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item">
                            <Link to="/"
                                className={`nav-link navbar-brand${pathname === '/' ? ' disabled' : ''}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog" className={`nav-link navbar-brand${pathname === '/blog' ? ' disabled' : ''}`}>Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/projects"
                                className={`nav-link navbar-brand${pathname === '/projects' ? ' disabled' : ''}`}
                            >
                                Projects
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/resume"
                                className={`nav-link navbar-brand${pathname === '/resume' ? ' disabled' : ''}`}
                            >
                                Resume
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default App;
