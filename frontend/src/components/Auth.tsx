import { SignupInput } from "@sunjain35/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: ""
    })
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Optional: Prevent form submission if you don't want that
            document.getElementById("signingButton")?.click(); // Trigger button click
        }
    };

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up");
        }
        
    }

    return <div className="h-screen flex justify-center items-center">
        <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold text-center">
                    {type==="signup" ? "Create an account" : "Welcome back."}
                </div>
                <div className="text-slate-500 text-center">
                    {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                    <Link to={type==="signup" ? "/signin" : "/signup"} className="pl-2 underline">
                        {type==="signup" ? "Sign in" : "Sign up"}
                    </Link>
                </div>
            </div>
            <div className="pt-8">
                {type==="signup" ? <LabelledInput label="Name" placeholder="John Doe..." onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }} /> : null}
                <LabelledInput label="Username" placeholder="example@gmail.com" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }} 
                onKeyDown ={handleKeyPress}/>
                <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} 
                onKeyDown ={handleKeyPress}/>
                <button id="signingButton" onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-8"> {type === "signup" ? "Sign up" : "Sign in"} </button>
            </div>
            
        </div>

    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    onKeyDown?: (e: React.KeyboardEvent) => void;
}

function LabelledInput({label, placeholder, onChange, type, onKeyDown}: LabelledInputType) {
    return <div>
        <div>
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white pt-2">{label}</label>
            <input onChange={onChange} onKeyDown={onKeyDown} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}