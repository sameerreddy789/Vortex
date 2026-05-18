import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'save-config',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/get-config' && req.method === 'GET') {
            const envPath = path.resolve(__dirname, '.env');
            const content = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
            const config = Object.fromEntries(
              content.split('\n')
                .filter(line => line.includes('=') && !line.startsWith('#'))
                .map(line => {
                  const [key, ...val] = line.split('=');
                  return [key.trim(), val.join('=').trim()];
                })
            );
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(config));
          } else if (req.url === '/api/proxy-webhook' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const { url, payload } = JSON.parse(body);
                const response = await fetch(url, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                });
                const data = await response.text();
                res.statusCode = response.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
              } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.message }));
              }
            });
          } else if (req.url === '/api/save-config' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const { key, value } = JSON.parse(body);
                const envPath = path.resolve(__dirname, '.env');
                if (!fs.existsSync(envPath)) fs.writeFileSync(envPath, '');
                
                let envContent = fs.readFileSync(envPath, 'utf8');
                const regex = new RegExp(`^${key}=.*`, 'm');
                
                if (regex.test(envContent)) {
                  envContent = envContent.replace(regex, `${key}=${value}`);
                } else {
                  envContent += `\n${key}=${value}`;
                }
                
                fs.writeFileSync(envPath, envContent.trim() + '\n');
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: 'ok' }));
              } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
  server: { port: 3000 },
  build: { outDir: 'dist' }
});
