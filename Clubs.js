
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar, // Used for native status bar styling
    TextInput, // Added for the chat input
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

// --- MOCK DATA ---
const EVENT_DATA = [
    { id: 'e1', imageUri: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/leo-club-party-design-template-24d6d2d964885dd5ffee590ea551c714_screen.jpg?ts=1724326312' },
    { id: 'e2', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMWWImMsfj3x1KhKNTxiAsF27lSfoW_VBGKQ&s' },
    { id: 'e3', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEgYIflMA-DePf4zMvmoiDZMv1FirwMaX6nQ&shttps://www.google.com/url?sa=i&url=https%3A%2F%2Ftgcleos.lk%2F&psig=AOvVaw1hmWP_8vd9yEaE5ByTQRCE&ust=1764353334427000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIjjgMP2kpEDFQAAAAAdAAAAABAf' },
    
    { id: 'e4', imageUri: 'https://media.licdn.com/dms/image/v2/D5622AQFDOeEzGOmmyw/feedshare-shrink_800/feedshare-shrink_800/0/1721529052779?e=2147483647&v=beta&t=8BL7cVZ92y60t0hsTdnQTNioxANeQNHI3QAheze0D9Q' },
    { id: 'e4', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOfPa-6JnGgQLSKe1mA3xfRt21S81prhqpg&s' },
];

// --- TOP & BOTTOM NAV COMPONENTS ---

// Simulates the native mobile status bar (Time, Wifi, Battery)
const StatusBarComponent = () => (
    <View style={styles.statusBarContainer}>

        <View style={styles.statusBarRight}>
            
        </View>
    </View>
);

// Global Bottom Navigation Bar (Used only on ProfileScreen)


// --- COMPONENTS FOR TABS (ProfileScreen) ---

const InformationTab = () => {
    return (
        <View style={styles.contentContainer}>
            {/* Description Section */}
            <View style={styles.infoSection}>
                <View style={styles.infoHeader}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
                </View>
                <Text style={styles.descriptionText}>
                    We empower young leaders, drive high-impact service projects, and champion initiatives like the LMD 306 Rangers Leo Mentoring Program 2025. Follow us for updates on our community impact and leadership development efforts!
                </Text>
            </View>

            {/* Comment Section (Simplified two comments) */}
            <View style={styles.infoSection}>
                <View style={styles.infoHeader}>
                    <Text style={styles.sectionTitle}>Comment (4)</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
                </View>
                <View style={styles.commentRow}>
                    <View style={styles.commentCard}>
                        <Image source={{ uri: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' }} style={styles.commentAvatar} />
                        <View style={styles.commentTextContainer}>
                            <Text style={styles.commentName}>John</Text>
                            <Text style={styles.commentBody}>Great initiative</Text>
                        </View>
                    </View>
                    <View style={styles.commentCard}>
                        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE5NWATYB-uSmqEX3f5rhBLHfYU3xrg1DPhjzwIw0fSzQ2jzWo95WgQ6cVQQuIHPAiydI&usqp=CAU' }} style={styles.commentAvatar} />
                        <View style={styles.commentTextContainer}>
                            <Text style={styles.commentName}>Meena</Text>
                            <Text style={styles.commentBody}>Great work</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const EventTab = () => (
    <View style={styles.contentContainer}>
        <View style={styles.eventGrid}>
            {EVENT_DATA.map((event) => (
                <Image key={event.id} source={{ uri: event.imageUri }} style={styles.eventGridImage} />
            ))}
        </View>
    </View>
);

// --- MAIN PROFILE SCREEN COMPONENT ---
const ProfileScreen = ({ navigateToChat }) => {
    const [activeTab, setActiveTab] = useState('Information');
    
    const renderContent = () => {
        switch (activeTab) {
            case 'Information': return <InformationTab />;
            case 'Event': return <EventTab />;
            default: return <InformationTab />;
        }
    };

    return (
        <View style={styles.screenContainer}>
            <StatusBarComponent />
            {/* Hides the actual native status bar to let our custom one show */}
            <StatusBar barStyle="light-content" backgroundColor="#000" /> 
            
            {/* Header Bar */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton}>
                    <Text style={styles.iconText}>←</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Text style={styles.iconText}>⊞</Text>
                </TouchableOpacity>
            </View>

            {/* ScrollView content is placed below the header and status bar */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>

                {/* Banner and Profile Image */}
                <Image
                    style={styles.bannerImage}
                    source={{ uri: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F77%2F71%2F68%2F7771683223d86b237a3304d6f32828b9.jpg&tbnid=A5GkNIY1oCuAuM&vet=10CAQQxiAoAWoXChMIkMGSzfiSkQMVAAAAAB0AAAAAEBE..i&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F127930445645426545%2F&docid=fvyXIheMzi0xfM&w=736&h=1030&q=profile&ved=0CAQQxiAoAWoXChMIkMGSzfiSkQMVAAAAAB0AAAAAEBE' }}
                />

                <View style={styles.profileSection}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqMLSBwNdcuWteMCfU2_jTo0vEVo8x7jsjQ&s' }}
                    />
                    <Text style={styles.districtName}>Leo District D6</Text>
                    <Text style={styles.districtLocation}>Kegalle</Text>

                    {/* Follow and Message Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.followButton}>
                            <Text style={styles.followButtonText}>Follow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.messageButton} onPress={navigateToChat}>
                            <Text style={styles.messageIcon}>➤</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tab Navigation */}
                <View style={styles.tabContainer}>
                    {['Information', 'Event'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={styles.tabButton}
                            onPress={() => setActiveTab(tab)}>
                            <Text
                                style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                            {activeTab === tab && <View style={styles.tabUnderline} />}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tab Content */}
                {renderContent()}
                
                <View style={{ height: 100 }} />
                
            </ScrollView>

            {/* Fixed Bottom Navigation */}
            
        </View>
    );
};


// --- NEW CHAT SCREEN COMPONENT (Based on the provided image) ---
const ChatScreen = ({ navigateToProfile }) => {
    
    // Mock chat data from the image
    const chatMessages = [
        { id: 1, text: 'Hey! I saw your post about the Green Horizon project. Is it open for other clubs to join?', type: 'outgoing' },
        { id: 2, text: 'Hi Ameesha! Yes, it\'s a multi-district project, any club from MD306 can participate.', type: 'incoming' },
        { id: 3, text: 'That\'s awesome! When and where is it happening?', type: 'outgoing' },
        { id: 4, text: 'Date: 25th November\nVenue: Viharamahadevi Park, Colombo\nTime: 8:00 AM onwards', type: 'incoming' },
        { id: 5, text: 'Perfect. I\'ll let my club members know. Thanks a lot!', type: 'outgoing' },
        { id: 6, text: 'You\'re most welcome! Just RSVP through the Event Page on LeoConnect', type: 'incoming' },
        { id: 7, text: 'Yeah sure...', type: 'outgoing' },
    ];
    
    return (
        <View style={styles.chatScreenContainer}>
            <StatusBarComponent />
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            
            {/* Chat Header */}
            <View style={styles.chatHeader}>
                <TouchableOpacity style={styles.iconButton} onPress={navigateToProfile}>
                    <Text style={styles.iconText}>←</Text>
                </TouchableOpacity>
                <Image
                    source={{ uri: 'https://via.placeholder.com/50/FFC700?text=L' }}
                    style={styles.chatAvatar}
                />
                <Text style={styles.chatHeaderText}>Leo D1</Text>
                <TouchableOpacity style={styles.chatHeaderMore}>
                    <Text style={styles.chatHeaderMoreText}>...</Text>
                </TouchableOpacity>
            </View>

            {/* Chat Messages Area */}
            <ScrollView contentContainerStyle={styles.chatMessagesContainer} showsVerticalScrollIndicator={false}>
                {chatMessages.map((message) => (
                    <View key={message.id} style={[
                        styles.chatBubbleWrapper,
                        message.type === 'outgoing' ? styles.chatOutgoingWrapper : styles.chatIncomingWrapper
                    ]}>
                        {message.type === 'incoming' && (
                            <Image
                                source={{ uri: 'https://via.placeholder.com/30/1E90FF?text=A' }}
                                style={styles.chatIncomingAvatar}
                            />
                        )}
                        <View style={[
                            styles.chatBubble,
                            message.type === 'outgoing' ? styles.chatOutgoing : styles.chatIncoming
                        ]}>
                            <Text style={[
                                styles.chatText,
                                message.type === 'outgoing' ? styles.chatTextOutgoing : styles.chatTextIncoming
                            ]}>
                                {message.text}
                            </Text>
                        </View>
                    </View>
                ))}
                {/* Extra space at the bottom to ensure the last message isn't hidden by input */}
                <View style={{ height: 20 }} /> 
            </ScrollView>

            {/* Chat Input Area */}
            <View style={styles.chatInputContainer}>
                <TextInput
                    style={styles.chatInput}
                    placeholder="Write your message"
                    placeholderTextColor="#777"
                />
                <TouchableOpacity style={styles.chatMicButton}>
                    <Text style={styles.chatMicIcon}>🎤</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatSendButton}>
                    <Text style={styles.chatSendIcon}>▶</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- MAIN APPLICATION COMPONENT (To handle navigation state) ---
export default function App() {
    // State to manage which screen is currently visible
    const [currentScreen, setCurrentScreen] = useState('Profile'); // 'Profile' or 'Chat'

    const navigateToChat = () => setCurrentScreen('Chat');
    const navigateToProfile = () => setCurrentScreen('Profile');

    return (
        <View style={{ flex: 1 }}>
            {currentScreen === 'Profile' ? (
                <ProfileScreen navigateToChat={navigateToChat} />
            ) : (
                <ChatScreen navigateToProfile={navigateToProfile} />
            )}
        </View>
    );
}

// --- STYLESHEET ---
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    chatScreenContainer: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 30, // Account for custom status bar
    },
    // --- Custom Status Bar Styles ---
    statusBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 30, // Status bar height
        backgroundColor: '#000',
        paddingHorizontal: 15,
        zIndex: 100,
    },
    
    statusBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    scrollContent: {
        // Start the scrollable content below the combined status bar and header (30 + 50 = 80)
        marginTop: 80, 
    },
    // --- Header Base Styles (ProfileScreen) ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 10,
        position: 'absolute', 
        zIndex: 10,
        width: '100%',
        // Position below the 30px custom status bar
        top: 30, 
        height: 50, // Header bar height
    },
    iconButton: {
        padding: 5,
    },
    iconText: {
        color: '#FFF',
        fontSize: 24,
    },
    // --- Profile Details ---
    bannerImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        marginTop: -80, // Pulls the banner up under the transparent header bar
    },
    profileSection: {
        alignItems: 'center',
        marginTop: -50,
        paddingHorizontal: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#000',
        backgroundColor: '#333',
    },
    districtName: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    districtLocation: {
        color: '#AAA',
        fontSize: 16,
    },
    // --- Action Buttons (ProfileScreen) ---
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
    },
    followButton: {
        backgroundColor: '#FFC700', // Yellow color
        borderRadius: 10,
        paddingVertical: 12,
        flex: 1,
        marginRight: 15,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
    },
    followButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    messageButton: {
        backgroundColor: '#FFF',
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageIcon: {
        fontSize: 24,
        color: '#000', // Ensure icon is black
    },
    // --- Tab Navigation ---
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 10,
        marginHorizontal: 5,
    },
    tabText: {
        color: '#AAA',
        fontSize: 16,
        fontWeight: '600',
    },
    activeTabText: {
        color: '#FFF',
    },
    tabUnderline: {
        height: 3,
        backgroundColor: '#FFC700',
        width: '100%',
        position: 'absolute',
        bottom: -1,
    },
    // --- Tab Content (Shared) ---
    contentContainer: {
        paddingHorizontal: 15,
    },
    infoSection: {
        marginBottom: 25,
    },
    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    seeAllText: {
        color: '#AAA',
        fontSize: 14,
    },
    descriptionText: {
        color: '#FFF',
        fontSize: 15,
        lineHeight: 22,
    },
    // Comments
    commentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        borderRadius: 10,
        padding: 10,
        width: '48%',
    },
    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentTextContainer: {
        flex: 1,
    },
    commentName: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    commentBody: {
        color: '#AAA',
        fontSize: 14,
    },
    // --- Event Tab Content ---
    eventGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    eventGridImage: {
        width: '48%',
        height: 180,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#333',
    },
  
    // --- Chat Screen Styles ---
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomColor: '#1A1A1A',
        borderBottomWidth: 1,
        height: 60,
    },
    chatAvatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginHorizontal: 10,
        backgroundColor: '#FFC700',
        borderWidth: 1,
        borderColor: '#000',
    },
    chatHeaderText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    chatHeaderMore: {
        paddingHorizontal: 10,
    },
    chatHeaderMoreText: {
        color: '#FFC700',
        fontSize: 30,
        lineHeight: 30,
        fontWeight: 'bold',
    },
    chatMessagesContainer: {
        paddingHorizontal: 15,
        paddingTop: 10,
        flexGrow: 1,
    },
    chatBubbleWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 5,
    },
    chatOutgoingWrapper: {
        justifyContent: 'flex-end',
        marginLeft: screenWidth * 0.25, // Forces message to right, limiting max width
    },
    chatIncomingWrapper: {
        justifyContent: 'flex-start',
        marginRight: screenWidth * 0.25,
    },
    chatBubble: {
        borderRadius: 15,
        padding: 12,
        maxWidth: '100%',
    },
    chatOutgoing: {
        backgroundColor: '#FFC700', // Yellow
        borderBottomRightRadius: 2,
    },
    chatIncoming: {
        backgroundColor: '#333333', // Dark Grey
        borderBottomLeftRadius: 2,
    },
    chatText: {
        fontSize: 16,
        lineHeight: 22,
    },
    chatTextOutgoing: {
        color: '#000',
    },
    chatTextIncoming: {
        color: '#FFF',
    },
    chatIncomingAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
        // The image shows a different avatar for incoming, but the chat bubble has an avatar image on the side. 
        // We'll keep the avatar separate for clarity based on typical UI.
    },
    // Chat Input Bar
    chatInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#000',
        borderTopColor: '#1A1A1A',
        borderTopWidth: 1,
    },
    chatInput: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: '#FFF',
        fontSize: 16,
        marginRight: 5,
    },
    chatMicButton: {
        padding: 8,
    },
    chatMicIcon: {
        fontSize: 24,
    },
    chatSendButton: {
        backgroundColor: '#FFC700',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    chatSendIcon: {
        color: '#000',
        fontSize: 18,
        transform: [{ translateX: 1 }], // Small adjustment for centering
    },
});