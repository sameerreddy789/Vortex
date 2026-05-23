import { useState } from 'react';
import { useAuth } from '../../lib/auth';
import { Zap, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Zap size={32} color="#FFE500" fill="#FFE500" />
            <span style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-1px' }}>VORTEX</span>
          </div>
          <p style={{ color: '#666', fontSize: 14 }}>Autonomous Sales Intelligence Platform</p>
        </div>

        <div style={{ background: '#141414', border: '2px solid #2A2A2A', padding: 32, borderRadius: 2, boxShadow: '4px 4px 0 #000' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#FFF', marginBottom: 24 }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          
          {error && <div style={{ background: 'rgba(255, 45, 85, 0.1)', border: '1px solid #FF2D55', color: '#FF2D55', padding: 12, fontSize: 12, marginBottom: 20 }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: '#666', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} color="#333" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', background: '#0C0C0C', border: '2px solid #2A2A2A', padding: '10px 12px 10px 36px', color: '#FFF', fontSize: 13, outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: '#666', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color="#333" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  style={{ width: '100%', background: '#0C0C0C', border: '2px solid #2A2A2A', padding: '10px 12px 10px 36px', color: '#FFF', fontSize: 13, outline: 'none' }}
                />
              </div>
            </div>

            <button disabled={loading} style={{ background: '#FFE500', color: '#000', border: 'none', padding: 14, fontWeight: 800, fontSize: 14, marginTop: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? <Loader2 size={18} className="animate-spin" /> : (
                <>
                  {isLogin ? 'SIGN IN' : 'INITIALIZE'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: '#666' }}>
            {isLogin ? "New to Vortex?" : "Already have an account?"}{' '}
            <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#FFE500', fontWeight: 700, padding: 0 }}>
              {isLogin ? 'Register Here' : 'Login Here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
