import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";
import http from "../helpers/http";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../redux/reducers/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = React.useCallback(async () => {
    const { data } = await http(token).get(`/user`);
    setUser(data.results);
  }, [token]);

  React.useEffect(() => {
    if (!token) {
      window.location.href = "/auth/login";
    }
    getUser();
  }, [getUser, token]);

  const doLogout = () => {
    dispatch(logoutAction());
    navigate("/auth/login");
  };

  return (
    <div className="w-full h-screen flex">
      <div className="bg-secondary py-9 px-11 w-[300px] relative hidden lg:block">
        <div className=" text-white text-2xl font-bold">Happy Code</div>
        <div className="absolute bottom-7 w-full">
          <button
            onClick={doLogout}
            className="btn btn-warning w-[200px] capitalize text-primary text-lg font-medium tracking-normal"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 px-3">
        <Header />

        <div className=" max-w-[1200px] mx-auto h-20 my-11 bg-secondary/10 text-3xl text-primary flex items-center px-5 rounded-xl">
          Employee
        </div>
        <div className="max-w-[1200px] mx-auto flex justify-center items-center overflow-scroll">
          <table
            id="customers"
            className="text-black text-xl w-full min-w-[600px]"
          >
            <tr className="bg-secondary/25 h-16">
              <th>Username</th>
              <th>Email</th>
              <th>Fullname</th>
              <th>Action</th>
            </tr>
            {user.map((item) => (
              <tr key={`user-${item.id}`} className="h-16">
                <td>{item?.username}</td>
                <td>{item?.email}</td>
                <td className="capitalize">{item?.Profile?.fullName}</td>
                <td className="text-center">
                  <button className="btn btn-info capitalize text-white">
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
