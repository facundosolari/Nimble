import React, { useState, useEffect } from 'react'
import {Service} from './services/service';
import JobCard from './components/JobCard';
import './App.css'

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidateData = await Service.getCandidate('facusolari9@gmail.com');
        setCandidate(candidateData);
        const jobsData = await Service.getJobs();
        setJobs(jobsData);
      } catch (err) {
        console.error("Error inicializando:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApply = async (payload) => {
  try {
    const res = await Service.apply(payload);
    if (res.ok) {
      alert("¡Postulación enviada con éxito!");
    } else {
      alert(`Error: ${res.message || "No se pudo completar la postulación"}`);
    }
  } catch (err) {
    alert("Error de conexión con el servidor.");
  }
};

  if (loading) return <div>Cargando...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Ofertas Disponibles</h1>
      {candidate && <p>Candidato: {candidate.firstName} {candidate.lastName}</p>}
      <hr />
      {jobs.map(job => (
        <JobCard 
          key={job.id} 
          job={job} 
          candidate={candidate} 
          onApply={handleApply} 
        />
      ))}
    </div>
  );
}

export default App;
