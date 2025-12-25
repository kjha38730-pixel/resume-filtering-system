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

  return (
    <div className={styles.page}>
      <Sidebar />

      <main className={styles.main}>
        <h1 className={styles.title}>Candidate Filtering & Ranking System</h1>

        {/* Input Form Card */}
        <div className={styles.formCard}>
          <label>Job Description (Not Used)</label>
          <textarea
            placeholder="Paste job description text here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <label>Skills (comma separated)</label>
          <input
            placeholder="python, java, react"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <label>Location</label>
          <input
            placeholder="bangalore"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label>Experience (years)</label>
          <input
            placeholder="3"
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <label>Salary (₹)</label>
          <input
            placeholder="800000"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <button className={styles.rankButton} onClick={handleRank}>
            Rank Candidates
          </button>
        </div>

        {/* Results */}
        {candidates.length > 0 && (
          <CandidateTable candidates={candidates} />
        )}
      </main>
    </div>
  );
}
