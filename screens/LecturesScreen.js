import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LeftArrow from '../assets/back-arrow.svg';

// Dummy data - replace with your actual data
const allLectures = [
  {
    id: '1',
    title: 'Maths',
    status: 'Running...',
    progress: 0.4,
    icon: require('../assets/maths.jpg'),
  },
  {
    id: '2',
    title: 'UIUX',
    status: 'Running...',
    progress: 0.6,
    icon: require('../assets/ui-ux.jpg'),
  },
  {
    id: '3',
    title: '3D Art',
    status: 'Running...',
    progress: 0.3,
    icon: require('../assets/3d-art-illution.jpg'),
  },
  {
    id: '4',
    title: 'History',
    status: 'Finished',
    progress: 1,
    icon: require('../assets/history.jpg'),
  },
  {
    id: '5',
    title: 'Python',
    status: 'Running...',
    progress: 0.8,
    icon: require('../assets/derivation.jpg'),
  },
  {
    id: '6',
    title: 'Biology',
    status: 'Finished',
    progress: 1,
    icon: require('../assets/biology.jpg'),
  },
  {
    id: '7',
    title: 'Editing',
    status: 'Finished',
    progress: 1,
    icon: require('../assets/photoshop.jpg'),
  },
];

const LecturesScreen = () => {
  const [activeTab, setActiveTab] = useState('lectures');
  const navigation = useNavigation();

  const lecturesToDisplay = allLectures.filter((lecture) => {
    if (activeTab === 'ongoing') {
      return lecture.status === 'Running...';
    }
    if (activeTab === 'completed') {
      return lecture.status === 'Finished';
    }
    return true; // For 'lectures' tab, show all
  });

  const handleCoursePress = (course) => {
    if (course.status === 'Running...') {
      navigation.navigate('VideoPlayer', { course });
    }
  };

  const renderLectureItem = (item) => {
    const isFinished = item.status === 'Finished';
    const progressColor = isFinished ? '#2EC4B6' : '#6A6AE9';

    return (
      <TouchableOpacity key={item.id} style={styles.lectureItem} onPress={() => handleCoursePress(item)}>
        <Image source={item.icon} style={styles.lectureIcon} />
        <View style={styles.lectureInfo}>
          <Text style={styles.lectureTitle}>{item.title}</Text>
          <Text style={[styles.lectureStatus, { color: isFinished ? '#2EC4B6' : '#8A8A8A' }]}>
            {item.status}
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${item.progress * 100}%`, backgroundColor: progressColor }]} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <LeftArrow width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's lectures</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['lectures', 'ongoing', 'completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lectures List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {lecturesToDisplay.map(renderLectureItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 15,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6A6AE9',
  },
  tabText: {
    fontSize: 16,
    color: '#8A8A8A',
  },
  activeTabText: {
    color: '#6A6AE9',
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  lectureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  lectureIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  lectureInfo: {
    flex: 1,
  },
  lectureTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  lectureStatus: {
    fontSize: 14,
    marginTop: 3,
  },
  progressContainer: {
    width: 100,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
});

export default LecturesScreen; 