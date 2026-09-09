import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      logout();
      toast.success("Logout Successfull");
      navigate("/");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  return (
    <>
      <p>Dashboard</p>
      <button
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={handleSubmit}
      >
        just a regular everyday normal logout button
      </button>
    </>
  );
};

export default Dashboard;
