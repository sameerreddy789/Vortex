// Seed leads used in the Agent Activity tab debate viewer and Live Pipeline demo
// Set to empty array for a clean start; the "Trigger Demo" button will add data in real-time.
export const SEED_LEADS = [];

// Agent debate log for Rahul Sharma — shown in the DebateTerminal
export const DEBATE_LOG_RAHUL = [
  {
    agent: 1,
    agentName: 'Behavioral Scout',
    time: '14:03:01',
    lines: [
      { text: 'Event captured: api_limit_hit', color: '#FF4D6D' },
      { text: 'User: vediums@gmail.com · Session: 120 min', color: '#A8B8FF' },
      { text: 'Feature: Data Export API · Plan: free_trial', color: '#A8B8FF' },
      { text: 'API calls today: 98 / 100 limit', color: '#FF9500' },
      { text: 'Teammates invited: 3 — team adoption signal detected', color: '#00E5A0' },
      { text: '→ Routing to Intent Architect for classification', color: '#4A5578' },
    ],
  },
  {
    agent: 2,
    agentName: 'Intent Architect',
    time: '14:03:02',
    lines: [
      { text: 'Invoking Groq llama3-70b-8192...', color: '#BD00FF' },
      { text: 'Input signals: api_limit_hit + 120min session + 3 teammates', color: '#A8B8FF' },
      { text: '─────────────────────────────────────', color: '#2A3060' },
      { text: 'Classification: POWER_USER', color: '#FF4D6D' },
      { text: 'Intent score: 92 / 100', color: '#FF4D6D' },
      { text: 'Urgency: HIGH', color: '#FF9500' },
      { text: 'Primary pain: USAGE_LIMIT', color: '#FF9500' },
      { text: 'Growth pressure: YES (team expanding)', color: '#00E5A0' },
      { text: '→ Routing to Persona Writer for email draft', color: '#4A5578' },
    ],
  },
  {
    agent: 3,
    agentName: 'Persona Writer',
    time: '14:03:03',
    lines: [
      { text: 'Drafting personalized outreach via Groq...', color: '#FF9500' },
      { text: 'Context: api_limit_hit · team of 3 · 120min session', color: '#A8B8FF' },
      { text: 'Tone: empathetic, solution-first, low pressure', color: '#A8B8FF' },
      { text: '─────────────────────────────────────', color: '#2A3060' },
      { text: 'Subject: You hit the Data Export limit — here\'s how to unblock your team', color: '#00E5A0' },
      { text: 'Body: Drafted (178 words) · Personalization tokens: 4', color: '#00E5A0' },
      { text: 'Sales note: High urgency, low resistance. Lead with unblock angle.', color: '#FF9500' },
      { text: '→ Routing to Exec Router for final decision', color: '#4A5578' },
    ],
  },
  {
    agent: 7,
    agentName: 'Exec Router',
    time: '14:03:05',
    lines: [
      { text: 'Evaluating action thresholds...', color: '#4F6EFF' },
      { text: 'Score 92 ≥ 60 → AUTONOMOUS outreach tier', color: '#FF4D6D' },
      { text: 'Urgency HIGH → immediate outreach required', color: '#FF9500' },
      { text: '─────────────────────────────────────', color: '#2A3060' },
      { text: '✓ Slack alert fired → #sales channel', color: '#00E5A0' },
      { text: '✓ Autonomous Email sent (vediums@gmail.com)', color: '#00E5A0' },
      { text: '✓ Lead written to Firestore: leads/usr_4821', color: '#00E5A0' },
      { text: 'Pipeline complete · Total latency: 4.2s', color: '#4A5578' },
    ],
  },
];
