import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useUser } from "../hooks";
import { useState } from "react";

export const Appbar = () => {
    const navigate = useNavigate();
    function onSignout() {
        localStorage.removeItem("token");
        navigate("/signin");
    }
    const {loading, user} = useUser();

    const [showProfileCard, setShowProfileCard] = useState(false);
    const toggleProfileCard = () => {
        setShowProfileCard((prevState) => !prevState);
    };

    return <div className="border-b flex justify-between px-10 py-2 items-center">
        <Link to={"/blogs"} className="cursor-pointer font-serif text-3xl font-semibold">
            Medium
        </Link>
        <div className="flex items-center space-x-6 text-sm">
            <Link to={"/publish"} className="flex items-center text-neutral-500 font-semibold cursor-pointer hover:text-black">
                <div className="bf b bg z du fj fk ab q fl fm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write"><path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path><path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path></svg>
                </div>
                <div className="dt l ml-2">Write</div>
            </Link>
            {localStorage.getItem("token") === null ? (
                <div>
                    <div className="flex items-center space-x-2">
                        <Link to={"/signup"}>
                            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-normal rounded-full text-sm px-4 py-1.5 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign up</button>
                        </Link>
                        <Link to={"/signin"} className="text-gray-500 font-semibold cursor-pointer hover:text-black">
                            <p className="bf b dx dy dz ea eb ec ed ee ef eg du"><span><a className="af ag ah ai aj ak al am an ao ap aq ar as at" data-testid="headerSignInButton" href="https://medium.com/m/signin?operation=login&amp;redirect=https%3A%2F%2Fthinhtran3588.medium.com%2Fhow-to-migrate-postgres-databases-1ef76b8ad058&amp;source=post_page---top_nav_layout_nav-----------------------global_nav-----------" rel="noopener follow">Sign in</a></span></p>
                        </Link>
                    </div>
                </div>
            ) : (
                    <button type="button" onClick={onSignout} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-normal rounded-full text-sm px-4 py-1.5 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Log out</button>
            )}
            
            <div>
                {user?.name ? 
                <div className="cursor-pointer" onClick={toggleProfileCard}>
                    <Avatar size={"large"} name={user.name} hoverinfo={"true"}/> 
                </div> :
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>}
            </div>
        </div>


        {/* Conditional rendering of profile card */}
        {showProfileCard && (
            <div className="profile-card absolute top-16 right-10 w-60 p-4 bg-white shadow-lg rounded-lg z-10">
                <div className="profile-card-content">
                    <h3>{user?.name}</h3>
                    <p>{user?.email}</p>
                    <button onClick={toggleProfileCard} className="mt-4 text-sm text-blue-500">Close</button>
                </div>
            </div>
        )}
            
    </div>
}