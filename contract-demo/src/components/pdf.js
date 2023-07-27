import React, { useEffect, useRef, useState } from "react";
import { useForm } from "../context/formData";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pic from "./pic.jpg"
import stamp from "./stamp.avif"
import sig from "./signature.jpg"
import * as XLSX from 'xlsx';
const ContractPdf = () => {

    const pdfRef = useRef()
    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 5;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('contract.pdf');
        });
    };

    const [data, setData] = useState(null);

    // handle File
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        let reader = new FileReader();

        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
            const filedata = e.target.result;
            const wb = XLSX.read(filedata, { type: 'buffer' });
            const worksheetName = wb.SheetNames[0];
            const worksheet = wb.Sheets[worksheetName];
            const parseddata = XLSX.utils.sheet_to_json(worksheet);
            setData(parseddata);
            console.log(data)
        }
    }

    const [name, setName,
        email, setEmail,
        password, setPassword,
        phone, setPhone,
        address, setAddress,
        answer, setAnswer] = useForm()
    return (
        <div className="flex flex-row w-screen">
            <section className="bg-white border w-full h-screen border-gray-300">
                <div className=" flex flex-col items-center justify-center px-6 py-8 gap-4 mx-auto ">
                    <div className="w-full mt-4  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-white border-gray-300">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl block text-center font-bold leading-tight tracking-tight md:text-2xl ">
                                Select State
                            </h1>

                            <div>
                                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                                </svg></button>
                                {/* Dropdown menu */}
                                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
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
                    <div>
                        OR
                    </div>
                    <div className="w-full mt-4  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-white border-gray-300">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl block text-center font-bold leading-tight tracking-tight md:text-2xl ">
                                Upload Excel Sheet
                            </h1>
                            <form className="space-y-4 md:space-y-6" >
                                <div>

                                    <input
                                        onChange={handleFile}
                                        type="file"

                                        required /> <br />
                                    <button className={data ? "bg-red-500 px-2 py-1 mt-2 rounded-lg text-white" : "hidden"} onClick={(e) => { e.target.files[0] = null }}>Cancel</button>
                                </div>


                            </form>
                        </div>
                    </div>
                    <div className="w-full text-center mt-2">
                        <button className={name && email && phone ? "mx-auto p-2 rounded-lg w-[28rem] bg-green-500 text-white shadow-xl" : "hidden"} onClick={downloadPDF}>Download Now</button>
                    </div>

                </div>
            </section>

            <div className="bg-white w-full p-4 m-3 border border-gray-700" ref={pdfRef}>

                <div>
                    {data?.map((item) => (
                        <div key={item?.Id}>
                            {setName(item?.Name)}
                            {setEmail(item?.Email)}
                            {setPhone(item?.Phone)}
                        </div>
                    ))}
                </div>
                <img src={pic}
                    height={100}
                    width={100} />
                <h1 className="text-2xl"> To whomsoever it may concern</h1>
                <p className="pr-4 mt-5">
                    <span className="font-bold">1.    &nbsp;</span>

                    This is to certify that this real estate contract danwjdawjdasjb cjiwbd jiawbdjsbd
                    In aliquet nisl sit amet tellus tempor gravida.
                    <span className="font-semibold text-lg " >
                        &nbsp;
                        {name ?
                            <span className="capitalize underline">
                                {name}
                            </span> :
                            "_________________"}
                        &nbsp;
                    </span>
                    is the name of the person involved in this contract quis. Cras sed nisl sed n
                    unc suscipit tristique.

                    <br />
                    <br />
                    <span className="font-bold">2.&nbsp;</span>


                    Mauris tempus fermentum mi, quis condimentum li
                    bero fermentum ut. Morbi
                    <span className="font-semibold text-lg " >
                        &nbsp;
                        {email ?
                            <span className="underline">
                                {email}
                            </span> :
                            "_________________"}
                        &nbsp;
                    </span>

                    <br />
                    <br />
                    <span className="font-bold">3.&nbsp;</span>
                    Some example check boxes can be seen in this contract
                    convallis Vestibulum interdum er
                    os vitae eros pulvinar, et fringilla libero sollicitudin. Praesent rutrum id velit sit amet
                    tincidunt.


                    <div className="mt-6">
                        <div className="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 ">Default checkbox</label>
                        </div>
                        <div className="flex items-center">
                            <input defaultChecked id="checked-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 ">Checked state</label>
                        </div>
                    </div>

                    <br />
                    <br />
                    <span className="font-bold">4.&nbsp;</span>
                    Person signing this contract has phone number of
                    <span className="font-semibold text-lg " >
                        &nbsp;
                        {phone ?
                            <span className="underline">
                                +1 {phone}
                            </span> :
                            "+1 _________________"}
                        &nbsp;
                    </span>

                    a eleme
                    ntum metus viverra malesuada. Sed non tellus est. Morbi sed dui leo.</p>
                <div className="flex  flex-row mt-5 mb-0 justify-between">
                    <img className="mt-3" src={stamp}
                        height={150}
                        width={150}
                    />
                    <img className="mt-3" src={sig}
                        height={150}
                        width={150}
                    />
                </div>

            </div>

        </div>

    )
}
export default ContractPdf