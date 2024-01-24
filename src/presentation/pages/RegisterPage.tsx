import {  registerWithFacebookAccount, registerWithGoogleAccount } from "../../data/datasources/firebaseAuth"
import styled from "../styles/pages/register.module.css"
import {  useAppSelector } from "../../apps/hooks/hook";
import { auth } from "../../core/firebaseConfig";
import {useAuthState} from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { home } from "../../core/route";



export const RegisterPage = () => {
    //const [user, setUser] = useState();
    //const dispatch = useAppDispatch();
    const [user, loading] = useAuthState(auth)
    const navigator = useNavigate();
    const { status} = useAppSelector((state) => state.client)

    useEffect(()=>{
        if(loading){
            return;
        }
        console.log(user);
        if(user) navigator(home)
    }, [user, loading])

    const register = async() => {
        await registerWithGoogleAccount()
    }
    
    return(
        <>
        <h1>Litable</h1>
        <main className={styled.main}>
            <h2>Create your account</h2>
            <form action="" className={styled.form}>
                <div className={styled.div} >
                    <a className={`btn btn-light border ${styled.button}`} onClick={register }  >Continue with Google</a>
                </div>
               <div className={styled.div}>
                    <a className={`btn btn-light border ${styled.button}`}  onClick={registerWithFacebookAccount } >Continue with Facebook</a>
               </div>
               <div className={styled.div}>
                 <span>OR</span>
               </div>
                <div className={styled.div}>
                    <input type="email" name="email" placeholder="Email" className="form-control" />
                </div>
                <div className={styled.div}>
                    <input type="text" name="username" placeholder="Username" className="form-control" />
                </div>
                <div className={styled.div}>
                    <input type="password" name="password" placeholder="Password" className="form-control" />
                </div>
                <div className={`form-check ${styled.div}`} >
                    <input type="checkbox" name="policy" id="policy" className="form-check-input" />
                    <label htmlFor="policy" className="form-check-label" >Send me occasional product</label>
                </div>
                <div className={styled.div}>
                    <button type="submit" className={`btn btn-secondary ${styled.button}`} disabled>Sign Up</button>
                </div>
            </form>
            <div>
                {status}
            </div>
        </main>
        </>
    )
}