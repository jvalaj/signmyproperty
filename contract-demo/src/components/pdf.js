import React, { useEffect, useRef, useState } from "react";
import { useForm } from "../context/formData";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pic from "./pic.jpg"
import stamp from "./stamp.avif"
import sig from "./signature.jpg"
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
    const [name, setName,
        email, setEmail,
        password, setPassword,
        phone, setPhone,
        address, setAddress,
        answer, setAnswer] = useForm()
    return (
        <>
            <div className="bg-white p-4 m-3 border border-gray-700" ref={pdfRef}>

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
                            <span className="underline">
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
            <button className="p-2 rounded-lg absolute top-2 bg-green-500 left-5" onClick={downloadPDF}>Download Now</button>
        </>

    )
}
export default ContractPdf