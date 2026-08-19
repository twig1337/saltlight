# saltlight.dev — Porkbun NS cutover (split-brain DNS)

**Registrar:** Porkbun (keep domain here)  
**DNS:** Route 53 hosted zone `Z02214842GQF969KCVQ9B` (Amplify manages records)

## One-time at Porkbun

1. Domain Management → **saltlight.dev** → Details → **Authoritative nameservers** (or DNS → custom nameservers).
2. Replace Porkbun default NS with exactly these four (delete extras):

```
ns-215.awsdns-26.com
ns-1349.awsdns-40.org
ns-777.awsdns-33.net
ns-1786.awsdns-31.co.uk
```

3. Save. Propagation: often minutes, up to 24–48h.
4. Do **not** keep conflicting A/CNAME at Porkbun after NS delegation — R53 is source of truth.

## Verify

```bash
dig NS saltlight.dev +short
# expect the four awsdns names above

curl -sI https://saltlight.dev | head -5
curl -sI https://www.saltlight.dev | head -5
```

## Amplify

- App ID: `d5k5apws4oy45`
- Preview: https://main.d5k5apws4oy45.amplifyapp.com
- Custom: apex + `www` → `main`
- Region: `us-west-2`
