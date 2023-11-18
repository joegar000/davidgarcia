import "bootstrap-icons/bootstrap-icons.svg";
// import "prosemirror-view/style/prosemirror.css";
import { Outlet, Route, createHashRouter, createRoutesFromElements, Link } from "react-router-dom";
import { NewPost } from "./new-post";
import { EditPost, PostList, postLoader } from "./edit-post";
import { EditDraft, DraftList, draftLoader } from "./edit-draft";
import { NewProject } from "./new-project";

export const router = createHashRouter(createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/new_post" element={<NewPost />} />
        <Route path="/edit_posts" element={<PostList />} />
        <Route path="/edit_posts/:postId" loader={postLoader} element={<EditPost />} />
        <Route path="/edit_drafts" element={<DraftList />} />
        <Route path="/edit_drafts/:draftId" loader={draftLoader} element={<EditDraft />} />
        <Route path="/new_project" element={<NewProject />} />
    </Route>
));

function App() {
    return (
        <div className="m-5 p-5">
            <Outlet />
        </div>
    );
}

export function Home() {
    return (
        <>
            <div className="row">
                <Link to="/new_post" className="btn btn-primary">New Post</Link>
            </div>
            <div className="row mt-3">
                <Link to="/edit_posts" className="btn btn-primary">Edit Post</Link>
            </div>
            <div className="row mt-3">
                <Link to="/edit_drafts" className="btn btn-primary">Edit Draft</Link>
            </div>
            <div className="row mt-3">
                <Link to="/new_project" className="btn btn-primary">New Project</Link>
            </div>
        </>
    );
}

export default App;
