import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
function Employeedetails() {
  const [searchParams] = useSearchParams();
  // Get the 'query' parameter from the URL
  const query = searchParams.get("query");

  const [employee, setEmployee] = useState([]);

  // console.log("query", query);

  const GEtemployee = async () => {
    await axios
      .get(`http://127.0.0.1:8090/api/getempbyid/${query}`)
      .then((response) => {
        setEmployee(response.data.data);
      });
  };

  console.log("employee", employee);

  useEffect(() => {
    GEtemployee();
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-28">
        {" "}
        <div className="lg:px-20 ">
          <div className=" p-3 rounded-md" style={{ height: "150vh" }}>
            <Link to={"/employees"}>
              <button className=" bg-slate-50 py-1 px-3 mb-3 rounded-md">
                Back
              </button>
            </Link>
            <div className=" mb-5">
              {employee?.map((emp) => (
                <div key={emp._id}>
                  <img
                    alt="jhj"
                    src={emp.profile}
                    className=" rounded-xl"
                    width={"150px"}
                    height={"150px"}
                  ></img>
                  <div className=" text-2xl fw-bold my-4">{emp.name}</div>
                  <div className=" grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
                    <div>
                      <div className=" text-gray-500  text-md font-semibold">
                        Position
                      </div>
                      <div className="my-2 font-semibold">{emp.position}</div>
                    </div>
                    <div>
                      {" "}
                      <div className=" text-gray-500  text-md font-semibold">
                        Email
                      </div>
                      <div className="my-2 font-semibold">{emp.email}</div>
                    </div>
                    <div>
                      {" "}
                      <div className=" text-gray-500  text-md font-semibold">
                        Phone number
                      </div>
                      <div className="my-2 font-semibold">{emp.mobile}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" text-gray-500  text-md font-semibold">
              Total visitors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employeedetails;
