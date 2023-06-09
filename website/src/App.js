import './App.css';
import { Link, Outlet, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Home } from "./components/home";
import { Blog, BlogPost, postLoader } from "./components/blog";
import { Projects } from './components/projects';
import { Resume } from './components/resume';
import { ParallaxProvider } from 'react-scroll-parallax';

export const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" loader={postLoader} element={<BlogPost />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
    </Route>
));
function App() {
    return (
        <ParallaxProvider>
            <Navbar />
            <Outlet />
        </ParallaxProvider>
    );
}

export function Navbar() {
    return (
        <nav className="navbar navbar-expand-md bg-body p-3 shadow">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#my-navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="my-navbar">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link navbar-brand">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog" className="nav-link navbar-brand">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/projects" className="nav-link navbar-brand">Projects</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/resume" className="nav-link navbar-brand">Resume</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default App;
