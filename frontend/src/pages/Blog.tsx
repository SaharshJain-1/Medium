import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { NotSignedIn } from "../components/NotSignedIn";

export const Blog = () => {
    const {id} = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    if(loading) {
        return <div>
            <Appbar />
            {localStorage.getItem("token") ? <BlogSkeleton /> : <NotSignedIn />}
        </div>
    }
    if(!blog) {
        return <div>
            <BlogSkeleton />
        </div>
    }
    return <div>
        <FullBlog blog={blog}/>
    </div>
}