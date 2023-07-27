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

                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>

    )
}
export default Form