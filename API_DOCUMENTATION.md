# Cereal API Documentation

This document outlines the API integrations and services used in the Cereal app.

## Table of Contents
1. [Firebase Services](#firebase-services)
2. [Transcription API (Phase 3)](#transcription-api)
3. [AI Summary API (Phase 3)](#ai-summary-api)
4. [Calendar Integration (Phase 4)](#calendar-integration)
5. [Video Platform APIs (Phase 5)](#video-platform-apis)

---

## Firebase Services

### Authentication
```typescript
import { auth } from './src/services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Sign up
await createUserWithEmailAndPassword(auth, email, password);

// Sign in
await signInWithEmailAndPassword(auth, email, password);

// Sign out
await auth.signOut();
```

### Firestore (Database)
```typescript
import { db } from './src/services/firebase';
import { collection, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore';

// Create/Update meeting
const meetingRef = doc(db, 'users', userId, 'meetings', meetingId);
await setDoc(meetingRef, meetingData);

// Get meeting
const meetingSnap = await getDoc(meetingRef);
const meeting = meetingSnap.data();

// Query meetings
const q = query(
  collection(db, 'users', userId, 'meetings'),
  where('date', '>', new Date())
);
const querySnapshot = await getDocs(q);
```

### Storage
```typescript
import { storage } from './src/services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Upload audio file
const audioRef = ref(storage, `users/${userId}/recordings/${meetingId}.m4a`);
await uploadBytes(audioRef, audioBlob);

// Get download URL
const audioUrl = await getDownloadURL(audioRef);
```

---

## Transcription API (Phase 3)

### AssemblyAI Integration

**Endpoint**: `https://api.assemblyai.com/v2`

#### 1. Upload Audio File
```typescript
POST /upload
Headers:
  authorization: YOUR_API_KEY
Body: Binary audio file

Response:
{
  "upload_url": "https://cdn.assemblyai.com/upload/..."
}
```

#### 2. Request Transcription
```typescript
POST /transcript
Headers:
  authorization: YOUR_API_KEY
  content-type: application/json
Body:
{
  "audio_url": "https://cdn.assemblyai.com/upload/...",
  "speaker_labels": true,
  "auto_highlights": true,
  "sentiment_analysis": true
}

Response:
{
  "id": "transcript-id",
  "status": "queued"
}
```

#### 3. Get Transcription Result
```typescript
GET /transcript/{id}
Headers:
  authorization: YOUR_API_KEY

Response:
{
  "id": "transcript-id",
  "status": "completed",
  "text": "Full transcription...",
  "words": [...],
  "utterances": [
    {
      "speaker": "A",
      "text": "...",
      "start": 1000,
      "end": 5000
    }
  ]
}
```

### Implementation Example
```typescript
// src/services/transcriptionService.ts
import { API_CONFIG } from '../constants/config';

export class TranscriptionService {
  async uploadAudio(audioUri: string): Promise<string> {
    const response = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: {
        'authorization': API_CONFIG.assemblyAiApiKey,
      },
      body: audioBlob,
    });
    const { upload_url } = await response.json();
    return upload_url;
  }

  async requestTranscription(audioUrl: string): Promise<string> {
    const response = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        'authorization': API_CONFIG.assemblyAiApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        audio_url: audioUrl,
        speaker_labels: true,
        auto_highlights: true,
        sentiment_analysis: true,
      }),
    });
    const { id } = await response.json();
    return id;
  }

  async getTranscription(transcriptId: string): Promise<Transcript> {
    const response = await fetch(
      `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
      {
        headers: {
          'authorization': API_CONFIG.assemblyAiApiKey,
        },
      }
    );
    return await response.json();
  }
}
```

---

## AI Summary API (Phase 3)

### OpenAI GPT-4 Integration

**Endpoint**: `https://api.openai.com/v1/chat/completions`

#### Generate Meeting Summary
```typescript
POST /chat/completions
Headers:
  Authorization: Bearer YOUR_API_KEY
  Content-Type: application/json
Body:
{
  "model": "gpt-4-turbo-preview",
  "messages": [
    {
      "role": "system",
      "content": "You are a meeting summarization assistant..."
    },
    {
      "role": "user",
      "content": "Transcription: ..."
    }
  ],
  "temperature": 0.7
}

Response:
{
  "choices": [
    {
      "message": {
        "content": "Summary JSON..."
      }
    }
  ]
}
```

#### Prompt Template
```typescript
const SUMMARY_PROMPT = `
You are a meeting summarization assistant. Analyze the following meeting transcript and provide:
1. Executive Summary (2-3 sentences)
2. Key Points (bullet points)
3. Decisions Made (list)
4. Action Items (with assignees if mentioned)
5. Follow-up Items
6. Overall Sentiment (positive/neutral/negative)

Return the response as JSON with this structure:
{
  "executive": "...",
  "keyPoints": ["..."],
  "decisions": ["..."],
  "actionItems": [{"text": "...", "assignee": "..."}],
  "followUps": ["..."],
  "sentiment": "positive/neutral/negative"
}

Transcript:
${transcriptText}
`;
```

### Implementation Example
```typescript
// src/services/aiService.ts
import { API_CONFIG } from '../constants/config';

export class AIService {
  async generateSummary(transcriptText: string): Promise<Summary> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.openAiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: API_CONFIG.openAiModel,
        messages: [
          {
            role: 'system',
            content: 'You are a meeting summarization assistant...',
          },
          {
            role: 'user',
            content: `Transcript: ${transcriptText}`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const summary = JSON.parse(data.choices[0].message.content);
    return summary;
  }
}
```

---

## Calendar Integration (Phase 4)

### Expo Calendar API

```typescript
import * as Calendar from 'expo-calendar';

// Request permission
const { status } = await Calendar.requestCalendarPermissionsAsync();

// Get calendars
const calendars = await Calendar.getCalendarsAsync();

// Get events
const events = await Calendar.getEventsAsync(
  [calendarId],
  new Date(),
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
);

// Parse event for meeting info
const meetingInfo = {
  title: event.title,
  startDate: event.startDate,
  endDate: event.endDate,
  attendees: event.attendees,
  location: event.location,
  notes: event.notes,
};
```

### Google Calendar API (for advanced features)

**Endpoint**: `https://www.googleapis.com/calendar/v3`

```typescript
// List upcoming events
GET /calendars/primary/events
Headers:
  Authorization: Bearer ACCESS_TOKEN
Parameters:
  timeMin: 2024-01-01T00:00:00Z
  maxResults: 10
  singleEvents: true
  orderBy: startTime
```

---

## Video Platform APIs (Phase 5)

### Microsoft Teams Integration

**Endpoint**: `https://graph.microsoft.com/v1.0`

#### OAuth 2.0 Flow
```typescript
// 1. Authorization URL
https://login.microsoftonline.com/common/oauth2/v2.0/authorize
  ?client_id={CLIENT_ID}
  &response_type=code
  &redirect_uri={REDIRECT_URI}
  &scope=OnlineMeetings.ReadWrite Calendars.Read

// 2. Exchange code for token
POST https://login.microsoftonline.com/common/oauth2/v2.0/token
Body:
  client_id={CLIENT_ID}
  &client_secret={CLIENT_SECRET}
  &code={CODE}
  &redirect_uri={REDIRECT_URI}
  &grant_type=authorization_code
```

#### Get Online Meetings
```typescript
GET /me/onlineMeetings
Headers:
  Authorization: Bearer ACCESS_TOKEN

Response:
{
  "value": [
    {
      "id": "meeting-id",
      "subject": "Team Sync",
      "startDateTime": "2024-01-15T10:00:00Z",
      "endDateTime": "2024-01-15T11:00:00Z",
      "joinUrl": "https://teams.microsoft.com/l/meetup-join/..."
    }
  ]
}
```

### Zoom API Integration

**Endpoint**: `https://api.zoom.us/v2`

#### OAuth 2.0 Flow
```typescript
// 1. Authorization URL
https://zoom.us/oauth/authorize
  ?client_id={CLIENT_ID}
  &response_type=code
  &redirect_uri={REDIRECT_URI}

// 2. Exchange code for token
POST https://zoom.us/oauth/token
Headers:
  Authorization: Basic base64(CLIENT_ID:CLIENT_SECRET)
Body:
  grant_type=authorization_code
  &code={CODE}
  &redirect_uri={REDIRECT_URI}
```

#### Get Upcoming Meetings
```typescript
GET /users/me/meetings
Headers:
  Authorization: Bearer ACCESS_TOKEN
Parameters:
  type: upcoming

Response:
{
  "meetings": [
    {
      "id": "meeting-id",
      "topic": "Team Meeting",
      "start_time": "2024-01-15T10:00:00Z",
      "duration": 60,
      "join_url": "https://zoom.us/j/..."
    }
  ]
}
```

---

## Error Handling

All API calls should implement proper error handling:

```typescript
try {
  const result = await apiCall();
  return result;
} catch (error) {
  if (error.status === 401) {
    // Handle authentication error
  } else if (error.status === 429) {
    // Handle rate limiting
  } else {
    // Handle other errors
  }
  throw error;
}
```

## Rate Limiting

- **AssemblyAI**: Check their pricing page for limits
- **OpenAI**: Tier-based limits (check your account)
- **Microsoft Graph**: Throttling limits apply
- **Zoom**: Rate limits per user/account

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all secrets
3. **Implement token refresh** for OAuth flows
4. **Validate all inputs** before sending to APIs
5. **Handle sensitive data** properly (encrypt if needed)
6. **Implement retry logic** with exponential backoff
7. **Log errors** but not sensitive information

---

**Note**: This documentation will be updated as new features are implemented in subsequent phases.
