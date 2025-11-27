// App.js
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, 
  TextInput, Alert, Modal 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Import your HomeFeedScreen
import HomeFeedScreen from '../screens/HomeFeedScreen'; 

// Import local images
import qw1 from '../assets/Leo-District-Logo-306-D11.png';
import qw2 from '../assets/Leo-District-Logo-306-D2.png';
import qw3 from '../assets/Leo-District-Logo-306-D3.png';
import qw4 from '../assets/post1.jpg';
import qw5 from '../assets/post2.jpg';
import qw6 from '../assets/post3.jpg';
import qw7 from '../assets/post4.jpg';
import qw8 from '../assets/qw.jpg';

// --- Colors ---
const COLORS = {
  primary: '#FFC72C',
  background: '#000000',
  text: '#FFFFFF',
  textFaded: '#A9A9A9',
  card: '#1A1A1A',
};

// --- Saved Post Component ---
const SavedPost = ({ imageSource }) => (
  <View style={styles.savedPostVertical}>
    <Image source={imageSource} style={styles.savedImage} />
  </View>
);

// --- Modal for Editing Profile Picture ---
const EditProfilePictureModal = ({ isVisible, onClose, onAction }) => (
  <Modal transparent visible={isVisible} animationType="slide">
    <View style={styles.modalOverlay}>
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Edit profile picture</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.modalAction} onPress={() => onAction('takePhoto')}>
          <Text style={styles.actionText}>Take photo</Text>
          <Feather name="camera" size={20} color={COLORS.text} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalAction} onPress={() => onAction('choosePhoto')}>
          <Text style={styles.actionText}>Choose photo</Text>
          <Feather name="image" size={20} color={COLORS.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modalAction, styles.deleteAction]} 
          onPress={() => onAction('deletePhoto')}>
          <Text style={styles.deleteText}>Delete photo</Text>
          <Feather name="trash-2" size={20} color="#FF5252" />
        </TouchableOpacity>

      </View>
    </View>
  </Modal>
);

// --- Edit Profile Screen ---
const EditProfileScreen = ({ goBack }) => {
  const [name, setName] = useState('Amali Jayasingha');
  const [about, setAbout] = useState('');
  const [club, setClub] = useState('');
  const [year, setYear] = useState('');
  const [role, setRole] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSave = () => {
    Alert.alert("Saved", "Profile updated successfully!");
    goBack();
  };

  const handleModalAction = (action) => {
    Alert.alert("Action", action);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.editScrollContent}>
        <View style={styles.imageEditContainer}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=5' }} // online profile picture
            style={styles.profileImageLarge}
          />
          <TouchableOpacity 
            style={styles.editIconContainer} 
            onPress={() => setIsModalVisible(true)}
          >
            <Feather name="edit-3" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Name:</Text>
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>About:</Text>
        <TextInput 
          style={[styles.input, styles.textArea]}
          multiline
          value={about}
          onChangeText={setAbout}
        />

        <Text style={styles.label}>Club:</Text>
        <TextInput 
          style={styles.input}
          value={club}
          onChangeText={setClub}
        />

        <Text style={styles.label}>Year:</Text>
        <TextInput 
          style={styles.input}
          value={year}
          onChangeText={setYear}
        />

        <Text style={styles.label}>Role:</Text>
        <TextInput 
          style={styles.input}
          value={role}
          onChangeText={setRole}
        />

        <TouchableOpacity style={styles.saveButtonCentered} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save & Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      <EditProfilePictureModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAction={handleModalAction}
      />
    </View>
  );
};

// --- View Profile Screen ---
const ViewProfileScreen = ({ openEdit, goBackToHome }) => {
  const profileData = {
    name: "Amali Jayasingha",
    memberSince: "2022",
    description:
      "Dedicated and motivated Leo member focused on leadership, innovation, and community service.",
    uploadedImages: [qw1, qw2, qw3],
    savedPosts: [qw4, qw5, qw6, qw7, qw8] // local images
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={goBackToHome} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerCenterAligned}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=5' }} // online profile picture
            style={styles.profileImage}
          />
          <View style={styles.memberBadge}>
            <Text style={styles.memberBadgeText}>Member</Text>
          </View>
          <Text style={styles.nameText}>{profileData.name}</Text>
          <Text style={styles.yearText}>{profileData.memberSince}</Text>

          {/* Uploaded Images in 3 Circles */}
          <View style={styles.badgeContainer}>
            {profileData.uploadedImages.map((img, i) => (
              <Image key={i} source={img} style={styles.badgeLarge} />
            ))}
          </View>
        </View>

        <Text style={styles.descriptionText}>
          {profileData.description}
        </Text>

        <View style={styles.savedHeader}>
          <Text style={styles.savedTitle}>Saved</Text>
          <TouchableOpacity onPress={openEdit}>
            <Text style={styles.editProfileText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.savedGridVertical}>
          {profileData.savedPosts.map((img, idx) => (
            <SavedPost key={idx} imageSource={img} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <Feather name="home" size={24} color={COLORS.primary} />
        <Feather name="bell" size={24} color={COLORS.textFaded} />
        <View style={styles.plusButton}>
          <Feather name="plus" size={24} color={COLORS.background} />
        </View>
        <Feather name="search" size={24} color={COLORS.textFaded} />
        <Feather name="user" size={24} color={COLORS.textFaded} />
      </View>
    </View>
  );
};

// --- Main App Component ---
export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [showProfile, setShowProfile] = useState(true);

  const goBackToHome = () => {
    setShowProfile(false);
  };

  return showProfile ? (
    isEditing ? (
      <EditProfileScreen goBack={() => setIsEditing(false)} />
    ) : (
      <ViewProfileScreen 
        openEdit={() => setIsEditing(true)} 
        goBackToHome={goBackToHome} 
      />
    )
  ) : (
    <HomeFeedScreen />
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 40 },
  scrollContent: { padding: 20, paddingBottom: 120 },
  editScrollContent: { padding: 20, paddingBottom: 50 },
  headerBar: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 15, borderBottomWidth: 1, borderBottomColor: COLORS.card, position: "relative" },
  backButton: { position: "absolute", left: 15, top: 12, zIndex: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
  headerCenterAligned: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  profileImageLarge: { width: 120, height: 120, borderRadius: 60 },
  imageEditContainer: { alignSelf: "center", marginVertical: 20 },
  editIconContainer: { position: "absolute", bottom: 0, right: 0, backgroundColor: COLORS.primary, padding: 6, borderRadius: 20 },
  memberBadge: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15, marginTop: 10 },
  memberBadgeText: { color: "#000", fontSize: 12, fontWeight: "bold" },
  nameText: { fontSize: 22, color: COLORS.text, fontWeight: "bold", marginTop: 10 },
  yearText: { fontSize: 16, color: COLORS.primary, marginBottom: 10 },
  badgeContainer: { flexDirection: "row", marginBottom: 15 },
  badgeLarge: { width: 50, height: 50, marginRight: 10, borderRadius: 25, borderColor: COLORS.primary, borderWidth: 1 },
  descriptionText: { color: COLORS.text, marginBottom: 20 },
  savedHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  savedTitle: { fontSize: 18, color: COLORS.text, fontWeight: "bold" },
  editProfileText: { color: COLORS.primary, fontSize: 16 },
  savedGridVertical: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between" 
  },
  savedPostVertical: { 
    width: "48%",       // 2 per row
    aspectRatio: 1, 
    borderRadius: 10, 
    overflow: "hidden", 
    marginBottom: 12, 
    borderWidth: 0.4,
    borderColor: COLORS.primary // yellow border
  },
  savedImage: { width: "100%", height: "100%" },
  label: { color: COLORS.text, fontSize: 16, marginTop: 12 },
  input: { borderWidth: 1, borderColor: COLORS.textFaded, borderRadius: 8, padding: 10, color: COLORS.text, marginBottom: 10 },
  textArea: { height: 90, textAlignVertical: "top" },
  saveButtonCentered: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 8, alignItems: "center", marginVertical: 30 },
  saveButtonText: { color: "#000", fontWeight: "bold", fontSize: 18 },
  tabBar: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 15, borderTopWidth: 1, borderTopColor: COLORS.card, backgroundColor: COLORS.background, position: "absolute", bottom: 0, width: "100%" },
  plusButton: { backgroundColor: COLORS.primary, width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", marginTop: -20 },
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" },
  modalView: { backgroundColor: COLORS.card, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  modalTitle: { color: COLORS.text, fontSize: 18, fontWeight: "bold" },
  modalAction: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: COLORS.textFaded + "30" },
  deleteAction: { borderBottomWidth: 0 },
  actionText: { color: COLORS.text, fontSize: 16 },
  deleteText: { color: "#FF5252", fontSize: 16 },
});
