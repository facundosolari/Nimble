const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const Service = {
  getCandidate: async (email) => {
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);
    if (!response.ok) throw new Error('Error al obtener datos del candidato');
    return response.json();
  },

  getJobs: async () => {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
    if (!response.ok) throw new Error('Error al obtener lista de vacantes');
    return response.json();
  },
  apply: async (payload) => {
    console.log("Enviando este payload:", payload);
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json();
  }
};