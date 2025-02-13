import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading) {
        return <div>
        <Appbar /> 
        <div  className="flex justify-center">
            <div>
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
            </div>
        </div>
    </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard 
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.publishedDate}
                />)}
                {/* <BlogCard 
                    id={2}
                    authorName={"Saharsh Jain"}
                    title={"How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"}
                    content={"No need to create a fancy and modern website with hundreds of pages to make money online. - Making money online is the dream for man ..."}
                    publishedDate={"16th Jan 2025"}
                /> */}
            </div>
        </div>
    </div>
}