import candidates from "../../data/candidates.json";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ msg: "POST only" });

  const { inputSkills, location, experience, salary } = req.body;

  const possible = inputSkills.length + 1 + 1 + 1; // skills + location + exp + salary

  const ranked = candidates.map(c => {
    const cSkills = (c.skills || []).map(s => s.toLowerCase());
    const skillMatches = cSkills.filter(s => inputSkills.includes(s)).length;

    const locMatch = c.location?.toLowerCase() === location ? 1 : 0;

    const expDiff = Math.abs(c.experience - experience);
    const expScore = experience
      ? (expDiff === 0 ? 1 : 1 / expDiff)
      : 0;

    const salDiff = Math.abs(c.salary - salary);
    const salScore = salary
      ? (salDiff === 0 ? 1 : 1 / salDiff)
      : 0;

    const totalScore = skillMatches + locMatch + expScore + salScore;
    const matchPercent = Math.round((totalScore / possible) * 100);
    const decimalScore = (totalScore / possible).toFixed(2);

    return {
  name: c.name,
  skills: c.skills,  
  experience: c.experience,
  salary: c.salary,
  location: c.location,
  matchPercent,
  matchDecimal: decimalScore,
  _sort: {
    skillMatches,
    locMatch,
    expDiff,
    salDiff
  }
};

  }).sort((a, b) => {
    // new ranking priority:
    if (b._sort.skillMatches !== a._sort.skillMatches)
      return b._sort.skillMatches - a._sort.skillMatches;

    if (b._sort.locMatch !== a._sort.locMatch)
      return b._sort.locMatch - a._sort.locMatch;

    if (a._sort.expDiff !== b._sort.expDiff)
      return a._sort.expDiff - b._sort.expDiff;

    return a._sort.salDiff - b._sort.salDiff;
  });

  res.status(200).json(ranked);
}
