<p align="center">
  <img src="asset/shame-as-service.png" alt="Shame as a Service" width="600">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11.0.1-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
</p>

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/prakhardubey2002/shame-as-a-service/test.yml?branch=main&style=flat-square" alt="Build Status">
  <img src="https://img.shields.io/uptimerobot/status/m802078862-d051dd26d30984ab479e3457?style=flat-square" alt="Uptime Status">
  <img src="https://img.shields.io/uptimerobot/ratio/m802078862-d051dd26d30984ab479e3457?style=flat-square" alt="Uptime Ratio">
  <img src="https://img.shields.io/github/issues/prakhardubey2002/shame-as-a-service?style=flat-square" alt="Issues">
  <img src="https://img.shields.io/github/stars/prakhardubey2002/shame-as-a-service?style=flat-square" alt="Stars">
  <img src="https://img.shields.io/github/forks/prakhardubey2002/shame-as-a-service?style=flat-square" alt="Forks">
</p>

---

# Shame-As-A-Service

> Because logs warn you.  
> Errors stop you.  
> **But shame changes you.**

An absurdly serious NestJS API that returns **culturally-aware shame messages**
based on your country — automatically detected from your IP or explicitly provided.

Perfect for:

- Bad code
- Failed builds
- Questionable commits
- Poor life choices (optional)

---

## 10-Second Demo

```bash
curl https://shame-as-a-service.vercel.app/?country=india
```

```json
{
  "message": "Shame! Your code is more broken than a Mumbai local train during rush hour.",
  "country": "india"
}
```

That's it.
You're already being judged.

---

## Why does this exist?

Because:

- You committed directly to `main`
- You skipped tests
- You restarted the server instead of fixing the bug
- And nothing stopped you

Now something will.

---

## What it does

- Returns **random shame messages**
- Detects country automatically using IP
- Supports **country-specific shame**
- Rate-limited to prevent emotional damage
- Deployed on **Vercel**
- Built with **NestJS + TypeScript**

---

## Try It Live

**Base URL:**

[https://shame-as-a-service.vercel.app](https://shame-as-a-service.vercel.app)

### Examples

**Random shame (auto-detect country):**

```bash
curl https://shame-as-a-service.vercel.app/
```

**Country-specific shame:**

```bash
curl https://shame-as-a-service.vercel.app/?country=usa
curl https://shame-as-a-service.vercel.app/?country=india
curl https://shame-as-a-service.vercel.app/?country=china
```

---

## API Usage

### `GET /`

Returns a shame message.

**Query Params**

| Param     | Description                                  |
| --------- | -------------------------------------------- |
| `country` | Optional country code (`india`, `usa`, etc.) |

**Example Response**

```json
{
  "message": "Shame on you! Your code has more bugs than a Silicon Valley startup has pivots.",
  "country": "usa",
  "ip": "192.168.1.1",
  "detectedFromIp": true
}
```

---

## Supported Countries

```
usa, india, china, uk, germany, japan,
brazil, russia, france, canada,
australia, south-korea, mexico,
spain, italy, poland
```

PRs welcome to add more.

---

## Integrations

Shame-As-A-Service works great with:

- **GitHub Actions** – shame yourself when CI fails
- **Test pipelines** – failed test → instant judgment
- **Slack bots** – shame your team publicly
- **Console logs** – because red text isn't enough

### GitHub Actions (fail → shame)

```yaml
- name: Shame me
  if: failure()
  run: curl https://shame-as-a-service.vercel.app/?country=usa
```

---

## Rate Limiting

- **200 requests / minute / IP**
- Exceeding this returns `429 Too Many Requests`
- Because too much shame isn't healthy

---

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Install

```bash
npm install
```

### Run

```bash
npm run start:dev
```

API available at:

```
http://localhost:3000
```

---

## Scripts

```bash
npm run build
npm run format
npm run lint
npm run test
```

---

## Contributing

This is probably the easiest open-source project you'll ever contribute to.

Ways to help:

- Add a new shame message
- Add a new country
- Improve existing insults
- Fix typos (yes, even that)

No complex logic.
Just good judgment.

---

## Disclaimer

All shame is fictional.

Any resemblance to your actual code is entirely your fault.

---

## If this made you laugh

Give it a star.

It feeds the shame engine.

---

Built with NestJS and disappointment.
