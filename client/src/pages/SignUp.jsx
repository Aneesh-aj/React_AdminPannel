import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import {signInStart,signInSuccess,signInFailure} from "../redux/user/userSlice";

export default function SignUp() {
  const [formatData,setFormData] = useState({});
  const [errors,setErrors] =   useState(false);
  const {error,loading} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  
    const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formatData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
  
      if (
        !formatData.email || formatData.email.trim() === '' ||
        !formatData.password || formatData.password.trim() === '' ||
        !formatData.username || formatData.username.trim() === ''
      ) {
        setErrors({
          email: !formatData.email || formatData.email.trim() === '' ? 'Email required' : '',
          password: !formatData.password || formatData.password.trim() === '' ? 'Password required' : '',
          username: !formatData.username || formatData.username.trim() === '' ? 'Username required' : '',
          backend: '',
        });
        dispatch(signInFailure());
        return;
      }

      console.log("the form data",formatData)
  
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      
        body: JSON.stringify(formatData),
      });
  
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/sign-in");
      } else {
        dispatch(signInFailure(data));
  
        if (data?.message) {
          setErrors({
            username: '',
            email: '',
            password: '',
            backend: data.message,
          });
        }
      }
    } catch (error) {
      dispatch(signInFailure(error));
      console.error("Error during form submission:", error);
    }
  };
  
  return (
    
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
      
        <p className="text-red-700 m-0">{errors.username ? errors.username : ''}</p>

        <input type="email" placeholder="Email"  id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}
        />
        <span className="text-red-700  m-0">{errors.email ? errors.email : ''}</span>

        <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <p className="text-red-700 m-0">{errors.password ? errors.password : ''}</p>

        <button
          disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>

      <p className="text-red-700 mt-2">{errors.backend ? errors.backend : ''}</p>
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
}


