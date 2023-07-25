import React, { useEffect, useState } from "react";
import { useForm } from "../context/formData.js"
const Form = () => {

    const [name, setName,
        email, setEmail,
        password, setPassword,
        phone, setPhone,
        address, setAddress,
        answer, setAnswer] = useForm()

    return (
        <div>
            <section className="bg-white border h-screen border-gray-300">
                <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto ">

                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-white border-gray-300">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl block text-center font-bold leading-tight tracking-tight md:text-2xl ">
                                Fill a Contract
                            </h1>
                            <form className="space-y-4 md:space-y-6" >
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium ">Name</label>
                                    <input value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-300 border border-gray-600 placeholder-gray-400 text- "
                                        placeholder="John Smith"
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-">Your email</label>
                                    <input value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-300 border border-gray-600 placeholder-gray-400 text- "
                                        placeholder="name@company.com"
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-">Phone Number</label>
                                    <input value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-300 border border-gray-600 placeholder-gray-400 text- "
                                        placeholder="+1 234567890"
                                        required />
                                </div>
                                {/* <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-">Address</label>
                                    <input value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-300 border border-gray-600 placeholder-gray-400 text- "
                                        placeholder="ABC Street, City, State"
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-">What is your favourite sport?</label>
                                    <input value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-300 border border-gray-600 placeholder-gray-400 text- "
                                        placeholder="Football etc."
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-">Password</label>
                                    <input value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type=""
                                        name=""
                                        id=""
                                        placeholder="••••••••"
                                        className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-gray-600 placeholder-gray-400 text- "
                                        required />
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>

    )
}
export default Form