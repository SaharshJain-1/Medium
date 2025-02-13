import { Appbar } from "./Appbar"

export const BlogSkeleton = () => {
    return <div>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            <div className="text-xl font-semibold pt-2 max-w-screen-sm">
                                <div className="h-8 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                        </div>
                        <div className="text-slate-500 pt-2">
                            <div className="text-xl font-semibold pt-2 max-w-xs">
                                <div className="h-3 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                        </div>
                        <div className="pt-4">
                        <div className="text-xl font-semibold pt-2 max-w-screen-md">
                            <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                        <div className="text-xl font-semibold pt-2 max-w-screen-md">
                            <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                        
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-500 font-semibold">
                            <div className="h-4 w-1/5 bg-gray-200 rounded-full mb-4"></div>
                        </div>
                        <div className="flex w-full">
                            <div className="flex items-center pr-4">
                                <div className="h-10 w-10 bg-gray-200 rounded-full mb-4"></div>
                            </div>
                            <div className="pt-2 w-full">
                                <div className="text-2xl font-bold">
                                    <div className="h-4 w-1/2 bg-gray-200 rounded-full mb-4"></div>
                                </div>
                                <div className="text-slate-500 pt-2">
                                    <div className="h-3 w-full bg-gray-200 rounded-full mb-4"></div>
                                </div>
                                <div className="text-slate-500 pt-1">
                                    <div className="h-3 w-full bg-gray-200 rounded-full mb-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}