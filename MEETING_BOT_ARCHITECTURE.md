# Meeting Bot Architecture - Auto-Join & Record

## Overview

This document explains how Cereal can automatically join online meetings (Zoom, Teams, Google Meet) and record them without manual intervention.

---

## 🏗️ Architecture

### Traditional Approach (Phase 2 - Local Recording)
```
User's Device → Records Local Audio → Saves Locally
```
**Pros**: Simple, private, works offline  
**Cons**: Only records your side, manual start/stop

### Meeting Bot Approach (Advanced Feature)
```
Meeting Platform → Bot Joins → Records Full Meeting → Cloud Storage
```
**Pros**: Records all participants, automatic, full video/audio  
**Cons**: Complex, requires platform APIs, privacy concerns

---

## 🤖 How Meeting Bots Work

### 1. Bot Registration
Each platform requires registering a "bot user" that can join meetings:

- **Zoom**: Zoom App with Meeting Bot enabled
- **Microsoft Teams**: Graph API bot registration
- **Google Meet**: Meet API access (limited)

### 2. Meeting Detection
```
Calendar Event → Has Meeting Link → Extract Platform & Meeting ID → Prepare Bot
```

### 3. Auto-Join Flow
```
1. User's calendar has meeting at 2:00 PM
2. At 1:55 PM, Cereal detects upcoming meeting
3. At 2:00 PM, bot automatically joins
4. Bot starts recording video/audio
5. Meeting ends, bot leaves
6. Recording uploaded to Firebase Storage
7. Transcription & AI summary triggered
8. User gets notification: "Meeting recorded & summarized"
```

---

## 🔧 Technical Implementation

### Platform-Specific Bot APIs

#### Zoom Meeting Bot
Zoom provides a **Meetings SDK** and **Video SDK** for building bots:

**Steps**:
1. Create Zoom App at marketplace.zoom.us
2. Enable "Meeting SDK" feature
3. Get SDK Key and Secret
4. Use Zoom Video SDK to join meetings programmatically

**Limitations**:
- Requires Zoom Pro account or higher
- Bot appears as a participant
- Users can see "Cereal Bot" in meeting
- Recording must comply with Zoom policies

#### Microsoft Teams Bot
Teams uses **Graph API** and **Bot Framework**:

**Steps**:
1. Register app in Azure AD
2. Create Bot using Bot Framework
3. Use Graph API to join online meetings
4. Use Cloud Communications API for recording

**Limitations**:
- Requires Microsoft 365 Business/Enterprise
- Bot must be approved by tenant admin
- Compliance recording policies apply

#### Google Meet Bot
Google Meet has **limited bot support**:

**Options**:
1. **Meet API** (Enterprise only, limited access)
2. **Workaround**: Use browser automation (Puppeteer)

**Limitations**:
- No official bot API for consumer accounts
- Enterprise Workspace required
- Very restricted access

---

## 🎯 Implementation Strategy

### Phase 2A: Local Recording (Current Plan)
**What**: Record audio from user's device during meeting  
**When**: User manually starts recording  
**Complexity**: Low  
**Privacy**: High (local only)

### Phase 5: Platform Integration (Planned)
**What**: Detect meetings and prepare for recording  
**When**: Automatic detection from calendar  
**Complexity**: Medium  

### Phase 6 (NEW): Meeting Bot Feature
**What**: Bot joins meeting automatically and records  
**When**: Configurable (auto or manual trigger)  
**Complexity**: High  
**Requirements**:
- Platform-specific SDKs
- Cloud infrastructure for bots
- Significant API costs
- Legal/privacy compliance

---

## 🚀 Recommended Approach for Cereal

### Hybrid Strategy

#### Tier 1: Personal Recording (Phase 2) ✅
**For**: All users  
**How**: Local device recording  
**Pros**: 
- Simple, works immediately
- No platform dependencies
- Private and secure
- Free

**Cons**:
- Manual start/stop
- Only your audio
- No video capture

#### Tier 2: Smart Recording (Phase 4-5) 🔄
**For**: Users with calendar integration  
**How**: Detect meetings, remind to record  
**Features**:
- Calendar integration shows meetings
- Notification: "Meeting starting in 5 min - Start recording?"
- One-tap to start local recording
- Auto-populate meeting metadata

**Pros**:
- Semi-automated
- Leverages calendar data
- Still private
- No platform API needed

#### Tier 3: Meeting Bot (Phase 7-8 or Premium Feature) 💎
**For**: Premium users or enterprise  
**How**: Cloud-based bots join meetings  
**Features**:
- Fully automatic recording
- Records all participants
- Video + audio capture
- Cloud storage
- Instant transcription

**Pros**:
- Completely hands-off
- Full meeting capture
- Professional quality

**Cons**:
- Expensive to run (cloud costs)
- Complex implementation
- Platform API costs
- Privacy/legal concerns
- Requires participant consent

---

## 📋 Implementation Roadmap

### Immediate (Phase 2): Local Recording
```typescript
// User manually starts recording
const { startRecording } = useAudioRecorder();

// Join Zoom meeting (in separate app)
// Tap "Record" in Cereal
// Meeting audio recorded locally
```

### Near-term (Phase 4-5): Smart Detection
```typescript
// Calendar integration
const upcomingMeeting = await getNextMeeting();

if (upcomingMeeting?.isVideoCall) {
  // Show notification 5 min before
  scheduleNotification({
    title: "Meeting starting soon",
    body: "Tap to start recording",
    time: upcomingMeeting.startTime - 5min,
  });
}
```

### Long-term (Phase 7+): Meeting Bots
```typescript
// Bot service (separate backend)
class MeetingBotService {
  async scheduleBot(meeting: CalendarEvent) {
    const platform = detectPlatform(meeting.meetingUrl);
    
    if (platform === 'zoom') {
      await this.zoomBotService.scheduleJoin(meeting);
    } else if (platform === 'teams') {
      await this.teamsBotService.scheduleJoin(meeting);
    }
  }
  
  async joinMeeting(meetingId: string) {
    // Bot joins meeting using platform SDK
    // Starts recording
    // Uploads to cloud
    // Triggers transcription
  }
}
```

---

## 🔐 Privacy & Legal Considerations

### Critical Requirements

1. **Consent**: All participants must know recording is happening
   - Bot must announce "This meeting is being recorded"
   - Visual indicator in meeting
   - Cannot record without consent

2. **Compliance**: 
   - GDPR compliance (EU users)
   - CCPA compliance (California)
   - Industry-specific (HIPAA for healthcare)
   - Platform Terms of Service

3. **Storage**:
   - Encrypted at rest
   - Access controls
   - Retention policies
   - Deletion capabilities

4. **Transparency**:
   - Privacy policy
   - User controls
   - Data export
   - Recording disclosure

---

## 💰 Cost Considerations

### Meeting Bot Infrastructure Costs

**Per-Meeting Costs**:
- Bot compute time: $0.05-0.20/hour
- Cloud storage: $0.023/GB/month
- Transcription API: $0.02-0.05/minute
- AI summary: $0.01-0.03/meeting
- Platform API costs: Varies

**Example**: 1-hour meeting
- Recording: $0.10
- Storage (1GB): $0.02/month
- Transcription: $1.20-3.00
- AI summary: $0.02
- **Total**: ~$1.35 per meeting + storage

**For 100 meetings/month**: ~$135-150/month in API costs

### Alternative: Local Recording (Phase 2)
- Recording: Free
- Storage: User's device (free)
- Transcription: $1.20-3.00
- AI summary: $0.02
- **Total**: ~$1.22 per meeting

---

## ✅ Recommended Implementation Plan

### Phase 2: Local Recording (4-6 weeks)
✅ **Implement First**
- User manually starts recording
- High-quality local audio capture
- Background recording support
- Pause/resume controls
- Auto-save on interruption

**User Flow**:
1. User joins Zoom/Teams meeting
2. Opens Cereal app
3. Taps "Record" button
4. Meeting audio captured locally
5. Stops when meeting ends
6. Transcription & AI summary generated

### Phase 4-5: Smart Integration (8-10 weeks)
🔄 **Add Intelligence**
- Calendar integration (Google/Outlook)
- Meeting detection from calendar
- Pre-meeting reminders
- One-tap recording start
- Auto-populate meeting metadata
- Link recording to calendar event

**User Flow**:
1. Calendar synced with Cereal
2. Meeting at 2 PM detected
3. Notification at 1:55 PM: "Meeting in 5 min"
4. User taps notification
5. Meeting details pre-filled
6. One tap to start recording

### Phase 7+: Meeting Bots (Premium Feature)
💎 **Premium/Enterprise Only**
- Cloud-based meeting bots
- Automatic joining
- Full meeting recording (all participants)
- Video + audio capture
- Instant transcription
- Zero user intervention

**User Flow**:
1. User enables "Auto-record" for work meetings
2. Meeting scheduled in calendar
3. Bot automatically joins at start time
4. Records entire meeting
5. Generates transcript & summary
6. User gets notification: "Meeting recorded & ready"

---

## 🎯 Recommended Approach

### For MVP/Phase 2: **Local Recording** ✅

**Why**:
- Simple to implement (4-6 weeks)
- No platform dependencies
- Privacy-friendly
- Free for users
- Works immediately
- Covers 80% of use cases

**Limitations**:
- Manual start/stop
- Only user's audio
- No automatic joining

### For Phase 4-5: **Smart Local Recording** 🎯

**Add**:
- Calendar integration
- Meeting detection
- Smart reminders
- One-tap recording

**Benefits**:
- 90% automation
- Still local/private
- No API costs
- Simple implementation

### For Future/Premium: **Meeting Bots** 💎

**When to implement**:
- After MVP validated
- User demand confirmed
- Budget for API costs
- Legal/compliance ready
- Enterprise customers identified

---

## 📝 Action Items

### Immediate (Phase 2)
1. ✅ Complete local recording implementation
2. ✅ Add high-quality audio capture
3. ✅ Implement background recording
4. ✅ Build recording UI with controls

### Next (Phase 4-5)
1. 🔄 Integrate calendar APIs
2. 🔄 Detect video meeting URLs
3. 🔄 Parse meeting metadata
4. 🔄 Add smart notifications
5. 🔄 One-tap recording start

### Future (Phase 7+)
1. ⏳ Research platform bot APIs
2. ⏳ Build proof-of-concept
3. ⏳ Evaluate costs
4. ⏳ Legal review
5. ⏳ Build backend infrastructure
6. ⏳ Implement bot services

---

## 🤔 Decision: Which Approach?

### For Cereal App

**Recommended**: Start with **Hybrid Approach**

**Phase 2**: Local recording (manual)  
**Phase 4-5**: Calendar integration + smart reminders  
**Phase 7+**: Meeting bots (premium feature if demand exists)

**Why**:
1. Get to market faster
2. Lower costs
3. Fewer privacy concerns
4. Works for 90% of users
5. Can add bots later as premium feature

**User Experience**:
- Phase 2: "Good enough" - manual but works
- Phase 4-5: "Great" - smart reminders, one-tap
- Phase 7+: "Amazing" - fully automatic (premium)

---

## 📊 Comparison Matrix

| Feature | Local Recording | Smart Local | Meeting Bots |
|---------|----------------|-------------|--------------|
| **Implementation** | Simple | Medium | Complex |
| **Time to build** | 4-6 weeks | 8-10 weeks | 16-20 weeks |
| **User effort** | Manual start | One tap | Zero |
| **Recording quality** | Your audio | Your audio | Full meeting |
| **Privacy** | High | High | Medium |
| **Cost** | Free | Free | $1-2/meeting |
| **Platform dependency** | None | Calendar API | All platforms |
| **Legal complexity** | Low | Low | High |
| **Reliability** | High | High | Medium |

---

## 🎯 Final Recommendation

### Build This (Phase 2-5):
```
Calendar Integration → Smart Detection → Reminder → One-Tap Recording → Local Capture
```

**Benefits**:
- 90% of bot convenience
- 10% of bot complexity
- Free for users
- Privacy-friendly
- Fast to build

### Consider This (Phase 7+ Premium):
```
Calendar → Bot Auto-Join → Cloud Recording → Instant Transcript → Zero Effort
```

**Benefits**:
- 100% automated
- Full meeting capture
- Premium revenue stream

**When**:
- After MVP validated
- Enterprise customers
- Budget available
- Legal ready

---

Would you like me to implement the **Smart Calendar Integration** approach for Phase 4-5? This would give you automatic meeting detection and smart recording prompts without the complexity of meeting bots.
