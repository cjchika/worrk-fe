import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // Simulate fetching 10 newest jobs
  useEffect(() => {
    const fetchedJobs = [
      { id: 1, title: "Frontend Developer", company: "ABC Corp" },
      { id: 2, title: "Backend Developer", company: "XYZ Ltd" },
      // ...add more jobs up to 10
    ];
    setJobs(fetchedJobs);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Latest Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => navigate(`/job/${job.id}`)}
          />
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => navigate("/add-job")}
        >
          Add New Job
        </button>
      </div>
    </div>
  );
};

export default Home;
