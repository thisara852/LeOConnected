// screens/PostDetailScreen.js

import React, { useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, Modal, Alert, Linking 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNCalendarEvents from 'react-native-calendar-events';

// --- Constants ---
const Colors = {
  background: '#0D0D0D', 
  accentGold: '#FFC800', 
  textWhite: '#FFFFFF',
  textGray: '#CCCCCC',
  cardBackground: '#1C1C1C',
  mapPlaceholder: '#222222', 
  navigationBackground: '#000000',
};

// --- Reusable Components ---
const CustomHeader = ({ onBack, saved, onToggleSave, onMenu }) => (
  <View style={sharedStyles.header}>
    <TouchableOpacity onPress={onBack}>
      <Icon name="arrow-back" size={24} color={Colors.textWhite} />
    </TouchableOpacity>
    <View style={sharedStyles.headerIcons}>
        <TouchableOpacity onPress={onToggleSave}>
          <Icon 
            name={saved ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={saved ? Colors.accentGold : Colors.textWhite} 
            style={{ marginRight: 15 }} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenu}>
            <Icon name="ellipsis-vertical" size={24} color={Colors.textWhite} />
        </TouchableOpacity>
    </View>
  </View>
);

const TabSelector = ({ activeTab, onSelectTab }) => (
    <View style={tabStyles.tabBar}>
        {['Overview', 'Details'].map(tab => (
            <TouchableOpacity 
                key={tab}
                style={[tabStyles.tabButton, activeTab === tab && tabStyles.activeTabIndicator]}
                onPress={() => onSelectTab(tab)}
            >
                <Text style={activeTab === tab ? tabStyles.activeTabText : tabStyles.inactiveTabText}>
                    {tab}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

const DetailRow = ({ iconName, text, subText, onIconPress }) => (
    <View style={detailsStyles.row}>
        <TouchableOpacity onPress={onIconPress}>
            <Icon name={iconName} size={24} color={Colors.accentGold} style={detailsStyles.rowIcon} />
        </TouchableOpacity>
        <View>
            <Text style={detailsStyles.rowText}>{text}</Text>
            <Text style={detailsStyles.rowSubText}>{subText}</Text>
        </View>
    </View>
);

// --- Calendar Modal ---
const CalendarModal = ({ visible, onClose, onAdd }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedHour, setSelectedHour] = useState(today.getHours());
  const [selectedMinute, setSelectedMinute] = useState(today.getMinutes());
  const [amPm, setAmPm] = useState(today.getHours() >= 12 ? 'PM' : 'AM');

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();

  const selectDate = (day) => {
    const newDate = new Date(year, month, day, selectedHour, selectedMinute);
    setSelectedDate(newDate);
  };

  const handleAdd = async () => {
    try {
      const status = await RNCalendarEvents.requestPermissions();
      if (status === 'authorized') {
        const hour24 = amPm === 'PM' && selectedHour < 12 ? selectedHour + 12 : selectedHour;
        const startDate = new Date(year, month, selectedDate.getDate(), hour24, selectedMinute);
        const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4-hour event
        await RNCalendarEvents.saveEvent('Creative Minds Summit', {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          location: 'Gala Convention Center, 30 Duplication Road, Colombo, LK',
          notes: 'Join the Creative Minds Summit to learn and network with leaders.',
        });
        Alert.alert('Success', 'Event successfully added to your calendar!');
        onAdd();
      } else {
        Alert.alert('Permission Denied', 'Cannot access calendar.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to add event to calendar.');
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={calendarStyles.overlay}>
        <View style={calendarStyles.container}>
          {/* Header */}
          <View style={calendarStyles.header}>
            <TouchableOpacity onPress={() => setSelectedDate(new Date(year, month-1, selectedDate.getDate()))}>
              <Icon name="chevron-back-outline" size={20} color={Colors.textWhite} />
            </TouchableOpacity>
            <Text style={calendarStyles.monthText}>{selectedDate.toLocaleString('default', { month: 'long' })} {year}</Text>
            <TouchableOpacity onPress={() => setSelectedDate(new Date(year, month+1, selectedDate.getDate()))}>
              <Icon name="chevron-forward-outline" size={20} color={Colors.textWhite} />
            </TouchableOpacity>
          </View>
          {/* Days */}
          <View style={calendarStyles.daysGrid}>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
              <TouchableOpacity
                key={day}
                style={[
                  calendarStyles.dayButton,
                  day === selectedDate.getDate() && calendarStyles.activeDay
                ]}
                onPress={() => selectDate(day)}
              >
                <Text style={[
                  calendarStyles.dayText,
                  day === selectedDate.getDate() && calendarStyles.activeDayText
                ]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Time */}
          <View style={calendarStyles.timeRow}>
            <Text style={calendarStyles.timeLabel}>Time</Text>
            <Text style={calendarStyles.timeInput}>
              {selectedHour.toString().padStart(2,'0')}:{selectedMinute.toString().padStart(2,'0')} {amPm}
            </Text>
          </View>
          {/* Action */}
          <View style={calendarStyles.actionRow}>
            <TouchableOpacity onPress={onClose} style={calendarStyles.actionButton}>
              <Text style={calendarStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd} style={calendarStyles.addButton}>
              <Icon name="add" size={18} color={Colors.background} style={{marginRight: 5}}/>
              <Text style={calendarStyles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// --- Tab Content Components ---
const OverviewContent = () => (
  <View style={sharedStyles.paddingHorizontal}>
    <Text style={overviewStyles.overviewText}>
      Join Leo District 306 D-1 for the official launch of the transformative Leo Mentoring Program (LMP) 2025.
    </Text>
    <Text style={overviewStyles.overviewText}>
      This program is designed to empower young leaders across Colombo and beyond. Sessions include mentoring, leadership training, and community projects.
    </Text>
    <Text style={overviewStyles.overviewText}>
      Attendees will gain valuable insights from experienced mentors, participate in workshops, and network with fellow youth leaders.
    </Text>
    <Text style={overviewStyles.overviewText}>
      Event Highlights:
    </Text>
    <View style={{ paddingLeft: 10, marginBottom: 10 }}>
      <Text style={overviewStyles.overviewText}>• Mentoring workshops</Text>
      <Text style={overviewStyles.overviewText}>• Leadership talks</Text>
      <Text style={overviewStyles.overviewText}>• Networking opportunities</Text>
      <Text style={overviewStyles.overviewText}>• Certificate of Participation</Text>
    </View>
  </View>
);

const DetailsContent = ({ onCalendarPress }) => {
  const openGoogleMaps = () => {
    const location = 'Gala Convention Center, 30 Duplication Road, Colombo, LK';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    Linking.openURL(url).catch(err => Alert.alert('Error', 'Failed to open map.'));
  };

  return (
    <View style={sharedStyles.paddingHorizontal}>
      <Text style={detailsStyles.eventTitle}>Creative Minds Summit</Text>

      <DetailRow 
          iconName="calendar-outline" 
          text="14 December, 2021" 
          subText="Tuesday, 4:00 PM - 8:00 PM" 
          onIconPress={onCalendarPress}
      />

      <DetailRow 
          iconName="location-outline" 
          text="Gala Convention Center" 
          subText="30 Duplication Road, Colombo, LK" 
          onIconPress={openGoogleMaps}
      />

      <Text style={detailsStyles.sectionTitle}>LOCATION</Text>
      <View style={detailsStyles.mapPlaceholder}>
          <Image 
              source={require('../assets/location.jpg')}
              style={detailsStyles.mapImage}
              resizeMode="cover"
          />
      </View>

      <Text style={detailsStyles.sectionTitle}>DESCRIPTION</Text>
      <Text style={detailsStyles.rowSubText}>
        The Creative Minds Summit brings together innovators, entrepreneurs, and community leaders to share ideas and collaborate on projects.
      </Text>
      <Text style={detailsStyles.rowSubText}>
        The venue offers spacious halls, modern facilities, and convenient access to parking and public transportation.
      </Text>
    </View>
  );
};

// --- Main Screen ---
const PostDetailScreen = ({ setScreen }) => { 
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSaved, setIsSaved] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const scrollRef = useRef(null);

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'Details' && scrollRef.current) {
      scrollRef.current.scrollTo({ y: 300, animated: true });
    }
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} ref={scrollRef}>
        <CustomHeader 
            onBack={() => setScreen('HomeFeed')} 
            saved={isSaved} 
            onToggleSave={() => setIsSaved(!isSaved)}
            onMenu={() => console.log('Menu Pressed')} 
        />
        <View style={sharedStyles.profileRow}>
          <Image 
            source={require('../assets/Leo-District-Logo-306-D11.png')}
            style={sharedStyles.profileLogo}
          />
          <View style={sharedStyles.profileTextContainer}>
            <Text style={sharedStyles.profileName}>Leo District 306 D1</Text>
            <Text style={sharedStyles.profileLocation}>Colombo</Text>
          </View>
        </View>
        <View style={sharedStyles.postCard}>
          <Image 
            source={require('../assets/qw.jpg')}
            style={detailsStyles.postImageSmall}
          />
          <View style={sharedStyles.cardBorder} />
        </View>
        <TabSelector activeTab={activeTab} onSelectTab={handleSelectTab} />
        {activeTab === 'Overview' 
          ? <OverviewContent /> 
          : <DetailsContent onCalendarPress={() => setCalendarVisible(true)} />}
      </ScrollView>
      <View style={sharedStyles.bottomNav} />

      {/* Calendar Modal */}
      <CalendarModal 
        visible={isCalendarVisible} 
        onClose={() => setCalendarVisible(false)} 
        onAdd={() => setCalendarVisible(false)}
      />
    </SafeAreaView>
  );
};

// --- Styles ---
const sharedStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, },
  paddingHorizontal: { paddingHorizontal: 15, },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, },
  headerIcons: { flexDirection: 'row', alignItems: 'center', },
  profileRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginBottom: 15, },
  profileLogo: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: Colors.accentGold, marginRight: 10, },
  profileName: { color: Colors.textWhite, fontSize: 16, fontWeight: 'bold', },
  profileLocation: { color: Colors.textGray, fontSize: 12, },
  profileTextContainer: { justifyContent: 'center' },
  postCard: { marginHorizontal: 15, borderRadius: 10, overflow: 'hidden', marginBottom: 20, position: 'relative', borderWidth: 1, borderColor: Colors.accentGold + '44', },
  cardBorder: { position: 'absolute', top: 5, bottom: 5, left: 5, right: 5, borderWidth: 2, borderColor: Colors.accentGold + '44', borderRadius: 10, },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: Colors.navigationBackground, borderTopWidth: 1, borderTopColor: '#333333', }
});

const tabStyles = StyleSheet.create({
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#1E1E1E', marginHorizontal: 15, marginBottom: 20, },
  tabButton: { paddingVertical: 10, paddingHorizontal: 0, marginRight: 30, },
  activeTabIndicator: { borderBottomWidth: 3, borderBottomColor: Colors.accentGold, },
  activeTabText: { color: Colors.textWhite, fontSize: 16, fontWeight: 'bold', },
  inactiveTabText: { color: Colors.textGray, fontSize: 16, },
});

const overviewStyles = StyleSheet.create({
  overviewText: { color: Colors.textWhite, fontSize: 16, lineHeight: 24, marginBottom: 10 },
});

const detailsStyles = StyleSheet.create({
    eventTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.textWhite, marginBottom: 20, },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, },
    rowIcon: { marginRight: 15, },
    rowText: { fontSize: 16, color: Colors.textWhite, fontWeight: '600', },
    rowSubText: { fontSize: 14, color: Colors.textGray, marginTop: 2, },
    sectionTitle: { fontSize: 14, color: Colors.textGray, marginTop: 20, marginBottom: 10, fontWeight: 'bold' },
    mapPlaceholder: { height: 200, backgroundColor: Colors.mapPlaceholder, borderRadius: 10, overflow: 'hidden', marginBottom: 15 },
    mapImage: { width: '100%', height: '100%', opacity: 0.9, borderRadius: 10 },
    postImageSmall: { width: '100%', height: 180, borderRadius: 10 }
});

const calendarStyles = StyleSheet.create({
  overlay: { flex:1, backgroundColor:'rgba(0,0,0,0.7)', justifyContent:'center', alignItems:'center' },
  container: { backgroundColor: Colors.background, borderRadius: 15, width:'80%', padding:15, borderWidth:1, borderColor:Colors.accentGold },
  header:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10 },
  monthText:{ color:Colors.textWhite, fontWeight:'bold', fontSize:16 },
  daysGrid:{ flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around', marginVertical:10 },
  dayButton:{ width:'12%', aspectRatio:1, justifyContent:'center', alignItems:'center', margin:4 },
  dayText:{ color:Colors.textWhite, fontSize:14 },
  activeDay:{ backgroundColor:Colors.accentGold, borderRadius:20 },
  activeDayText:{ color:Colors.background, fontWeight:'bold' },
  timeRow:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:10 },
  timeLabel:{ color:Colors.textGray, fontSize:16 },
  timeInput:{ color:Colors.textWhite, fontSize:16, fontWeight:'bold' },
  actionRow:{ flexDirection:'row', justifyContent:'flex-end', marginTop:10 },
  actionButton:{ paddingHorizontal:15, paddingVertical:8, borderRadius:5, marginLeft:10 },
  cancelText:{ color:Colors.textGray, fontSize:16 },
  addButton:{ backgroundColor: Colors.accentGold, flexDirection:'row', alignItems:'center', borderRadius:20, paddingHorizontal:20, paddingVertical:8 },
  addText:{ color:Colors.background, fontWeight:'bold', fontSize:16 }
});

export default PostDetailScreen;
