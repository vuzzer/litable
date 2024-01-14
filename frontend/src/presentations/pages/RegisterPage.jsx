import styled from "../styles/pages/Register.module.css"

export const RegisterPage = () => {
    return(
        <>
        <h1>Litable</h1>
        <main className={styled.main}>
            <h2>Create your account</h2>
            <form action="" className={styled.form}>
                <div className={styled.div} >
                    <button className={`btn btn-light border ${styled.button}`} >Continue with Google</button>
                </div>
               <div className={styled.div}>
                    <button className={`btn btn-light border ${styled.button}` }>Continue with Github</button>
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
        </main>
        </>
    )
}