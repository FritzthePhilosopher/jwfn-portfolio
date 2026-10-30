import { useState } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Box, Button, TextField, Link } from '@mui/material';
import { colors } from '../theme.js';
import { Container, Label, SiteNav, SiteFooter } from '../components/Shared.jsx';

const messages = {
  wrong_password: "That password didn't work. Check it and try again.",
  not_configured: "Case studies aren't available right now. Please reach out and I'll send them directly.",
  network: "Something went wrong. Check your connection and try again."
};

export default function Unlock() {
  const [params] = useSearchParams();
  const next = params.get('next') || '/#work';
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password, next })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        window.location.assign(data.next || next);
        return;
      }
      setError(messages[data.error] || messages.network);
    } catch {
      setError(messages.network);
    }
    setBusy(false);
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: colors.bg, color: colors.ink, typography: 'body1', display: 'flex', flexDirection: 'column' }}>
      <SiteNav />
      <Container sx={{ pt: 'clamp(56px, 10vw, 128px)', pb: 8, flex: 1, width: '100%' }}>
        <Box sx={{ maxWidth: 560 }}>
          <Label>Case studies</Label>
          <Box component="h1" sx={{ m: 0, mt: 2, typography: 'h1' }}>This work is password protected.</Box>
          <Box component="p" sx={{ mt: 3, mb: 0, typography: 'subtitle1', color: colors.body }}>
            Some of these projects include client work I can only share privately. Enter the password to continue. Access lasts 30 minutes.
          </Box>

          <Box component="form" onSubmit={submit} noValidate sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              type="password"
              label="Password"
              autoComplete="current-password"
              autoFocus
              fullWidth
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (error) setError(''); }}
              error={Boolean(error)}
              helperText={error || ' '}
              FormHelperTextProps={{ role: error ? 'alert' : undefined, sx: { typography: 'body2', mx: 0, mt: 1 } }}
              InputProps={{ sx: { borderRadius: 0, bgcolor: colors.bg, typography: 'body1' } }}
              InputLabelProps={{ sx: { typography: 'body1' } }}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 24px' }}>
              <Button type="submit" variant="contained" size="large" disabled={!password || busy}>
                {busy ? 'Checking…' : 'View case study →'}
              </Button>
              <Link component={RouterLink} to="/#contact" underline="hover" sx={{ typography: 'body2', color: colors.accentText }}>
                Need the password? Get in touch.
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container sx={{ pb: 5, width: '100%' }}>
        <SiteFooter />
      </Container>
    </Box>
  );
}
