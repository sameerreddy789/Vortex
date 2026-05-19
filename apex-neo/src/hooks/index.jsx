import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SEED_LEADS } from '../config/seedData';

const IS_DEMO = import.meta.env.VITE_USE_DEMO_DATA === 'true';

// --- INITIAL MOCK DATA ---
const INITIAL_LEADS = IS_DEMO ? SEED_LEADS : [];

const INITIAL_EVENTS = [
  { id: 'start', agent: 0, agentName: 'System', timestamp: new Date().toISOString(), action: 'Apex Core Online', detail: 'Ready for event intake' },
];

const INITIAL_INTEL = {
  sentiment_score: 82,
  overall_sentiment: 'POSITIVE',
  top_complaints: ['API Documentation clarity', 'Dashboard loading states'],
  top_praise: ['Lightning fast outreach', 'Highly accurate lead scoring', 'Clean UI'],
  feature_requests: ['Mobile app', 'Salesforce integration', 'Bulk lead import'],
  summary: "Market sentiment is strongly positive. Users are impressed by the automation speed, though enterprise users are requesting deeper CRM integrations."
};

const INITIAL_AGENTS = [
  { id: 1, name: "Behavioral Scout", status: "ACTIVE", lastAction: "Waiting...", actionsToday: 0 },
  { id: 2, name: "Intent Architect", status: "ACTIVE", lastAction: "Waiting...", actionsToday: 0 },
  { id: 3, name: "Persona Writer", status: "ACTIVE", lastAction: "Waiting...", actionsToday: 0 },
  { id: 4, name: "Voice Caller", status: "ACTIVE", lastAction: "Waiting...", actionsToday: 0 },
  { id: 5, name: "Data Custodian", status: "ACTIVE", lastAction: "Waiting...", actionsToday: 0 },
  { id: 6, name: "Social Scraper", status: "ACTIVE", lastAction: "Waiting...", actionsToday: 0 },
  { id: 7, name: "Exec Router", status: "ACTIVE", lastAction: "Waiting...", actionsToday: 0 },
];

// --- HOOKS ---

export function useLeads() {
  const [leads, setLeads] = useState(INITIAL_LEADS);

  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('intent_score', 'desc'), limit(50));
    return onSnapshot(q, (snapshot) => {
      const fbLeads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeads(fbLeads);
    });
  }, []);

  const addLead = useCallback((lead) => {
    setLeads(prev => [lead, ...prev.filter(l => l.id !== lead.id)]);
  }, []);

  const updateLead = useCallback((id, updates) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  }, []);

  return { leads, addLead, updateLead };
}

export function useActivityFeed() {
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const prependEvent = useCallback((event) => {
    setEvents(prev => [{ id: Date.now().toString(), time: 'Just now', ...event }, ...prev].slice(0, 20));
  }, []);

  return { events, prependEvent };
}

export function useProductIntel() {
  const [intel, setIntel] = useState(INITIAL_INTEL);

  useEffect(() => {
    return onSnapshot(collection(db, 'product_intelligence'), (snapshot) => {
      const data = snapshot.docs[0]?.data();
      if (data) setIntel(data);
    });
  }, []);

  return { intel };
}

export function useAgentStatus() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);

  const setProcessing = useCallback((id) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, status: 'PROCESSING' } : a));
    setTimeout(() => {
      setAgents(prev => prev.map(a => a.id === id ? { ...a, status: 'ACTIVE', lastAction: 'Just now' } : a));
    }, 2000);
  }, []);

  return { agents, setProcessing };
}

export function useMetrics(leads) {
  return useMemo(() => {
    const totalLeads = leads.length;
    const hotLeads = leads.filter(l => l.status === 'HOT_LEAD').length;
    const conversionRate = 12.4;
    const highestScoreLead = leads.reduce((max, l) => (!max || l.intent_score > max.intent_score ? l : max), null);
    return {
      totalLeads,
      hotLeads,
      emailsSent: 312,
      callsPlaced: 89,
      demosBooked: 12,
      conversionRate,
      highestScore: highestScoreLead?.intent_score || 0,
      highestScoreLead,
    };
  }, [leads]);
}

// --- UTILITY HOOKS ---

export function useCountUp(target, duration = 1000) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const to = Number(target) || 0;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

export function useClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-US', { hour12: false }));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
