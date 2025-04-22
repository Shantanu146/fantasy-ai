import { useState } from 'react';

export default function Home() {
  const [xiInput, setXiInput] = useState("");
  const [ownershipInput, setOwnershipInput] = useState("");
  const [teams, setTeams] = useState([]);

  const generateTeams = () => {
    const xi = xiInput.split(",").map(p => p.trim()).filter(Boolean);
    const ownershipRaw = ownershipInput.split(",");
    const ownershipMap = {};

    ownershipRaw.forEach(entry => {
      const [name, percent] = entry.split("-");
      if (name && percent) ownershipMap[name.trim()] = parseInt(percent);
    });

    const generated = [];
    for (let i = 1; i <= 5; i++) {
      const team = [];
      const copyXI = [...xi];
      while (team.length < 11 && copyXI.length) {
        const idx = Math.floor(Math.random() * copyXI.length);
        team.push(copyXI.splice(idx, 1)[0]);
      }
      const sorted = team.sort((a, b) => (ownershipMap[a] || 50) - (ownershipMap[b] || 50));
      const captain = sorted[0];
      const viceCaptain = sorted[1];

      generated.push({ team, captain, viceCaptain });
    }
    setTeams(generated);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Fantasy AI Team Builder</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <textarea
          style={{ width: '100%', height: '100px' }}
          placeholder='Final Playing XI (comma-separated)'
          value={xiInput}
          onChange={(e) => setXiInput(e.target.value)}
        />
        <textarea
          style={{ width: '100%', height: '100px' }}
          placeholder='Ownership % (e.g., Kohli - 88, Livingstone - 25)'
          value={ownershipInput}
          onChange={(e) => setOwnershipInput(e.target.value)}
        />
      </div>
      <button onClick={generateTeams} style={{ padding: '0.5rem 1rem', background: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
        Generate Teams
      </button>
      <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
        {teams.map((t, i) => (
          <div key={i} style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
            <h2 style={{ fontWeight: 'bold' }}>Team {i + 1}</h2>
            <ul>
              {t.team.map((p, idx) => <li key={idx}>{p}</li>)}
            </ul>
            <p style={{ color: 'blue' }}>C: {t.captain} | VC: {t.viceCaptain}</p>
          </div>
        ))}
      </div>
    </div>
  );
  }
