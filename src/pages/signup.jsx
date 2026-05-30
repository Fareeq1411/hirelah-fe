import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SignUp(){

    const [accName, setAccName] = useState("");
    const [fullName, setFullName] = useState("");

    const handleButton = () => {
        console.log(accName);
        console.log(fullName);
    }

    return(
        <div>
            <div>
                <div >
                    <Label htmlFor="acc_name">Account Name</Label>
                    <Input id="acc_name" onChange={(e) => setAccName(e.target.value)}></Input>                    
                </div>

                <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input id="full_name" onChange={(e)=> setFullName(e.target.value)}></Input>                    
                </div>
                
                <Button onClick={handleButton}>Sign Up</Button>
            </div>
        </div>
    );

}

export default SignUp;
