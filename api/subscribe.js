/*
  api/subscribe.js -- Node.js (serverless) example that forwards newsletter signups to Brevo (Sendinblue).
  Deploy this as a serverless function (Netlify, Vercel, Azure Functions, etc.) and set environment variable BREVO_API_KEY.
  It expects POST {name, email} and will add that contact to a list (example uses listId placeholder).
*/
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  try {
    const {name, email} = req.body;
    if (!email) return res.status(400).json({error:'Missing email'});
    const API_KEY = process.env.BREVO_API_KEY || '';
    if (!API_KEY) return res.status(500).json({error:'Server not configured. Set BREVO_API_KEY env variable.'});
    // Replace with the correct Brevo API endpoint and listId
    const listId = process.env.BREVO_LIST_ID || '2';
    const payload = {
      email: email,
      attributes: {FIRSTNAME: name || ''},
      listIds: [parseInt(listId,10)],
      updateEnabled: true
    };
    const r = await fetch('https://api.brevo.com/v3/contacts', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'api-key': API_KEY
      },
      body: JSON.stringify(payload)
    });
    const j = await r.json();
    if (r.ok) return res.status(200).json({ok:true});
    return res.status(500).json({error: j.message || 'Brevo error', details: j});
  } catch(err){
    console.error(err);
    return res.status(500).json({error:'Internal error'});
  }
};
