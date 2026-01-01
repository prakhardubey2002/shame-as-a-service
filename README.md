# Shame as a Service 🎭

A simple NestJS API that delivers country-specific shame messages. Perfect for adding a bit of humor to your applications or motivating your team with culturally-aware shame quotes.

## Summary

Shame as a Service is a RESTful API that returns randomized shame messages tailored to different countries. The API automatically detects the requester's country from their IP address, or you can specify a country manually. It includes culturally-relevant shame quotes for multiple countries including USA, India, China, UK, Germany, Japan, Brazil, and more.

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

