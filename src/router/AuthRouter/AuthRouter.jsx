import { Route, Routes } from "react-router-dom"
import Signup from "../../pages/Signup/Signup"
import Signin from "../../pages/Signin/Signin"

function AuthRouter() {
  return (
    <>
    <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </>
  )
}

export default AuthRouter