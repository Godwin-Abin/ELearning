import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

import PlayIcon from '../assets/play.svg';
import LockIcon from '../assets/lock.svg';
import CompletedIcon from '../assets/compleated.svg';
import DropDownIcon from '../assets/drop-down.svg';
import UpArrowIcon from '../assets/up-arrow.svg';
import CheckIcon from '../assets/compleated.svg';

const lessonsData = [
  {
    title: 'Lesson 1',
    topics: [
      { title: 'Introduction', duration: '2:05', status: 'completed' },
      { title: 'fundamentals of maths', duration: '2:05', status: 'playing' },
      { title: 'calculus', duration: '2:05', status: 'locked' },
      { title: 'set theory', duration: '2:05', status: 'locked' },
      { title: 'functions', duration: '2:05', status: 'locked' },
    ],
  },
  {
    title: 'Lesson 2',
    topics: [
      { title: 'Advanced Topics', duration: '5:15', status: 'locked' },
    ],
  },
];

const VideoPlayerScreen = ({ route }) => {
  const { course } = route.params || { course: { title: 'Maths' } };
  const [expandedLesson, setExpandedLesson] = useState('Lesson 1');

  const getTopicIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CompletedIcon width={24} height={24} />;
      case 'playing':
        return <PlayIcon width={24} height={24} />;
      case 'locked':
        return <LockIcon width={24} height={24} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Video Player */}
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }} // Example video
          style={styles.videoPlayer}
          controls={true}
          resizeMode="cover"
        />
      </View>

      {/* Course Info */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.courseTitle}>Introduction</Text>
          <Text style={styles.courseSubtitle}>Fundamentals of {course.title}</Text>
        </View>
        <TouchableOpacity style={styles.markCompletedButton}>
          <CheckIcon width={16} height={16} />
          <Text style={styles.markCompletedText}>Mark as Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Lessons Accordion */}
      {lessonsData.map((lesson) => (
        <View key={lesson.title} style={styles.lessonContainer}>
          <TouchableOpacity
            style={styles.lessonHeader}
            onPress={() => setExpandedLesson(expandedLesson === lesson.title ? null : lesson.title)}
          >
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            {expandedLesson === lesson.title ? (
              <UpArrowIcon width={20} height={20} />
            ) : (
              <DropDownIcon width={20} height={20} />
            )}
          </TouchableOpacity>
          {expandedLesson === lesson.title && (
            <View>
              {lesson.topics.map((topic, index) => (
                <View
                  key={index}
                  style={[
                    styles.topicItem,
                    topic.status === 'playing' && styles.playingTopic,
                  ]}
                >
                  {getTopicIcon(topic.status)}
                  <Text
                    style={[
                      styles.topicTitle,
                      topic.status === 'playing' && { color: '#fff' },
                    ]}
                  >
                    {topic.title}
                  </Text>
                  <Text
                    style={[
                      styles.topicDuration,
                      topic.status === 'playing' && { color: '#fff' },
                    ]}
                  >
                    {topic.duration}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoContainer: {
    height: 250,
    backgroundColor: '#000',
  },
  videoPlayer: {
    ...StyleSheet.absoluteFillObject,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  courseSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  markCompletedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#6C63FF',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  markCompletedText: {
    color: '#6C63FF',
    marginLeft: 8,
  },
  lessonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 10,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  playingTopic: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    marginVertical: 5,
  },
  topicTitle: {
    flex: 1,
    marginLeft: 15,
    fontSize: 14,
  },
  topicDuration: {
    fontSize: 14,
    color: '#888',
  },
});

export default VideoPlayerScreen;