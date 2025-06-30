import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import BellIcon from '../assets/notification.svg';
import PlayIcon from '../assets/white-play-button.svg';

const { width } = Dimensions.get('window');

const courseImages = {
  'ui-ux': require('../assets/ui-ux.png'),
  'derivation': require('../assets/derivation.png'),
  'photoshop': require('../assets/photoshop.png'),
  'business': require('../assets/business.png'),
};

const coursePlayColors = {
  'ui-ux': '#7E66FF',
  'derivation': '#00CFFF',
  'photoshop': '#00CFFF',
  'business': '#FF5B7E',
};

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/person.jpg')} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.greeting}>Hey, Melissa 👋</Text>
          <Text style={styles.subtext}>let's get started</Text>
        </View>
        <TouchableOpacity style={styles.notification}>
          <BellIcon width={24} height={24} />
          <View style={styles.redDot} />
        </TouchableOpacity>
      </View>

      {/* Ongoing Course */}
      <View style={styles.ongoingCard}>
        <Text style={styles.ongoingLabel}>ongoing</Text>
        <Text style={styles.courseTitle}>3D Art & Illustration</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '50%' }]} />
        </View>
        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/3d-art-illution.png')}
          style={styles.ongoingImage}
        />
      </View>

      {/* Dots */}
      <View style={styles.dots}>
        <View style={[styles.dot, { backgroundColor: '#7E66FF' }]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Choose Course */}
      <Text style={styles.sectionTitle}>Choose Your Course</Text>
      <View style={styles.grid}>
        {[
          { title: 'UI/UX Design', count: '03 Classes', color: '#A7A7FB', iconKey: 'ui-ux' },
          { title: 'Derivation', count: '05 Classes', color: '#7DE0F6', iconKey: 'derivation' },
          { title: 'Photoshop', count: '08 Classes', color: '#97D0F3', iconKey: 'photoshop' },
          { title: 'Business', count: '03 Classes', color: '#FFA5B0', iconKey: 'business' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: item.color }]}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardCount}>{item.count}</Text>

            <View style={styles.cardIconWrap}>
            <View style={[styles.playCircle, { backgroundColor: coursePlayColors[item.iconKey] }]}>
              <PlayIcon width={18} height={18} />
            </View>
              <Image source={courseImages[item.iconKey]} style={styles.cardIcon} />
            </View>

          </TouchableOpacity>
        ))}
      </View>

      {/* Today's Lecture */}
      <Text style={styles.sectionTitle}>Today's Lecture</Text>
      <View style={styles.lectureCard}>
        <View style={styles.lectureIconWrap}>
          <Image source={require('../assets/maths.jpg')} style={styles.lectureIcon} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.lectureTitle}>Maths</Text>
          <Text style={styles.lectureStatus}>Running...</Text>
          <View style={styles.lectureProgressBarBg}>
            <View style={styles.lectureProgressBarFill} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  subtext: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  notification: {
    marginLeft: 'auto',
    position: 'relative',
    padding: 4,
  },
  redDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 1,
    borderColor: '#fff',
  },
  ongoingCard: {
    backgroundColor: '#7E66FF',
    borderRadius: 24,
    padding: 20,
    marginVertical: 16,
    minHeight: 180,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  ongoingLabel: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  courseTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  progressBarBg: {
    width: '60%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginVertical: 10,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  continueBtn: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  continueText: {
    color: '#7E66FF',
    fontWeight: '600',
    fontSize: 16,
  },
  ongoingImage: {
    position: 'absolute',
    right: 10,
    top: 20,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 14,
    color: '#222',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 48) / 2,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    minHeight: 140,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  cardIcon: {
    width: 75,
    height: 80,
    marginLeft: 60,
  },
  playCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:25,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  cardCount: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  lectureCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  lectureIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E6F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  lectureIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  lectureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    color: '#222',
  },
  lectureStatus: {
    color: '#7E66FF',
    marginBottom: 6,
    fontSize: 13,
  },
  lectureProgressBarBg: {
    width: '90%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginTop: 2,
  },
  lectureProgressBarFill: {
    height: 6,
    width: '40%',
    backgroundColor: '#7E66FF',
    borderRadius: 3,
  },
});

export default HomeScreen;
