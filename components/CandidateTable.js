import Avatar from "./Avatar";
import styles from "../styles/index.module.css";

export default function CandidateTable({ candidates }) {
  return (
    <div className={styles.tableCard}>
      <h2>Ranked Candidates</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Candidate</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Salary</th>
            <th>Location</th>
            <th>Match Score</th>
            <th>Profile</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((c, index) => (
            <tr key={c.name}>
              <td>{index + 1}</td>
              <td className={styles.userCell}>
                <Avatar name={c.name} />
                <span>{c.name}</span>
              </td>
              <td>{c.skills?.join(", ")}</td>
              <td>{c.experience} yrs</td>
              <td>₹{c.salary}</td>
              <td>{c.location}</td>
              <td>
                <strong>{c.matchPercent}%</strong> ({c.matchDecimal})
              </td>
              <td><button className={styles.viewBtn}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
