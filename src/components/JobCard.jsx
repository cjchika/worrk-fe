import React from "react";

const JobCard = ({ job, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border p-4 rounded-lg cursor-pointer hover:shadow-lg"
    >
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
    </div>
  );
};

export default JobCard;
