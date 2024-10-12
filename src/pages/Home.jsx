import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../../constants";
import { toast } from "sonner";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";

    if (loggedInStatus && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${APIURL}/jobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data.jobs); // Assuming the jobs are returned in `data.jobs`
        setLoading(false);
      } catch (error) {
        setError(error.message);
        toast.error("Error fetching jobs.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p className="text-center">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container max-w-[1000px] mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Latest Jobs</h1>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job._id} // Assuming job has an `_id` field
              job={job}
              onClick={() => navigate(`/job/${job._id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No jobs available at the moment.</p>
      )}
      {isLoggedIn && user && (
        <div className="text-center mt-8">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => navigate("/add-job")}
          >
            Add New Job
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
