import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const FoldersScreen: React.FC = () => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#6366F1');

  // Mock folder data
  const folders = [
    {
      id: '1',
      name: 'Team Meetings',
      color: '#6366F1',
      description: 'Weekly standups and team syncs',
      meetingCount: 12,
      isSmart: false,
      recentMeetings: ['Weekly Standup', 'Sprint Planning', 'Retrospective'],
    },
    {
      id: '2',
      name: 'Client Calls',
      color: '#8B5CF6',
      description: 'External client meetings and demos',
      meetingCount: 8,
      isSmart: false,
      recentMeetings: ['Q4 Planning', 'Product Demo', 'Feedback Session'],
    },
    {
      id: '3',
      name: 'AI Generated',
      color: '#EC4899',
      description: 'Meetings with AI/ML discussions',
      meetingCount: 5,
      isSmart: true,
      recentMeetings: ['ML Model Review', 'AI Strategy', 'Data Analysis'],
    },
    {
      id: '4',
      name: 'Project Reviews',
      color: '#10B981',
      description: 'Project status and milestone reviews',
      meetingCount: 15,
      isSmart: false,
      recentMeetings: ['Sprint Review', 'Milestone Check', 'Progress Update'],
    },
  ];

  const colors = [
    '#6366F1', '#8B5CF6', '#EC4899', '#10B981',
    '#F59E0B', '#EF4444', '#06B6D4', '#84CC16',
  ];

  const createFolder = () => {
    if (newFolderName.trim()) {
      // TODO: Create folder in store/database
      setNewFolderName('');
      setNewFolderColor('#6366F1');
      setShowCreateModal(false);
    }
  };

  const renderGridView = () => (
    <View style={styles.gridContainer}>
      {folders.map(folder => (
        <Card key={folder.id} style={styles.gridCard}>
          <View style={styles.folderHeader}>
            <View style={[styles.folderIcon, { backgroundColor: folder.color }]}>
              <Icon name="folder" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.folderInfo}>
              <Text style={[styles.folderName, { color: theme.colors.text }]}>
                {folder.name}
              </Text>
              <Text style={[styles.folderCount, { color: theme.colors.textSecondary }]}>
                {folder.meetingCount} meetings
              </Text>
            </View>
            {folder.isSmart && (
              <Icon name="auto-awesome" size={16} color={theme.colors.accent} />
            )}
          </View>
          
          <Text style={[styles.folderDescription, { color: theme.colors.textSecondary }]}>
            {folder.description}
          </Text>
          
          <View style={styles.recentMeetings}>
            <Text style={[styles.recentTitle, { color: theme.colors.textSecondary }]}>
              Recent:
            </Text>
            {folder.recentMeetings.slice(0, 2).map((meeting, index) => (
              <Text key={index} style={[styles.recentMeeting, { color: theme.colors.textSecondary }]}>
                • {meeting}
              </Text>
            ))}
          </View>
        </Card>
      ))}
    </View>
  );

  const renderListView = () => (
    <View style={styles.listContainer}>
      {folders.map(folder => (
        <Card key={folder.id} style={styles.listCard}>
          <View style={styles.listItemHeader}>
            <View style={[styles.listFolderIcon, { backgroundColor: folder.color }]}>
              <Icon name="folder" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.listFolderInfo}>
              <Text style={[styles.listFolderName, { color: theme.colors.text }]}>
                {folder.name}
              </Text>
              <Text style={[styles.listFolderDescription, { color: theme.colors.textSecondary }]}>
                {folder.description}
              </Text>
            </View>
            <View style={styles.listFolderMeta}>
              <Text style={[styles.listFolderCount, { color: theme.colors.textSecondary }]}>
                {folder.meetingCount}
              </Text>
              {folder.isSmart && (
                <Icon name="auto-awesome" size={16} color={theme.colors.accent} />
              )}
            </View>
          </View>
        </Card>
      ))}
    </View>
  );

  const renderCreateModal = () => (
    <Modal
      visible={showCreateModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowCreateModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Create New Folder
            </Text>
            <TouchableOpacity onPress={() => setShowCreateModal(false)}>
              <Icon name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalBody}>
            <TextInput
              style={[styles.folderNameInput, { 
                color: theme.colors.text,
                borderColor: theme.colors.border,
              }]}
              placeholder="Folder name"
              placeholderTextColor={theme.colors.placeholder}
              value={newFolderName}
              onChangeText={setNewFolderName}
            />
            
            <Text style={[styles.colorLabel, { color: theme.colors.text }]}>
              Choose a color:
            </Text>
            <View style={styles.colorPicker}>
              {colors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    newFolderColor === color && styles.selectedColor,
                  ]}
                  onPress={() => setNewFolderColor(color)}
                />
              ))}
            </View>
          </View>
          
          <View style={styles.modalActions}>
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => setShowCreateModal(false)}
              style={styles.modalButton}
            />
            <Button
              title="Create"
              onPress={createFolder}
              style={styles.modalButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Folders
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.viewModeButton}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <Icon 
              name={viewMode === 'grid' ? 'view-list' : 'view-module'} 
              size={24} 
              color={theme.colors.textSecondary} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setShowCreateModal(true)}
          >
            <Icon name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {viewMode === 'grid' ? renderGridView() : renderListView()}
      </ScrollView>

      {/* Create Folder Modal */}
      {renderCreateModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  viewModeButton: {
    padding: 8,
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  gridCard: {
    width: '47%',
    minHeight: 160,
  },
  folderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  folderIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  folderInfo: {
    flex: 1,
  },
  folderName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  folderCount: {
    fontSize: 12,
  },
  folderDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  recentMeetings: {
    marginTop: 'auto',
  },
  recentTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  recentMeeting: {
    fontSize: 12,
    marginBottom: 2,
  },
  listContainer: {
    padding: 16,
  },
  listCard: {
    marginBottom: 12,
  },
  listItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listFolderIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listFolderInfo: {
    flex: 1,
  },
  listFolderName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  listFolderDescription: {
    fontSize: 14,
  },
  listFolderMeta: {
    alignItems: 'center',
  },
  listFolderCount: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 16,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  modalBody: {
    marginBottom: 24,
  },
  folderNameInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#000',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});