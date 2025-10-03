import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const MeetingDetailScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'actions'>('summary');

  // Mock data - in real app this would come from props or state
  const meeting = {
    id: '1',
    title: 'Weekly Team Standup',
    date: new Date(),
    duration: 2700, // 45 minutes
    attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    platform: 'teams',
    summary: {
      executive: 'The team discussed progress on Q1 projects, identified blockers, and planned next week\'s priorities.',
      keyPoints: [
        'Project Alpha is 80% complete',
        'Need to resolve API integration issues',
        'Client demo scheduled for next Friday',
      ],
      decisions: [
        'Move Project Beta deadline to March 15th',
        'Assign Mike to API integration task',
      ],
      followUps: [
        'Schedule follow-up with client',
        'Update project timeline',
      ],
      sentiment: 'positive' as const,
    },
    actionItems: [
      {
        id: '1',
        text: 'Fix API integration issues',
        assignee: 'Mike Johnson',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        completed: false,
        priority: 'high' as const,
      },
      {
        id: '2',
        text: 'Prepare client demo presentation',
        assignee: 'Jane Smith',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        completed: false,
        priority: 'medium' as const,
      },
    ],
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderSummaryTab = () => (
    <View style={styles.tabContent}>
      <Card style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Executive Summary</Text>
        <Text style={styles.summaryText}>{meeting.summary.executive}</Text>
      </Card>

      <Card style={styles.keyPointsCard}>
        <Text style={styles.sectionTitle}>Key Points</Text>
        {meeting.summary.keyPoints.map((point, index) => (
          <View key={index} style={styles.keyPointItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.keyPointText}>{point}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.decisionsCard}>
        <Text style={styles.sectionTitle}>Decisions Made</Text>
        {meeting.summary.decisions.map((decision, index) => (
          <View key={index} style={styles.decisionItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.decisionText}>{decision}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.followUpsCard}>
        <Text style={styles.sectionTitle}>Follow-ups</Text>
        {meeting.summary.followUps.map((followUp, index) => (
          <View key={index} style={styles.followUpItem}>
            <Ionicons name="arrow-forward-circle" size={20} color={colors.primary} />
            <Text style={styles.followUpText}>{followUp}</Text>
          </View>
        ))}
      </Card>
    </View>
  );

  const renderTranscriptTab = () => (
    <View style={styles.tabContent}>
      <Card style={styles.transcriptCard}>
        <Text style={styles.transcriptPlaceholder}>
          Transcript will appear here once processing is complete.
        </Text>
        <Text style={styles.transcriptSubtext}>
          The AI is currently analyzing the audio and generating a detailed transcript with speaker identification.
        </Text>
      </Card>
    </View>
  );

  const renderActionsTab = () => (
    <View style={styles.tabContent}>
      {meeting.actionItems.map((action) => (
        <Card key={action.id} style={styles.actionCard}>
          <View style={styles.actionHeader}>
            <View style={styles.actionInfo}>
              <Text style={styles.actionText}>{action.text}</Text>
              <Text style={styles.actionAssignee}>Assigned to: {action.assignee}</Text>
              <Text style={styles.actionDueDate}>
                Due: {action.dueDate.toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.actionPriority}>
              <View style={[
                styles.priorityBadge,
                action.priority === 'high' ? styles.highPriority :
                action.priority === 'medium' ? styles.mediumPriority : styles.lowPriority
              ]}>
                <Text style={styles.priorityText}>{action.priority}</Text>
              </View>
            </View>
          </View>
          <View style={styles.actionActions}>
            <Button
              title={action.completed ? 'Completed' : 'Mark Complete'}
              size="small"
              variant={action.completed ? 'secondary' : 'primary'}
              style={styles.actionButton}
              onPress={() => {
                // TODO: Toggle completion status
              }}
            />
          </View>
        </Card>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{meeting.title}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Meeting Info */}
      <Card style={styles.meetingInfoCard}>
        <View style={styles.meetingInfo}>
          <View style={styles.meetingMeta}>
            <Text style={styles.meetingDate}>{formatDate(meeting.date)}</Text>
            <Text style={styles.meetingDuration}>{formatDuration(meeting.duration)}</Text>
            <View style={styles.platformBadge}>
              <Text style={styles.platformText}>{meeting.platform}</Text>
            </View>
          </View>
          <View style={styles.meetingAttendees}>
            <Ionicons name="people" size={16} color={colors.textSecondary} />
            <Text style={styles.attendeesText}>
              {meeting.attendees.join(', ')}
            </Text>
          </View>
        </View>
      </Card>

      {/* Audio Player Placeholder */}
      <Card style={styles.audioPlayerCard}>
        <View style={styles.audioPlayer}>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={24} color={colors.background} />
          </TouchableOpacity>
          <View style={styles.audioInfo}>
            <Text style={styles.audioTitle}>Audio Playback</Text>
            <Text style={styles.audioSubtitle}>Click to play recording</Text>
          </View>
          <TouchableOpacity style={styles.speedButton}>
            <Text style={styles.speedText}>1x</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <View style={styles.tabs}>
          {[
            { key: 'summary', label: 'Summary', icon: 'document-text' },
            { key: 'transcript', label: 'Transcript', icon: 'list' },
            { key: 'actions', label: 'Actions', icon: 'checkmark-circle' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Ionicons
                name={tab.icon as any}
                size={20}
                color={activeTab === tab.key ? colors.primary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'summary' && renderSummaryTab()}
        {activeTab === 'transcript' && renderTranscriptTab()}
        {activeTab === 'actions' && renderActionsTab()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerButton: {
    padding: spacing.sm,
  },
  
  // Meeting Info
  meetingInfoCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  meetingInfo: {
    gap: spacing.sm,
  },
  meetingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  meetingDate: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
  },
  meetingDuration: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  platformBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  platformText: {
    fontSize: typography.fontSize.xs,
    color: colors.background,
    fontFamily: typography.fontFamily.medium,
    textTransform: 'uppercase',
  },
  meetingAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  
  // Audio Player
  audioPlayerCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  audioInfo: {
    flex: 1,
  },
  audioTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
  },
  audioSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  speedButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
  },
  speedText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    fontFamily: typography.fontFamily.medium,
  },
  
  // Tabs
  tabsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.background,
  },
  
  // Content
  content: {
    flex: 1,
  },
  tabContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  
  // Summary Tab
  summaryCard: {
    marginBottom: spacing.md,
  },
  summaryTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  summaryText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.sm,
  },
  
  keyPointsCard: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  keyPointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: spacing.sm,
  },
  keyPointText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.sm,
  },
  
  decisionsCard: {
    marginBottom: spacing.md,
  },
  decisionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  decisionText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    lineHeight: typography.lineHeight.sm,
  },
  
  followUpsCard: {
    marginBottom: spacing.md,
  },
  followUpItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  followUpText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    lineHeight: typography.lineHeight.sm,
  },
  
  // Transcript Tab
  transcriptCard: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  transcriptPlaceholder: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  transcriptSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.sm,
  },
  
  // Actions Tab
  actionCard: {
    marginBottom: spacing.md,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  actionInfo: {
    flex: 1,
  },
  actionText: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  actionAssignee: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  actionDueDate: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  actionPriority: {
    marginLeft: spacing.md,
  },
  priorityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  highPriority: {
    backgroundColor: colors.error,
  },
  mediumPriority: {
    backgroundColor: colors.warning,
  },
  lowPriority: {
    backgroundColor: colors.success,
  },
  priorityText: {
    fontSize: typography.fontSize.xs,
    color: colors.background,
    fontFamily: typography.fontFamily.medium,
    textTransform: 'uppercase',
  },
  actionActions: {
    alignItems: 'flex-end',
  },
  actionButton: {
    minWidth: 120,
  },
});