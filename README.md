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
  <img src="https://img.shields.io/github/issues/prakhardubey2002/shame-as-a-service?style=flat-square" alt="Issues">
  <img src="https://img.shields.io/github/stars/prakhardubey2002/shame-as-a-service?style=flat-square" alt="Stars">
  <img src="https://img.shields.io/github/forks/prakhardubey2002/shame-as-a-service?style=flat-square" alt="Forks">
</p>

# Shame as a Service 🎭

A simple NestJS API that delivers country-specific shame messages. Perfect for adding a bit of humor to your applications or motivating your team with culturally-aware shame quotes.

## Summary

Shame as a Service is a RESTful API that returns randomized shame messages tailored to different countries. The API automatically detects the requester's country from their IP address, or you can specify a country manually. It includes culturally-relevant shame quotes for multiple countries including USA, India, China, UK, Germany, Japan, Brazil, and more.

## Rate Limiting

The API is rate-limited to **200 requests per minute per IP address**. If you exceed this limit, you'll receive a `429 Too Many Requests` response.

## API Usage

### Get a Shame Message

**Endpoint:** `GET /`

Returns a random shame message. The API automatically detects your country from your IP address.

**Example Request:**

```bash
curl http://localhost:3000
```

**Example Response:**

```json
{
  "message": "Shame on you! Your code has more bugs than a Silicon Valley startup has pivots.",
  "country": "usa",
  "ip": "192.168.1.1",
  "detectedFromIp": true
}
```

### Get a Shame Message for a Specific Country

**Endpoint:** `GET /?country=<country-code>`

Specify a country to get a country-specific shame message.

**Example Request:**

```bash
curl http://localhost:3000?country=india
```

**Example Response:**

```json
{
  "message": "Shame! Your code is more broken than a Mumbai local train during rush hour.",
  "country": "india"
}
```

**Supported Countries:**

- `usa`, `india`, `china`, `uk`, `germany`, `japan`, `brazil`, `russia`, `france`, `canada`, `australia`, `south-korea`, `mexico`, `spain`, `italy`, `poland`

## Project Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running the Application

```bash
# development mode
npm run start:dev

# production mode
npm run start:prod
```

The API will be available at `http://localhost:3000`

## Development

```bash
# build
npm run build

# format code
npm run format

# lint
npm run lint

# test
npm run test
```
