// api/mal.js
const MAL_CLIENT_ID = 'd0de2342546903d013c1250fb4611616'; // Ganti dengan Client ID asli Anda

export default async function handler(req, res) {
  try {
    const { endpoint } = req.query;
    
    const url = `https://api.myanimelist.net/v2${endpoint}`;
    
    console.log('REQUEST:', url);
    
    const response = await fetch(url, {
      headers: {
        'X-MAL-CLIENT-ID': MAL_CLIENT_ID
      }
    });
    
    const text = await response.text();
    
    console.log('STATUS:', response.status);
    console.log('BODY:', text);
    
    res.status(response.status).send(text);
    
  } catch (err) {
    console.error(err);
    
    res.status(500).json({
      error: err.message
    });
    
  }
}
