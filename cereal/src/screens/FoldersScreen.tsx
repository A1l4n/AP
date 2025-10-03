import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const FoldersScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const folders = [
    {
      id: '1',
      name: 'Work Meetings',
      color: '#6366F1',
      meetingCount: 24,
      recentMeetings: ['Team Standup', 'Project Review'],
      isSmart: false,
    },
    {
      id: '2',
      name: 'Client Calls',
      color: '#8B5CF6',
      meetingCount: 12,
      recentMeetings: ['Q1 Review', 'Product Demo'],
      isSmart: false,
    },
    {
      id: '3',
      name: 'AI Generated',
      color: '#EC4899',
      meetingCount: 8,
      recentMeetings: ['Auto-categorized meetings'],
      isSmart: true,
    },
    {
      id: '4',
      name: 'Personal',
      color: '#10B981',
      meetingCount: 5,
      recentMeetings: ['Family Call', 'Doctor Appointment'],
      isSmart: false,
    },
  ];

  const renderFolderCard = ({ item }: { item: typeof folders[0] }) => (
    <Card style={styles.folderCard}>
      <View style={styles.folderHeader}>
        <View style={[styles.folderIcon, { backgroundColor: item.color }]}>
          <Ionicons name="folder" size={24} color={colors.background} />
        </View>
        <View style={styles.folderInfo}>
          <Text style={styles.folderName}>{item.name}</Text>
          <Text style={styles.folderCount}>{item.meetingCount} meetings</Text>
        </View>
        {item.isSmart && (
          <View style={styles.smartBadge}>
            <Ionicons name="sparkles" size={16} color={colors.accent} />
          </View>
        )}
      </View>
      
      <View style={styles.recentMeetings}>
        <Text style={styles.recentTitle}>Recent:</Text>
        {item.recentMeetings.map((meeting, index) => (
          <Text key={index} style={styles.recentMeeting}>
            • {meeting}
          </Text>
        ))}
      </View>
      
      <View style={styles.folderActions}>
        <Button
          title="View"
          size="small"
          variant="outline"
          style={styles.folderButton}
          onPress={() => {
            // TODO: Navigate to folder contents
          }}
        />
        <Button
          title="Edit"
          size="small"
          variant="ghost"
          style={styles.folderButton}
          onPress={() => {
            // TODO: Open folder edit modal
          }}
        />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Folders</Text>
          <Text style={styles.headerSubtitle}>Organize your meetings</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.viewToggle}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <Ionicons
              name={viewMode === 'grid' ? 'list-outline' : 'grid-outline'}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>49</Text>
            <Text style={styles.statLabel}>Total Meetings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Folders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12h</Text>
            <Text style={styles.statLabel}>Total Duration</Text>
          </View>
        </Card>
      </View>

      {/* Folders List */}
      <View style={styles.foldersContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Folders</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Manage</Text>
          </TouchableOpacity>
        </View>

        {viewMode === 'grid' ? (
          <FlatList
            data={folders}
            renderItem={renderFolderCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.gridContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {folders.map((folder) => (
              <Card key={folder.id} style={styles.listFolderCard}>
                <View style={styles.listFolderHeader}>
                  <View style={[styles.listFolderIcon, { backgroundColor: folder.color }]}>
                    <Ionicons name="folder" size={20} color={colors.background} />
                  </View>
                  <View style={styles.listFolderInfo}>
                    <Text style={styles.listFolderName}>{folder.name}</Text>
                    <Text style={styles.listFolderCount}>{folder.meetingCount} meetings</Text>
                  </View>
                  {folder.isSmart && (
                    <View style={styles.listSmartBadge}>
                      <Ionicons name="sparkles" size={14} color={colors.accent} />
                    </View>
                  )}
                  <TouchableOpacity style={styles.listFolderMenu}>
                    <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Create Folder FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          // TODO: Open create folder modal
        }}
      >
        <Ionicons name="add" size={24} color={colors.background} />
      </TouchableOpacity>
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
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  viewToggle: {
    padding: spacing.sm,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Stats
  statsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  
  // Folders
  foldersContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
  },
  seeAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontFamily: typography.fontFamily.medium,
  },
  
  // Grid View
  gridContainer: {
    paddingHorizontal: spacing.lg,
  },
  folderCard: {
    flex: 1,
    margin: spacing.xs,
    minHeight: 200,
  },
  folderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  folderIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  folderInfo: {
    flex: 1,
  },
  folderName: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
  },
  folderCount: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  smartBadge: {
    padding: spacing.xs,
  },
  
  recentMeetings: {
    marginBottom: spacing.md,
  },
  recentTitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  recentMeeting: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  
  folderActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 'auto',
  },
  folderButton: {
    flex: 1,
  },
  
  // List View
  listFolderCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  listFolderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listFolderIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  listFolderInfo: {
    flex: 1,
  },
  listFolderName: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
  },
  listFolderCount: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  listSmartBadge: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  listFolderMenu: {
    padding: spacing.sm,
  },
  
  // FAB
  fab: {
    position: 'absolute',
    bottom: 80,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});