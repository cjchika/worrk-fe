import React from "react";

const JobCard = ({ job, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <h2 className="text-xl font-bold mb-2">{job.jobTitle}</h2>
      <p className="text-gray-600 mb-1">{job.companyName}</p>
      <p className="text-gray-600 mb-1">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Job Type:</strong> {job.jobType}
      </p>
      {job.salaryRange && (
        <p className="text-gray-600 mb-1">
          <strong>Salary:</strong> {job.salaryRange}
        </p>
      )}
      <p className={`text-sm font-semibold ${getStatusColor(job.status)} mb-2`}>
        {job.status}
      </p>
      <p className="text-gray-500 text-sm">
        <strong>Posted on:</strong>{" "}
        {new Date(job.postedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

// Helper function to style job status
const getStatusColor = (status) => {
  switch (status) {
    case "Open":
      return "text-green-600";
    case "Interview":
      return "text-blue-600";
    case "Offer":
      return "text-yellow-500";
    case "Filled":
      return "text-gray-600";
    case "Closed":
      return "text-red-600";
    case "Cancelled":
    case "Rejected":
      return "text-red-500";
    default:
      return "text-gray-600";
  }
};

export default JobCard;
