import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const MeetingDetailScreen: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'actions'>('summary');

  // Mock data - in real app, this would come from props or state
  const meeting = {
    id: '1',
    title: 'Weekly Planning Meeting',
    date: new Date(),
    duration: 2700, // 45 minutes
    attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    summary: {
      executive: 'The team discussed Q4 priorities and resource allocation. Key decisions were made regarding the new feature rollout timeline.',
      keyPoints: [
        'Q4 roadmap finalized',
        'Resource allocation approved',
        'New feature timeline established',
        'Budget constraints discussed',
      ],
      decisions: [
        'Postpone feature X to Q1',
        'Increase team size by 2 developers',
        'Budget increase of 15% approved',
      ],
      followUps: [
        'Schedule follow-up with stakeholders',
        'Prepare detailed timeline document',
        'Update project management system',
      ],
      sentiment: 'positive' as const,
      confidence: 0.92,
    },
    actionItems: [
      {
        id: '1',
        text: 'Prepare detailed timeline document',
        assignee: 'John Doe',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        completed: false,
        createdAt: new Date(),
      },
      {
        id: '2',
        text: 'Update project management system',
        assignee: 'Jane Smith',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        completed: false,
        createdAt: new Date(),
      },
    ],
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderSummary = () => (
    <View style={styles.tabContent}>
      <Card style={styles.summaryCard}>
        <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
          Executive Summary
        </Text>
        <Text style={[styles.summaryText, { color: theme.colors.text }]}>
          {meeting.summary.executive}
        </Text>
      </Card>

      <Card style={styles.summaryCard}>
        <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
          Key Points
        </Text>
        {meeting.summary.keyPoints.map((point, index) => (
          <View key={index} style={styles.keyPointItem}>
            <Icon name="check-circle" size={16} color={theme.colors.success} />
            <Text style={[styles.keyPointText, { color: theme.colors.text }]}>
              {point}
            </Text>
          </View>
        ))}
      </Card>

      <Card style={styles.summaryCard}>
        <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
          Decisions Made
        </Text>
        {meeting.summary.decisions.map((decision, index) => (
          <View key={index} style={styles.decisionItem}>
            <Icon name="gavel" size={16} color={theme.colors.primary} />
            <Text style={[styles.decisionText, { color: theme.colors.text }]}>
              {decision}
            </Text>
          </View>
        ))}
      </Card>
    </View>
  );

  const renderTranscript = () => (
    <View style={styles.tabContent}>
      <Card style={styles.transcriptCard}>
        <Text style={[styles.transcriptText, { color: theme.colors.text }]}>
          [00:00] John Doe: Welcome everyone to our weekly planning meeting. Let's start by reviewing our Q4 priorities.
        </Text>
        <Text style={[styles.transcriptText, { color: theme.colors.text }]}>
          [00:15] Jane Smith: I've prepared the roadmap document. We need to discuss the timeline for the new feature rollout.
        </Text>
        <Text style={[styles.transcriptText, { color: theme.colors.text }]}>
          [00:32] Mike Johnson: Based on our current resources, I think we should consider postponing feature X to Q1.
        </Text>
        <Text style={[styles.transcriptText, { color: theme.colors.text }]}>
          [00:45] John Doe: That makes sense. Let's also discuss the budget implications of this change.
        </Text>
        <Text style={[styles.transcriptText, { color: theme.colors.text }]}>
          [01:02] Jane Smith: I'll prepare a detailed timeline document and update the project management system.
        </Text>
      </Card>
    </View>
  );

  const renderActionItems = () => (
    <View style={styles.tabContent}>
      {meeting.actionItems.map((item) => (
        <Card key={item.id} style={styles.actionItemCard}>
          <View style={styles.actionItemHeader}>
            <TouchableOpacity style={styles.checkbox}>
              <Icon 
                name={item.completed ? "check-box" : "check-box-outline-blank"} 
                size={20} 
                color={item.completed ? theme.colors.success : theme.colors.textSecondary} 
              />
            </TouchableOpacity>
            <View style={styles.actionItemContent}>
              <Text style={[
                styles.actionItemText, 
                { 
                  color: theme.colors.text,
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                }
              ]}>
                {item.text}
              </Text>
              <View style={styles.actionItemMeta}>
                <Text style={[styles.assignee, { color: theme.colors.textSecondary }]}>
                  {item.assignee}
                </Text>
                <Text style={[styles.dueDate, { color: theme.colors.textSecondary }]}>
                  Due: {item.dueDate.toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.meetingTitle, { color: theme.colors.text }]}>
          {meeting.title}
        </Text>
        <Text style={[styles.meetingDate, { color: theme.colors.textSecondary }]}>
          {formatDate(meeting.date)}
        </Text>
        <Text style={[styles.meetingDuration, { color: theme.colors.textSecondary }]}>
          Duration: {formatDuration(meeting.duration)}
        </Text>
      </View>

      {/* Audio Player */}
      <Card style={styles.audioPlayer}>
        <View style={styles.audioControls}>
          <TouchableOpacity style={styles.playButton}>
            <Icon name="play-arrow" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { backgroundColor: theme.colors.primary }]} />
          </View>
          <Text style={[styles.timeText, { color: theme.colors.textSecondary }]}>
            00:00 / {formatDuration(meeting.duration)}
          </Text>
        </View>
      </Card>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'summary' && styles.activeTab,
            { borderBottomColor: theme.colors.primary },
          ]}
          onPress={() => setActiveTab('summary')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'summary' ? theme.colors.primary : theme.colors.textSecondary },
          ]}>
            Summary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'transcript' && styles.activeTab,
            { borderBottomColor: theme.colors.primary },
          ]}
          onPress={() => setActiveTab('transcript')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'transcript' ? theme.colors.primary : theme.colors.textSecondary },
          ]}>
            Transcript
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'actions' && styles.activeTab,
            { borderBottomColor: theme.colors.primary },
          ]}
          onPress={() => setActiveTab('actions')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'actions' ? theme.colors.primary : theme.colors.textSecondary },
          ]}>
            Actions
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'summary' && renderSummary()}
        {activeTab === 'transcript' && renderTranscript()}
        {activeTab === 'actions' && renderActionItems()}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Button title="Share" variant="outline" style={styles.actionButton} />
        <Button title="Export" variant="outline" style={styles.actionButton} />
        <Button title="Delete" variant="outline" style={[styles.actionButton, { borderColor: theme.colors.error }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  meetingTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  meetingDate: {
    fontSize: 16,
    marginBottom: 4,
  },
  meetingDuration: {
    fontSize: 14,
  },
  audioPlayer: {
    margin: 16,
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progress: {
    width: '30%',
    height: '100%',
    borderRadius: 2,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6366F1',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
  },
  keyPointItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  keyPointText: {
    flex: 1,
    fontSize: 14,
  },
  decisionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  decisionText: {
    flex: 1,
    fontSize: 14,
  },
  transcriptCard: {
    padding: 16,
  },
  transcriptText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  actionItemCard: {
    marginBottom: 12,
  },
  actionItemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    marginTop: 2,
  },
  actionItemContent: {
    flex: 1,
  },
  actionItemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  actionItemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assignee: {
    fontSize: 12,
  },
  dueDate: {
    fontSize: 12,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});