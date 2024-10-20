import React, { useEffect, useRef, useState } from "react";
import { useForm } from "../context/formData";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pic from "./pic.jpg";
import ex from "./ex.png";
import stamp from "./stamp.avif";
import sig from "./signature.jpg";
import * as XLSX from 'xlsx';

const ContractPdf = () => {
    const pdfRef = useRef();
    const [data, setData] = useState(null);
    const [name, setName, email, setEmail, phone, setPhone] = useForm();

    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
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

    const resetForm = (e) => {
        setName("");
        setEmail("");
        setPhone("");
        setData(null);
        e.target.value = null;  // Reset the file input
    };

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
            console.log(parseddata);
            setData(parseddata);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <p className="text-sm text-red-600 text-center mb-2">
                Custom fields can be added, and the application can be extended to a more advanced version with additional input fields.
            </p>
            <div className="flex flex-col lg:flex-row w-full">

                <section className="bg-white border flex-1 h-full border-gray-300 p-4">
                    <div className="flex flex-col items-center justify-center gap-4 mx-auto">

                        <div className="w-full md:w-2/3 lg:w-1/2 rounded-lg shadow border bg-white border-gray-300">
                            <div className="p-6 space-y-4">
                                <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl ">
                                    Enter Details
                                </h1>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium ">Name</label>
                                        <input value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-300 border border-gray-600 placeholder-gray-400"
                                            placeholder="John Smith"
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                                        <input value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-300 border border-gray-600 placeholder-gray-400"
                                            placeholder="name@company.com"
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone Number</label>
                                        <input value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            className="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-300 border border-gray-600 placeholder-gray-400"
                                            placeholder="+1 234567890"
                                            required />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="text-center">OR</div>
                        <div className="w-full md:w-2/3 lg:w-1/2 rounded-lg shadow border bg-white border-gray-300">
                            <div className="p-6 space-y-4">
                                <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl ">
                                    Upload Excel Sheet
                                </h1>
                                <p>Please Note: Your excel file should have 3 columns labelled: Name, Email, Phone</p>
                                <form className="space-y-4">
                                    <div>
                                        <input onChange={handleFile} type="file" required />
                                        <button className={data ? "bg-red-500 px-2 py-1 mt-2 rounded-lg text-white" : "hidden"} onClick={resetForm}>Cancel</button>
                                    </div>
                                </form>
                                <img className="mt-3 max-w-full" src={ex} alt="example" />
                            </div>
                        </div>
                        <div className="w-full text-center mt-2">
                            <button className={name && email && phone ? "mx-auto p-2 rounded-lg w-full lg:w-[28rem] bg-green-500 text-white shadow-xl" : "hidden"} onClick={downloadPDF}>Download Now</button>
                        </div>
                    </div>
                </section>

                <div className="bg-white p-4 m-3 border border-gray-700 flex-1" ref={pdfRef}>
                    <div>
                        {data?.map((item) => (
                            <div key={item?.Id}>
                                {setName(item?.Name)}
                                {setEmail(item?.Email)}
                                {setPhone(item?.Phone)}
                            </div>
                        ))}
                    </div>

                    <p className="text-center font-bold border-black border-2 p-2 text-lg">Real Estate Purchase Agreement</p>

                    <div className="flex justify-between items-center">
                        <h1 className="text">
                            <p>This Real Estate Purchase Agreement ("Agreement") is made and entered into as of this [date] by and between:</p>
                        </h1>
                        <img src={pic} alt="pic" className="max-h-24" />
                    </div>
                    <p className="pr-4 mt-5">
                        <span className="font-bold">1. &nbsp;</span>
                        This is to certify that this real estate contract danwjdawjdasjb cjiwbd jiawbdjsbd
                        In aliquet nisl sit amet tellus tempor gravida.
                        <span className="font-semibold text-lg underline">{name || "_________________"}</span>
                        &nbsp;is the name of the person involved in this contract quis. Cras sed nisl sed nunc suscipit tristique.
                        <br />
                        <br />
                        <span className="font-bold">2.&nbsp;</span>
                        Mauris tempus fermentum mi, quis condimentum libero fermentum ut. Morbi
                        <span className="font-semibold text-lg underline">{email || "_________________"}</span>
                        <br />
                        <br />
                        <span className="font-bold">3.&nbsp;</span>
                        Some example check boxes can be seen in this contract
                        convallis Vestibulum interdum eros vitae eros pulvinar, et fringilla libero sollicitudin. Praesent rutrum id velit sit amet tincidunt.
                        <div className="mt-6">
                            <div className="flex items-center mb-2">
                                <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900">Ideal Location</label>
                            </div>
                            <div className="flex items-center">
                                <input defaultChecked id="checked-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900">More than X foot</label>
                            </div>
                        </div>
                        <br />
                        <br />
                        <span className="font-bold">4.&nbsp;</span>
                        Person signing this contract has phone number of
                        <span className="font-semibold text-lg underline">+1 {phone || "_________________"}</span>
                        a eleme ntum metus viverra malesuada. Sed non tellus est. Morbi sed dui leo.
                    </p>
                    <br />
                    <hr />
                    <br />
                    <h2>Terms and Conditions:</h2>
                    <ul>
                        <li><strong>Purchase Price:</strong> The total purchase price for the property located at ("Property") shall be , payable as follows: [Payment Terms].</li>
                        <li><strong>Closing Date:</strong> The closing date for the transaction shall be , or at such other time as the Parties may mutually agree in writing.</li>
                        <li><strong>Inspection Period:</strong> The Buyer shall have  days from the date of this Agreement to conduct any inspections of the Property. The Buyer shall notify the Seller in writing of any objections or concerns within this period.</li>
                        <li><strong>Contingencies:</strong> This Agreement is contingent upon the following conditions being satisfied by the Closing Date:
                            <ul>
                                <li>Buyer obtaining financing in the amount of  on terms satisfactory to Buyer.</li>
                                <li>Property passing all necessary inspections and appraisals to the satisfaction of Buyer.</li>
                                <li>Seller providing clear and marketable title to the Property.</li>
                            </ul>
                        </li>
                    </ul>
                    <div className="flex flex-wrap justify-between items-center mt-5 mb-0">
                        <img className="mt-3 max-h-24" src={stamp} alt="stamp" />
                        <img className="mt-3 max-h-24" src={sig} alt="signature" />
                    </div>
                    <p>Hereinafter collectively referred to as "Parties" and individually as a "Party".</p>
                    <p>IN WITNESS WHEREOF, the Parties have executed this Agreement as of the day and year first above written.</p>
                </div>
            </div>
        </div>
    )
}

export default ContractPdf;