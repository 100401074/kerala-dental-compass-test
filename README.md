# Kerala Dental Compass — Test Site

Editorial dental directory for Kerala. Static HTML prototype with real pilot clinic data.

## Pages
- `index.html` — Homepage
- `kochi.html` — Kochi city hub (5 clinics, sentiment-ranked)
- `clinic-dentique.html` — Individual clinic page (Dentique, full sentiment analysis)
- `cost-dental-implant.html` — Cost guide (wife-bylined, JSON-LD schema)

## Stack
- Static HTML + CSS (no framework)
- Google Fonts: Fraunces + Manrope
- Nginx served via Docker

## Deploy
Coolify-managed. Deploys from this repo via Dockerfile build.

## Local preview
```
docker build -t kdc-test .
docker run -p 8080:80 kdc-test
```
Open http://localhost:8080
