import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { APIURL } from "../../constants";
import { toast } from "sonner";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${APIURL}/jobs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }

        const data = await response.json();
        setJob(data.job);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        toast.error("Error fetching job details.");
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading job details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!job) {
    return <p className="text-center">No job details available.</p>;
  }

  return (
    <div className="container max-w-[900px] mx-auto bg-slate-100 my-5 p-8 rounded-md shadow-sm">
      <h1 className="text-3xl font-bold">{job.jobTitle}</h1>
      <p className="text-gray-600">Company: {job.companyName}</p>
      <p className="text-gray-600">Location: {job.location}</p>
      <p className="text-gray-600">Type: {job.jobType}</p>
      <p className="text-gray-600">Status: {job.status}</p>
      <p className="mt-4">{job.jobDescription}</p>

      {job.requirements && (
        <>
          <h2 className="text-xl font-bold mt-6">Requirements:</h2>
          <ul className="list-disc pl-5">
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </>
      )}

      {job.responsibilities && (
        <>
          <h2 className="text-xl font-bold mt-6">Responsibilities:</h2>
          <ul className="list-disc pl-5">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </>
      )}

      {job.benefits && (
        <>
          <h2 className="text-xl font-bold mt-6">Benefits:</h2>
          <ul className="list-disc pl-5">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </>
      )}

      {job.applicationDeadline && (
        <p className="mt-4 text-gray-600">
          Application Deadline:{" "}
          {new Date(job.applicationDeadline).toLocaleDateString()}
        </p>
      )}

      {job.interviewDate && (
        <p className="mt-4 text-gray-600">
          Interview Date: {new Date(job.interviewDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default JobDetails;
