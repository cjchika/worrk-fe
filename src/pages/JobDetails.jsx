import React from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  // Simulate fetching job details by ID
  const job = {
    id,
    title: "Frontend Developer",
    company: "ABC Corp",
    description: "Job details here...",
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.company}</p>
      <p>{job.description}</p>
    </div>
  );
};

export default JobDetails;
