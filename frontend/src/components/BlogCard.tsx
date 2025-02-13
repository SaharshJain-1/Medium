import { Link } from "react-router-dom"

interface BlogcardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogcardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 w-screen max-w-screen-md cursor-pointer">
            <div className="flex items-center space-x-2">
                <Avatar name={authorName}/> 
                <div className="font-extralight text-sm"> {authorName} </div>
                <div className="text-slate-500"> &#8226; </div>
                <div className="font-thin text-slate-500 text-sm"> {publishedDate} </div>
            </div>
            <div className="text-xl font-bold pt-2">
                {title.slice( 0, 100) + "..."}
            </div>
            <div className="font-thin text-base ">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} min read`}
            </div>
        </div>
    </Link>
}

export function Avatar({name, size = "small", hoverinfo="false"}: {name: string, size?: "small" | "large", hoverinfo?: "true" | "false"}) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size=== "small"? "w-6 h-6" : "w-10 h-10"} ${hoverinfo === "true" ? "hover:bg-gray-300" : ""}`}>
    <span className={`${size=== "small"? "text-xs" : "text-base"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>
}