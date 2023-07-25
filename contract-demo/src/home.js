import ContractPdf from "./components/pdf"


const Home = () => {
    return (
        <div>
            <div className="h-screen w-screen md:flex flex-row">
                <Form />
                <ContractPdf />

            </div>
        </div>
    )
}

export default Home