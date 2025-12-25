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
  const [submitted, setSubmitted] = useState(false);

  const handleRank = async () => {
    setSubmitted(true);

    const isValid =
      jobDescription.trim() &&
      skills.trim() &&
      location.trim() &&
      experience !== "" &&
      salary !== "" &&
      !isNaN(Number(experience)) &&
      !isNaN(Number(salary));

    if (!isValid) return; // Stop submit

    const payload = {
      jobDescription,
      inputSkills: skills.split(",").map(s => s.trim().toLowerCase()).filter(Boolean),
      location: location.trim().toLowerCase(),
      experience: Number(experience),
      salary: Number(salary),
    };

    const res = await fetch("/api/rankCandidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setCandidates(data);
  };

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        <h1 className={styles.title}>Candidate Filtering & Ranking System</h1>

        <div className={styles.formCard}>

          {/* ---- Job Description ---- */}
          <label>Job Description <span style={{ color: "red" }}>*</span></label>
          <textarea
            placeholder="Paste job description text here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className={submitted && !jobDescription ? styles.errorInput : ""}
          />
          {submitted && !jobDescription && (
            <p className={styles.errorText}>⚠ Job description is required</p>
          )}

          {/* ---- Skills ---- */}
          <label>Skills (comma separated) <span style={{ color: "red" }}>*</span></label>
          <input
            placeholder="python, java, react"
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className={submitted && !skills ? styles.errorInput : ""}
          />
          {submitted && !skills && (
            <p className={styles.errorText}>⚠ Skills are required</p>
          )}

          {/* ---- Location ---- */}
          <label>Location <span style={{ color: "red" }}>*</span></label>
          <input
            placeholder="bangalore"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={submitted && !location ? styles.errorInput : ""}
          />
          {submitted && !location && (
            <p className={styles.errorText}>⚠ Location is required</p>
          )}

          {/* ---- Experience ---- */}
          <label>Experience (years) <span style={{ color: "red" }}>*</span></label>
          <input
            placeholder="3"
            type="number"
            min="0"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className={submitted && (experience === "" || isNaN(Number(experience))) ? styles.errorInput : ""}
          />
          {submitted && (experience === "" || isNaN(Number(experience))) && (
            <p className={styles.errorText}>⚠ Enter a valid experience number</p>
          )}

          {/* ---- Salary ---- */}
          <label>Salary (₹) <span style={{ color: "red" }}>*</span></label>
          <input
            placeholder="800000"
            type="number"
            min="0"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className={submitted && (salary === "" || isNaN(Number(salary))) ? styles.errorInput : ""}
          />
          {submitted && (salary === "" || isNaN(Number(salary))) && (
            <p className={styles.errorText}>⚠ Enter a valid salary amount</p>
          )}

          {/* ---- Submit Button ---- */}
          <button className={styles.rankButton} onClick={handleRank}>
            Rank Candidates
          </button>
        </div>

        {candidates.length > 0 && <CandidateTable candidates={candidates} />}
      </main>
    </div>
  );
}
