import { useState, useEffect } from 'react';
import { Save, Check, Terminal, Database, Mic, GitBranch, Key, RefreshCw } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

function ConfigField({ label, value, placeholder, type = 'text', mono = false, hint, configKey, onSave }) {
  const [val, setVal] = useState(value || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (value !== undefined) setVal(value);
  }, [value]);

  const save = async () => { 
    if (!configKey) return;
    try {
      await onSave(configKey, val);
      setSaved(true); 
      setTimeout(() => setSaved(false), 2000); 
    } catch (e) {
      console.error('Failed to save config', e);
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.08em' }}>
        {label}
      </label>
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          type={type} value={val} onChange={e => setVal(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1, background: '#141414', border: '2px solid #2A2A2A',
            padding: '8px 12px', color: '#F0F0F0', fontSize: 12,
            fontFamily: mono ? "'IBM Plex Mono', monospace" : 'inherit',
            outline: 'none', transition: 'border-color 150ms',
          }}
          onFocus={e => e.target.style.borderColor = '#FFE500'}
          onBlur={e => e.target.style.borderColor = '#2A2A2A'}
        />
        <button onClick={save} style={{
          padding: '0 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          background: saved ? '#00FF88' : '#FFE500',
          border: '2px solid #0C0C0C',
          color: '#0C0C0C',
          display: 'flex', alignItems: 'center', gap: 5,
          boxShadow: '2px 2px 0 #0C0C0C',
          transition: 'all 100ms',
        }}>
          {saved ? <Check size={11} /> : <Save size={11} />}
          {saved ? 'SAVED' : 'SAVE'}
        </button>
      </div>
      {hint && <div style={{ fontSize: 10, color: '#333', marginTop: 4, fontFamily: "'IBM Plex Mono', monospace" }}>{hint}</div>}
    </div>
  );
}

function Section({ title, icon: Icon, color, children }) {
  return (
    <div style={{
      background: '#141414',
      border: '2px solid #2A2A2A',
      borderTop: `3px solid ${color}`,
      padding: 20, marginBottom: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <Icon size={14} color={color} />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#F0F0F0', letterSpacing: '0.05em' }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const { user, userData } = useAuth();
  const [config, setConfig] = useState({});

  useEffect(() => {
    if (userData?.config) {
      setConfig(userData.config);
    }
  }, [userData]);

  const handleSave = async (key, value) => {
    if (!user) return;
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { config: newConfig });
    } catch (e) {
      console.error('Failed to sync settings to cloud', e);
    }
  };

  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 9, color: '#333', fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.15em', marginBottom: 6 }}>// CONFIGURATION</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F0F0F0', marginBottom: 6 }}>System Settings</h2>
          <p style={{ fontSize: 12, color: '#444', lineHeight: 1.6 }}>
            Your configuration is encrypted and synced to your <span style={{ color: '#FFE500' }}>Cloud Profile</span>.
          </p>
        </div>
      </div>

      <Section title="n8n Workflow Engine" icon={GitBranch} color="#FFE500">
        <ConfigField configKey="VITE_N8N_BASE_URL" value={config.VITE_N8N_BASE_URL} onSave={handleSave} label="N8N_CLOUD_URL" placeholder="https://your-instance.app.n8n.cloud" mono hint="Your n8n cloud or self-hosted base URL" />
        <ConfigField configKey="VITE_N8N_WEBHOOK_URL" value={config.VITE_N8N_WEBHOOK_URL} onSave={handleSave} label="VORTEX_WEBHOOK_URL" placeholder="https://your-instance.app.n8n.cloud/webhook/vortex-event" mono hint="POST endpoint to trigger the scout agent" />
        <ConfigField configKey="VITE_N8N_API_KEY" value={config.VITE_N8N_API_KEY} onSave={handleSave} label="N8N_API_KEY" type="password" placeholder="••••••••••••••••" mono hint="Optional: for workflow management API calls" />
      </Section>

      <Section title="Firebase / Firestore" icon={Database} color="#3D7EFF">
        <ConfigField configKey="VITE_FIREBASE_PROJECT_ID" value={config.VITE_FIREBASE_PROJECT_ID} onSave={handleSave} label="FIREBASE_PROJECT_ID" placeholder="your-project-id" mono />
        <ConfigField configKey="VITE_FIREBASE_API_KEY" value={config.VITE_FIREBASE_API_KEY} onSave={handleSave} label="FIREBASE_API_KEY" type="password" placeholder="••••••••••••••••" mono />
        <ConfigField configKey="VITE_FIREBASE_AUTH_DOMAIN" value={config.VITE_FIREBASE_AUTH_DOMAIN} onSave={handleSave} label="FIREBASE_AUTH_DOMAIN" placeholder="your-project.firebaseapp.com" mono />
      </Section>

      <Section title="Groq AI" icon={Terminal} color="#9B5FFF">
        <ConfigField configKey="VITE_GROQ_API_KEY" value={config.VITE_GROQ_API_KEY} onSave={handleSave} label="GROQ_API_KEY" type="password" placeholder="gsk_••••••••••••••••" mono hint="Used by Agents 2, 3, and 6 via n8n" />
        <ConfigField configKey="VITE_MODEL" value={config.VITE_MODEL} onSave={handleSave} label="MODEL" placeholder="llama3-70b-8192" mono hint="Default model for intent + email generation" />
      </Section>

      <Section title="VAPI Voice Caller" icon={Mic} color="#00D4FF">
        <ConfigField configKey="VITE_VAPI_API_KEY" value={config.VITE_VAPI_API_KEY} onSave={handleSave} label="VAPI_API_KEY" type="password" placeholder="••••••••••••••••" mono />
        <ConfigField configKey="VITE_VAPI_PHONE_ID" value={config.VITE_VAPI_PHONE_ID} onSave={handleSave} label="VAPI_PHONE_NUMBER_ID" placeholder="phone-number-id" mono hint="Source number for Agent 4 calls" />
        <ConfigField configKey="VITE_VAPI_ASSISTANT_ID" value={config.VITE_VAPI_ASSISTANT_ID} onSave={handleSave} label="VAPI_ASSISTANT_ID" placeholder="assistant-id" mono />
      </Section>

      <Section title="Slack Alerts" icon={Key} color="#FF6B2B">
        <ConfigField configKey="VITE_SLACK_TOKEN" value={config.VITE_SLACK_TOKEN} onSave={handleSave} label="SLACK_BOT_TOKEN" type="password" placeholder="xoxb-••••••••••••••" mono />
        <ConfigField configKey="VITE_SLACK_CHANNEL" value={config.VITE_SLACK_CHANNEL} onSave={handleSave} label="SLACK_CHANNEL_ID" placeholder="#sales" mono hint="Agent 7 fires alerts here for HOT_LEAD decisions" />
      </Section>
    </div>
  );
}
