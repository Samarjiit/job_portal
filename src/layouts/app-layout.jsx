import Header from "@/components/header"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-5 text-center bg-gray-800 mt-10 ">
        made with 💖 by <a href="https://github.com/Samarjiit">samarjit</a>
      </div>
    </div>
  )
}
//whole of the route render on outlet
export default AppLayout
