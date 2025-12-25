import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CandidateTable from "../components/CandidateTable";
import styles from "../styles/index.module.css";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [candidates, setCandidates] = useState([]);

  const handleRank = async () => {
    // SHOW POPUP IF ANY FIELD IS EMPTY
    if (!jobDescription || !skills || !location || !experience || !salary) {
      alert("⚠️ Please fill all required fields before ranking candidates!");
      return;
    }

    const payload = {
      jobDescription,
      inputSkills: skills.split(",").map(s => s.trim().toLowerCase()).filter(Boolean),
      location: location.trim().toLowerCase(),
      experience: Number(experience),
      salary: Number(salary)
    };

    const res = await fetch("/api/rankCandidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setCandidates(data);
  };

  const isFormValid =
    jobDescription.trim() &&
    skills.trim() &&
    location.trim() &&
    experience !== "" &&
    salary !== "" &&
    !isNaN(Number(experience)) &&
    !isNaN(Number(salary));

  return (
    <div className={styles.page}>
      <Sidebar />

      <main className={styles.main}>
        <h1 className={styles.title}>Candidate Filtering & Ranking System</h1>

        <div className={styles.formCard}>
          {/* ---- REQUIRED LABELS WITH RED STAR ---- */}
          <label>Job Description <span style={{color:"red"}}>*</span></label>
          <textarea
            placeholder="Paste job description text here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />

          <label>Skills (comma separated) <span style={{color:"red"}}>*</span></label>
          <input
            placeholder="python, java, react"
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />

          <label>Location <span style={{color:"red"}}>*</span></label>
          <input
            placeholder="bangalore"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label>Experience (years) <span style={{color:"red"}}>*</span></label>
          <input
            placeholder="3"
            type="number"
            min="0"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />

          <label>Salary (₹) <span style={{color:"red"}}>*</span></label>
          <input
            placeholder="800000"
            type="number"
            min="0"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />

          <button
            className={styles.rankButton}
            onClick={handleRank}
            disabled={!isFormValid}
          >
            Rank Candidates
          </button>
        </div>

        {candidates.length > 0 && <CandidateTable candidates={candidates} />}
      </main>
    </div>
  );
}
