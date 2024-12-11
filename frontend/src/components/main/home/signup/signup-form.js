import { useState } from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from "react-icons/ai";

import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

const SignUpForm = () => {

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
     }

    return(
        <>
            <div className="signin-form w-100">
                <div className="row">
                    <div className="col-md-4">
                        <div className="d-flex align-items-start justify-content-center flex-column p1">
                            <div className="d-flex flex-row align-items-center p2">
                                <AiOutlineUser/>
                                <p className="form-txt">Username</p>
                            </div>
                            <div className="d-flex flex-row align-items-center p2">
                                <AiOutlineMail/>
                                <p className="form-txt">Email</p>
                            </div>
                            <div className="d-flex flex-row align-items-center p2">
                                <AiOutlineLock/>
                                <p className="form-txt">Password</p>
                            </div>
                            <div className="d-flex flex-row align-items-center p2">
                                <AiOutlineLock/>
                                <p className="form-txt">Re-enter password</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="d-flex align-items-start justify-content-center flex-column p1">
                            <div className="d-flex flex-row align-items-center p2 w-100">
                                <input type="text" className="w-100" placeholder="username"></input>
                            </div>
                            <div className="d-flex flex-row align-items-center p2 w-100">
                                <input type="text" className="w-100" placeholder="email"></input>
                            </div>
                            <div className="d-flex flex-row align-items-center p2 w-100">
                                    <input
                                        type={type}
                                        name="password"
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                        className="w-100"
                                    />
                                    <span class="d-flex justify-content-around align-items-center" onClick={handleToggle}>
                                        <Icon class="position-absolute" icon={icon} size={25}/>
                                    </span>
                            </div>
                            <div className="d-flex flex-row align-items-center p2 w-100">
                                    <input
                                        type={type}
                                        name="password"
                                        placeholder="re-enter password"
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                        autoComplete="current-password"
                                        className="w-100"
                                    />
                                    <span class="d-flex justify-content-around align-items-center" onClick={handleToggle}>
                                        <Icon class="position-absolute" icon={icon} size={25}/>
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpForm;