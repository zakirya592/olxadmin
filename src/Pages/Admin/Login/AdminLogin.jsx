import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await NewRequest.post("/admin/login", {
        email: email,
        password: password,
      });
      console.log(response?.data);
      sessionStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userdata", JSON.stringify(response.data));
      sessionStorage.setItem("userResponse", JSON.stringify(response));
      toast.success(response?.data?.message || "Login Successful");
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login Failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="sm:h-[600px] h-auto w-[85%] sm:w-1/2 rounded-md shadow-xl bg-white flex flex-col justify-center items-center p-8">
        <p className="sm:text-2xl text-lg font-semibold mb-8">Admin Login</p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center"
        >
          <div className="w-full sm:w-[50%]">
            <label
              htmlFor="username"
              className="sm:text-2xl text-lg font-bold mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your username"
              className="p-2 border border-gray-300 shadow-lg rounded-md w-full mb-6"
            />
            <label
              htmlFor="password"
              className="sm:text-2xl text-lg font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="p-2 border border-gray-300 shadow-lg rounded-md w-full mb-6"
            />
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#2D6A3C", color: "#ffffff" }}
              disabled={loading}
              className="w-full bg-secondary hover:bg-[#9699b1] shadow-xl mb-6 text-white font-medium text-xl rounded-md px-5 py-2"
              endIcon={
                loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Adminlogin;
