import { useNavigate } from "react-router-dom"
export const HomePage = () => {
    const navigate = useNavigate()
    return (
        <>
        <button onClick={()=>navigate("/signin")}>Signin</button>
        <button onClick={()=>navigate("/signup")}>Signup</button>
        </>
    )
}