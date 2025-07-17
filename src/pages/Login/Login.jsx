
import {useForm} from "react-hook-form"
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";



const Login = () => {
    const {register,handleSubmit,formState:{errors}} = useForm()
    const onSubmit = data =>{
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl">Login</h2>
               <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register("email")} className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password"
           {...register("password",{required:true,minLength:6})} className="input" placeholder="Password" />
           {
            errors.password?.type === 'required' && <p className="text-red-500">password is required</p>
           }
           {
            errors.password?.type==='minLength' && <p className="text-red-500">Password Must be  6 characters or longer</p>
           }
          <div><a className="link link-hover">Forgot password?</a></div>
        </fieldset>
           <p><small>Already have an account ?  <Link className="btn btn-link text-green-600" to="/SignUp">SignUp</Link> </small></p>
          <button className="btn bg-green-600  mt-4">Login</button>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;