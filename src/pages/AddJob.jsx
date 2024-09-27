import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../../constants"; // Adjust the path to your APIURL
import { toast } from "sonner"; // Assuming you're using sonner for notifications

const JOB_TYPES = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Temporary",
  "Internship",
];

const AddJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: JOB_TYPES[0],
    companyName: "",
    location: "",
    salaryRange: "",
    jobDescription: "",
    requirements: [""],
    responsibilities: [""],
    benefits: [""],
    applicationDeadline: "",
    interviewDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, e, field) => {
    const newValues = [...formData[field]];
    newValues[index] = e.target.value;
    setFormData({ ...formData, [field]: newValues });
  };

  const addNewField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User is not authenticated. Please log in.");
        return;
      }

      const response = await fetch(`${APIURL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Job added successfully!");
        navigate("/"); // Redirect to home or job listings
      } else {
        toast.error(data.msg || "Failed to add job.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error submitting job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date();

  return (
    <div className="container max-w-[1000px] mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Company</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Salary Range</label>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Requirements</label>
          {formData.requirements.map((requirement, index) => (
            <input
              key={index}
              type="text"
              value={requirement}
              onChange={(e) => handleArrayChange(index, e, "requirements")}
              className="w-full border p-2 rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => addNewField("requirements")}
            className="bg-green-500 text-white py-1 px-2 rounded"
          >
            Add Requirement
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Responsibilities</label>
          {formData.responsibilities.map((responsibility, index) => (
            <input
              key={index}
              type="text"
              value={responsibility}
              onChange={(e) => handleArrayChange(index, e, "responsibilities")}
              className="w-full border p-2 rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => addNewField("responsibilities")}
            className="bg-green-500 text-white py-1 px-2 rounded"
          >
            Add Responsibility
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Benefits</label>
          {formData.benefits.map((benefit, index) => (
            <input
              key={index}
              type="text"
              value={benefit}
              onChange={(e) => handleArrayChange(index, e, "benefits")}
              className="w-full border p-2 rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => addNewField("benefits")}
            className="bg-green-500 text-white py-1 px-2 rounded"
          >
            Add Benefit
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Application Deadline</label>
          <input
            max={today}
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Interview Date</label>
          <input
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Adding Job..." : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
