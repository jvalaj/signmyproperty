import React, { useEffect, useRef, useState } from "react";
import { useForm } from "../context/formData";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pic from "./pic.jpg"
import ex from "./ex.png";
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

    const resetForm = (e) => {
        setName("");
        setEmail("");
        setPhone("");
        setData(null);
        e.target.value = null;  // Reset the file input
    };

    const [data, setData] = useState(null);
    const [datafromexcel, setExcelData] = useState(null);

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
            console.log(parseddata);
            setData(parseddata);  // Setting the parsed data to `data` state
        }
    }


    const [name, setName,
        email, setEmail,
        phone, setPhone,
    ] = useForm()
    return (
        <div>
            <p className="text-sm text-red-600 text-center mb-2">
                Disclaimer: This is a basic version of the project to test functionality. Custom fields can be added, and the application can be extended to a more advanced version with additional input fields.
            </p>
            <marquee>
                <div className="flex flex-row gap-[10rem]">
                    <div className="flex justify-center flex-row bg-blue-600 w-1/5 p-2 rounded-lg">
                        <img src="./logo.png" className="rounded-full" height={60} width={50} />
                        <p className="text-lg ml-3 mt-2 text-white">  EstateReal</p>
                    </div>

                    <div className="flex justify-center flex-row bg-blue-600 w-1/5 p-2 rounded-lg">
                        <img src="./logo.png" className="rounded-full" height={60} width={50} />
                        <p className="text-lg ml-3 mt-2 text-white">  EstateReal</p>
                    </div>

                    <div className="flex justify-center flex-row bg-blue-600 w-1/5 p-2 rounded-lg">
                        <img src="./logo.png" className="rounded-full" height={60} width={50} />
                        <p className="text-lg ml-3 mt-2 text-white">  EstateReal</p>
                    </div>



                </div>



            </marquee>
            <div className="flex flex-row w-screen">

                <section className="bg-white border w-full h-screen border-gray-300">

                    <div className=" flex flex-col items-center justify-center px-6 py-8 gap-4 mx-auto ">

                        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-white border-gray-300">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl block text-center font-bold leading-tight tracking-tight md:text-2xl ">
                                    Enter Details
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
                                <p>Please Note: Your excel file should have 3 columns labelled: Name, Email, Phone
                                </p>
                                <form className="space-y-4 md:space-y-6" >
                                    <div>

                                        <input
                                            onChange={handleFile}
                                            type="file"
                                            required /> <br />
                                        <button className={data ? "bg-red-500 px-2 py-1 mt-2 rounded-lg text-white" : "hidden"} onClick={resetForm}>Cancel</button>
                                    </div>
                                </form>
                                <img className="mt-3" src={ex}
                                    height={350}
                                    width={350}
                                />
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

                    <p className="text-center font-bold border-black border-4 text-lg">Real Estate Purchase Agreement</p>

                    <div className="flex justify-between items-center">
                        <h1 className="text">   <p>This Real Estate Purchase Agreement ("Agreement") is made and entered into as of this [date] by and between:</p></h1>
                        <img src={pic}
                            height={100}
                            width={100} />
                    </div>
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
                                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 ">Ideal Location</label>
                            </div>
                            <div className="flex items-center">
                                <input defaultChecked id="checked-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 ">More than X foot</label>
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
                    <br /><hr /><br />
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





                    <p>Hereinafter collectively referred to as "Parties" and individually as a "Party".</p>

                    d

                    <p>IN WITNESS WHEREOF, the Parties have executed this Agreement as of the day and year first above written.</p>


                </div>

            </div>
        </div>


    )
}
export default ContractPdf