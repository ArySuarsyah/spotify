import { useEffect } from "react";
import { getAuth } from "./getAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const doLogin = () => {
    getAuth();
  };
  console.log(token);
  useEffect(() => {
    token ? navigate("/") : "";
  });
  return (
    <div className="flex justify-center items-center h-full p-40">
      <div className="flex justify-center items-center bg-slate-200 w-96 h-72 rounded-lg">
        <button onClick={doLogin} className="bg-blue-400 p-2 w-20 rounded-md">
          Login
        </button>
      </div>
    </div>
  );
}
