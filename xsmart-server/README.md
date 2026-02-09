# XSmart API Server

Backend API server for XSmart website - handles contact forms and newsletter subscriptions.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Set up Gmail (if using Gmail):**
   - Go to https://myaccount.google.com/apppasswords
   - Generate an App Password
   - Use that password in SMTP_PASS (not your regular password)

4. **Start the server:**
   ```bash
   npm start
   ```

## API Endpoints

### POST /api/contact
Submit a contact form message.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'm interested in your services..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### POST /api/newsletter
Subscribe to the newsletter.

**Request body:**
```json
{
  "email": "user@example.com"
}
```

### GET /api/health
Health check endpoint.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| SMTP_HOST | SMTP server host | smtp.gmail.com |
| SMTP_PORT | SMTP server port | 587 |
| SMTP_USER | SMTP username | - |
| SMTP_PASS | SMTP password | - |
| CONTACT_EMAIL | Where to receive contact emails | hello@xsmart.io |
| PORT | Server port | 3001 |

## Development

```bash
# Run with auto-reload (install nodemon first)
npm install -g nodemon
nodemon index.js
```
