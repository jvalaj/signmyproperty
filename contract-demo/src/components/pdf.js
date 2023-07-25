import React, { useEffect, useState } from "react";
import { useForm } from "../context/formData";

const ContractPdf = () => {
    const [name, setName,
        email, setEmail,
        password, setPassword,
        phone, setPhone,
        address, setAddress,
        answer, setAnswer] = useForm()
    return (
        <div className="bg-yellow-500">
            data = {name} , {email}
        </div>
    )
}
export default ContractPdf