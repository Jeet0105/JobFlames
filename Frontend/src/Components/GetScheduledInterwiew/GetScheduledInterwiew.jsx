import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { toast } from "react-toastify";

function GetScheduledInterwiew() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/interviewer/getAllMyScheduledInterviews", {
          withCredentials: true,
        });

        if (res.data?.data?.length > 0) {
          setInterviews(res.data.data);
        } else {
          toast.info("No interviews scheduled yet.");
        }
      } catch (err) {
        console.error("Error fetching interviews:", err);
        setError(err.response?.data?.message || "Failed to fetch scheduled interviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  useEffect(() => {
    const isCompleted = () => {
      interviews.forEach((i) => {
        const startTime = moment.utc(i.interview_date);
        const endTime = startTime.clone().add(i.duration, "minutes");
        const now = moment.utc();

        const isCom = now.isAfter(endTime);

        if (isCom) {
          console.log("Trying to update status for:", i.application_id);
          updateStatus(i._id, "completed");
        }

      });
    };

    if (interviews.length > 0) {
      isCompleted();
    }
  }, [interviews]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/interviewer/updateInterviewStatus/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status.");
    }
  };

  return (
    <div className="min-h-screen ml-2 p-6">
      <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">Scheduled Interviews</h2>

      {loading && <Loader2 className="animate-spin text-blue-500 h-10 w-10 mx-auto" />}
      {error && <p className="text-red-600 text-center">{error}</p>}
      {!loading && !error && interviews.length === 0 && (
        <p className="text-gray-500 text-center">No scheduled interviews.</p>
      )}

      {!loading && !error && interviews.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-xl overflow-scroll">
            <thead className="bg-blue-500 text-white text-sm">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Interview Time</th>
                <th className="py-3 px-4">Resume</th>
                <th className="py-3 px-4">Join Link</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview) => (
                <tr key={interview._id} className="border-b text-center text-black text-sm">
                  <td className="py-4 px-4 font-medium">{interview.jobseeker_id?.name}</td>
                  <td className="py-4 px-4">{interview.jobseeker_id?.email}</td>
                  <td className="py-4 px-4">{interview.jobseeker_id?.contact_no}</td>
                  <td className="py-4 px-4">{interview.jobseeker_id?.experience} yrs</td>
                  <td className="py-4 px-4">{interview.job_id?.title || "N/A"}</td>
                  <td className="py-4 px-4">{interview.job_id?.location || "N/A"}</td>
                  <td className="py-4 px-4">
                    {moment(interview.interview_date).format("MMMM Do YYYY, h:mm A")}
                  </td>
                  <td className="py-4 px-4">
                    <a
                      href={interview.jobseeker_id?.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="py-4 px-4">
                    <a
                      href={interview.start_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Join
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GetScheduledInterwiew;
