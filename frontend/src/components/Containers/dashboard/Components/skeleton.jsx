import React from "react";

function Skeleton() {
    return (
        <section className="animate-pulse transition-all ease-in-out duration-300 container bg-gray-100 rounded-lg p-5 mb-5">
            <div className="flex justify-between">
                <section>
                    <div className="text-left">
                        <h1 className="font-bold text-sm bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                        <h1 className="font-bold text-lg bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                        <h1 className="font-bold text-lg bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                        <h1 className="font-bold text-lg bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                        <h1 className="font-bold text-lg bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                    </div>

                    <div className="block md:hidden text-left pt-5">
                        <h1 className="font-bold text-sm bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                        <h1 className="font-bold text-lg bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                    </div>

                    <div className="block md:hidden text-left pt-5">
                        <h1 className="font-bold text-sm bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                        <h1 className="font-bold text-lg bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                    </div>

                    <div className="block md:hidden text-left pt-5">
                        <h1 className="font-bold text-sm bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                        <h1 className="font-bold text-lg bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                    </div>
                </section>

                <section className="hidden md:block">
                    <div className="text-left">
                        <h1 className="font-bold text-sm bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                        <h1 className="font-bold text-lg bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                        <h1 className="font-bold text-lg bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                    </div>

                    <div className="text-left pt-5">
                        <h1 className="font-bold text-sm bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                        <h1 className="font-bold text-lg bg-gray-200 text-slate-200">
                            this text will not displayed
                        </h1>
                    </div>
                </section>

                <section>
                    <button className="flex items-center justify-center bg-gray-200 text-slate-200 px-4 py-2 rounded-md font-semibold tracking-wide cursor-pointer">
                        not displayed
                    </button>

                    <button className="flex items-center justify-center bg-gray-200 text-slate-200 px-4 py-2 rounded-md font-semibold tracking-wide cursor-pointer mt-2">
                        not displayed
                    </button>

                    <button className="flex items-center justify-center bg-gray-200 text-slate-200 px-4 py-2 rounded-md font-semibold tracking-wide cursor-pointer mt-2">
                        not displayed
                    </button>
                </section>
            </div>
        </section>
    );
};

export default Skeleton;
