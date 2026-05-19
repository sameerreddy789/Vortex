// Seed leads used in the Agent Activity tab debate viewer and Live Pipeline demo
export const SEED_LEADS = [
  {
    id: 'usr_4821',
    name: 'Rahul Sharma',
    company: 'FinTrack Inc.',
    company_size: '50-200',
    intent_score: 91,
    status: 'HOT_LEAD',
    event_type: 'api_limit_hit',
    feature: 'Data Export API',
    session_mins: 47,
    teammates_invited: 3,
    signals: ['URGENCY', 'GROWTH_PRESSURE', 'USAGE_LIMIT'],
    email_draft: {
      subject: "You hit the Data Export limit — here's how to unblock your team",
      body: `Hey Rahul,

Noticed FinTrack hit the API export ceiling a few minutes ago — you're clearly getting serious value out of the platform (47 mins in one session is no joke).

The good news: our Growth plan removes the export cap entirely and adds bulk scheduling so your team never gets blocked mid-workflow again.

I'd love to walk you through it in a 15-min call — happy to make it worth your time with a 2-week trial extension.

[CALENDAR_LINK]

— [REP_NAME]`,
      sales_contact_note:
        'High urgency, low sales resistance expected. Rahul is actively blocked — lead with the unblock angle, not pricing. Mention teammates (3 invited) to reinforce team value.',
    },
  },
  {
    id: 'usr_2034',
    name: 'Priya Nair',
    company: 'BuildStack',
    company_size: '11-50',
    intent_score: 54,
    status: 'WARM_LEAD',
    event_type: 'onboarding_incomplete',
    feature: 'API Setup',
    session_mins: 22,
    teammates_invited: 0,
    signals: ['NEEDS_SUPPORT'],
    email_draft: null,
  },
  {
    id: 'usr_9910',
    name: 'James Okon',
    company: 'CloudBase',
    company_size: '1-10',
    intent_score: 18,
    status: 'WATCHING',
    event_type: 'page_view',
    feature: 'Dashboard',
    session_mins: 4,
    teammates_invited: 0,
    signals: ['LOW_INTENT'],
    email_draft: null,
  },
  {
    id: 'usr_5521',
    name: 'Sarah Chen',
    company: 'Nexus Flow',
    company_size: '201-500',
    intent_score: 88,
    status: 'HOT_LEAD',
    event_type: 'feature_blocked',
    feature: 'Advanced Analytics',
    session_mins: 35,
    teammates_invited: 5,
    signals: ['HIGH_ADOPTION', 'ENTERPRISE_SIGNAL'],
    email_draft: {
      subject: "Unlocking Advanced Analytics for Nexus Flow",
      body: "Hi Sarah, Noticed your team is trying to access the analytics suite...",
      sales_contact_note: "Enterprise lead. Focus on scale and multi-user permissions."
    }
  },
  {
    id: 'usr_1102',
    name: 'Marcus Thorne',
    company: 'Vanguard Systems',
    company_size: '51-200',
    intent_score: 95,
    status: 'CONVERTED',
    event_type: 'plan_upgrade',
    feature: 'Enterprise Plan',
    session_mins: 15,
    teammates_invited: 12,
    signals: ['CLOSED_WON'],
    email_draft: null
  },
  {
    id: 'usr_7734',
    name: 'Elena Rodriguez',
    company: 'Solaris Health',
    company_size: '11-50',
    intent_score: 42,
    status: 'WATCHING',
    event_type: 'pricing_view',
    feature: 'Pricing Page',
    session_mins: 12,
    teammates_invited: 0,
    signals: ['PRICE_SENSITIVE'],
    email_draft: null
  },
  {
    id: 'usr_3345',
    name: 'David Kim',
    company: 'K-Tech Solutions',
    company_size: '1-10',
    intent_score: 61,
    status: 'WARM_LEAD',
    event_type: 'api_key_created',
    feature: 'API Management',
    session_mins: 28,
    teammates_invited: 1,
    signals: ['ACTIVATION_MILESTONE'],
    email_draft: null
  },
  {
    id: 'usr_8890',
    name: 'Anita Desai',
    company: 'Global Logistics',
    company_size: '500+',
    intent_score: 99,
    status: 'CONVERTED',
    event_type: 'contract_signed',
    feature: 'Custom Integration',
    session_mins: 0,
    teammates_invited: 45,
    signals: ['PARTNERSHIP'],
    email_draft: null
  }
];

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
