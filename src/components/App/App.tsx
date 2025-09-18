import { GlobalProvider } from "../../globalContext/GlobqalProvider"
import FormsPage from "../../pages/FormsPage"

function App() {

  return (
    <>
     <div className="flex flex-col md:flex-row mx-auto justify-center mt-10 gap-10">
      <GlobalProvider>
        <FormsPage />
      </GlobalProvider>
     </div>
    </>
  )
}

export default App
