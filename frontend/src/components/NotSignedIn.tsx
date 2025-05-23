import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const NotSignedIn = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Show modal if the user is not signed in (no token in localStorage)
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            setIsModalVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('termsAccepted', 'true');
        setIsModalVisible(false);  // Close the modal
    };

    const handleDecline = () => {
        setIsModalVisible(false);  // Close the modal without accepting
    };

    if (!isModalVisible) return null;  // Don't render the modal if it's not visible

    return (
        <div
            id="default-modal"
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50"
            aria-hidden={!isModalVisible ? "true" : "false"}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                {/* Modal Content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Create an account to view this page
                        </h3>
                        <Link to="/signup"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={handleDecline} // Close modal on "X"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </Link>
                    </div>

                    {/* Modal Body */}
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Please sign in to view this page
                        </p>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <Link to="/signup" 
                            onClick={handleAccept} // Accept the terms and close the modal
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Sign up
                        </Link>
                        <Link to="/signin" 
                            onClick={handleAccept} // Accept the terms and close the modal
                            className="ms-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Sign in
                        </Link>
                        <Link to="/blogs"
                            onClick={handleDecline} // Decline and close the modal
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Decline
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
