import { useState, useContext, createContext, useEffect } from "react";

const FormContext = createContext();
const FormProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    return (
        <FormContext.Provider value={[name, email, password, phone, address, answer]}>
            {children}
        </FormContext.Provider>
    )
}

// custom hook
const useForm = () => useContext(FormContext);

export { useForm, FormProvider };