import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showNotice, setShowNotice] = useState(false);
    const [NoticeMessage, setNoticeMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        let data = await login(email, password);
        if(data.status == 200){
            data = data.json();
            setNoticeMessage("Login Success!");
            setShowNotice(true);
            navigate("/dashboard");
        }else{
            setShowNotice(true);
            setNoticeMessage("Login Failed!");
        }
    };

    return(
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100vh" 
        }}>
            <div style={{ 
                border: "1px solid #ccc", 
                padding: "20px", 
                borderRadius: "8px",
                width: "300px"
            }}>
                <h2>Login FIRAS!!!!!</h2>

                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        style={{ width: "100%", marginBottom: "10px" }}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter password" 
                        style={{ width: "100%", marginBottom: "10px" }}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <button style={{ width: "100%" }} onClick={handleLogin}>
                    Login
                </button>

                {showNotice && (
                    <div>
                        <h3>{NoticeMessage}</h3>
                    </div>          
                )}

            </div>
        </div>
    )
}

export default Login;