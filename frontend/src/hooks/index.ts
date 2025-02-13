import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    },
    publishedDate: string
}

export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}

export const useUser = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{name: string, email: string, id: string}>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setUser(response.data.userMain);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        user
    }
}