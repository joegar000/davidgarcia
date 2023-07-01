import { Link, Outlet, Route, createHashRouter, createRoutesFromElements } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import './App.css';
import { Home } from "./components/home";
import { Blog, BlogPost, postsLoader, postLoader } from "./components/blog";
import { Projects, projectsLoader } from './components/projects';
import { Resume } from './components/resume';
import { Footer } from "./components/footer";

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
                element: <Resume />
            }
        ]
    }
]);

function App() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
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
