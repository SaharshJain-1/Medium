import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}: {blog: Blog}) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-xl">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on {blog.publishedDate}
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-500 font-semibold">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="flex items-center pr-4">
                            <Avatar name={blog.author.name || "A"} size="large"/>
                        </div>
                        <div className="pt-2">
                            <div className="text-2xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="text-slate-500 pt-2">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}