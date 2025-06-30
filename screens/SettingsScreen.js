import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import Info from '../assets/information.svg';
import Payment from '../assets/payment-history.svg';
import Arrow from '../assets/right-arrow.svg';

const courses = [
  {
    title: '3D Art & Illustration',
    hours: '18 Hour Spend',
    progress: 0.5,
    color: '#6C63FF',
  },
  {
    title: 'Derivation',
    hours: '14 Hour Spend',
    progress: 0.7,
    color: '#3EC6E0',
  },
  {
    title: 'Business',
    hours: '18 Hour Spend',
    progress: 0.5,
    color: '#FF6B81',
  },
];

const accountOptions = [
  { label: 'Educational Information', icon: Info },
  { label: 'Payment History', icon: Payment },
  { label: 'Payment History', icon: Payment },
];

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/person.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Melissa Brown</Text>
        <Text style={styles.profileEmail}>melissabrown@gmail.com</Text>
      </View>

      {/* Courses Section */}
      <Text style={styles.sectionTitle}>Course You're Taking</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.coursesRow}>
        {courses.map((course, idx) => (
          <View key={idx} style={[styles.courseCard, { backgroundColor: course.color }]}>
            <View>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseHours}>{course.hours}</Text>
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.coursePercent}>{`${Math.round(course.progress * 100)}%`}</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${course.progress * 100}%` }]} />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.accountSection}>
        {accountOptions.map((option, idx) => {
          const IconComponent = option.icon;
          return (
            <TouchableOpacity key={idx} style={styles.accountOption}>
              <View style={styles.accountIcon}><IconComponent width={24} height={24} /></View>
              <Text style={styles.accountLabel}>{option.label}</Text>
              {/* <Text style={styles.accountArrow}>{'>'}</Text> */}
              <Arrow height={18} width={18} />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 20,
    paddingTop :'25%',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  profileEmail: {
    fontSize: 15,
    color: '#888',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
    marginTop: 18,
  },
  coursesRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  courseCard: {
    width: 190,
    height: 130,
    borderRadius: 16,
    padding: 16,
    marginRight: 14,
    justifyContent: 'space-between',
  },
  courseTitle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 4,
  },
  courseHours: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:8,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  coursePercent: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 10,
  },
  accountSection: {
    marginTop: 8,
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  accountIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#F0F0F0', // Placeholder for icon
    borderRadius: 6,
    marginRight: 14,
  },
  accountLabel: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  accountArrow: {
    fontSize: 18,
    color: '#bbb',
    marginLeft: 8,
  },
});
