import Form from "./components/form"
import ContractPdf from "./components/pdf"


const Home = () => {
    return (
        <div>
            <div className="h-screen bg-red-500 w-screen md:grid grid-cols-2">
                <Form />
                <ContractPdf />

            </div>
        </div>
    )
}

export default Home