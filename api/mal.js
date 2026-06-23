// api/mal.js
const MAL_CLIENT_ID = 'd0de2342546903d013c1250fb4611616'; // Ganti dengan Client ID asli Anda

export default async function handler(req, res) {
  // Set CORS agar bisa diakses dari frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { endpoint } = req.query; // contoh: ?endpoint=/anime/ranking?ranking_type=all&limit=8
  if (!endpoint) {
    return res.status(400).json({ error: 'Parameter endpoint diperlukan' });
  }
  
  try {
    const url = `https://api.myanimelist.net/v2${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'X-MAL-CLIENT-ID': MAL_CLIENT_ID,
      },
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data dari MAL', detail: error.message });
  }
}
