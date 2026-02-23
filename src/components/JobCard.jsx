import React, { useState } from 'react';

const JobCard = ({ job, candidate, onApply }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl) return alert("Por favor, ingresa la URL de tu repositorio.");

    setIsSubmitting(true);
    console.log("candidato", candidate);
    try {
      await onApply({
        uuid: candidate.uuid,
        jobId: job.id.toString(),
        candidateid: candidate.applicationId,
        repoUrl: repoUrl
      });
      setRepoUrl('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
      <h3>{job.title}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="url" 
          placeholder="URL de tu GitHub"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default JobCard;