import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    SafeAreaView,
    StatusBar,
    Dimensions,
    KeyboardAvoidingView, // Added for chat input
    Platform, // Added for KeyboardAvoidingView
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

// --- MOCK DATA ---
const DISTRICT_DATA = [
    { id: 'd1', name: 'Leo District D2', location: '@Anuradhapura', imageUri: 'https://via.placeholder.com/50/FFC700?text=D2' },
    { id: 'd2', name: 'Leo District D3', location: '@Colombo', imageUri: 'https://via.placeholder.com/50/FFC700?text=D3' },
    { id: 'd3', name: 'Leo District D9', location: '@Kandy, Matale, Polonnaruwa, Trincomalee', imageUri: 'https://via.placeholder.com/50/FFC700?text=D9' },
    { id: 'd4', name: 'Leo District D6', location: '@Ambalangoda', imageUri: 'https://via.placeholder.com/50/FFC700?text=D6' },
    { id: 'd5', name: 'Leo District D5', location: '@Negombo', imageUri: 'https://via.placeholder.com/50/FFC700?text=D5' },
    { id: 'd6', name: 'Leo District D11', location: '@Gampaha', imageUri: 'https://via.placeholder.com/50/FFC700?text=D11' },
    { id: 'd7', name: 'Leo District D12', location: '@Kurunegala', imageUri: 'https://via.placeholder.com/50/FFC700?text=D12' },
    { id: 'd8', name: 'Leo District D1', location: '@Colombo', imageUri: 'https://via.placeholder.com/50/FFC700?text=D1' },
];

const CLUB_DATA = [
    { id: 'c1', name: 'Leo Club of Moratuwa', imageUri: 'https://via.placeholder.com/150/000?text=Moratuwa', rating: '★★★★☆ (213)', description: 'Funds raised for the community service goal.' },
    { id: 'c2', name: 'Leo Club of UOC Alumni', imageUri: 'https://via.placeholder.com/150/000?text=UOC', rating: '★★★☆☆ (98)', description: 'University of Colombo Alumni club.' },
    { id: 'c3', name: 'Leo Club of Colombo', imageUri: 'https://via.placeholder.com/150/000?text=Colombo', isPopular: true },
    { id: 'c4', name: 'Leo Club of Royal Achievers', imageUri: 'https://via.placeholder.com/150/000?text=Royal', isPopular: true },
];

const LEADERSHIP_PAST_DATA = [
    { id: 'l1', title: 'District President', year: 'Year' },
    { id: 'l2', title: '10. Leo Lion S. Silva', year: '2023-2024' },
    { id: 'l3', title: '09. Leo Lion S. Silva', year: '2023-2024' },
    { id: 'l4', title: '08. Leo Lion S. Silva', year: '2023-2024' },
    { id: 'l5', title: '07. Leo Lion S. Silva', year: '2023-2024' },
];

const LEADERSHIP_PRESENT_DATA = [
    { id: 'p1', name: 'Robert De Silva', imageUri: 'https://via.placeholder.com/100/1E90FF?text=R' },
    { id: 'p2', name: 'John D. Smith', imageUri: 'https://via.placeholder.com/100/FFC700?text=J' },
];

const EVENT_DATA = [
    { id: 'e1', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOfPa-6JnGgQLSKe1mA3xfRt21S81prhqpg&s' },
    { id: 'e2', imageUri: 'https://via.placeholder.com/180/0000FF?text=Event+2' },
    { id: 'e3', imageUri: 'https://via.placeholder.com/180/00FF00?text=Event+3' },
    { id: 'e4', imageUri: 'https://via.placeholder.com/180/FF0000?text=Event+4' },
];

// Mock Chat Data based on the provided screenshot
const CHAT_MESSAGES = [
    { id: 1, text: 'Hey! I saw your post about the Green Horizon project. Is it open for other clubs to join?', sender: 'user' },
    { id: 2, text: 'Hi Ameela! Yes, it\'s a multi-district project, any club from MD306 can participate', sender: 'other', imageUri: 'https://via.placeholder.com/50/2E8B57?text=L' },
    { id: 3, text: 'That\'s awesome! When and where is it happening?', sender: 'user' },
    { id: 4, text: 'Date: 25th November. Venue: Viharamahadevi Park, Colombo. Time: 9:00 AM onwards', sender: 'other', imageUri: 'https://via.placeholder.com/50/2E8B57?text=L' },
    { id: 5, text: 'Perfect. I\'ll let my club members know. Thanks a lot!', sender: 'user' },
    { id: 6, text: 'You\'re most welcome! Just RSVP through the Event Page on LeoConnect', sender: 'other', imageUri: 'https://via.placeholder.com/50/2E8B57?text=L' },
    { id: 7, text: 'Yeah sure...', sender: 'user' },
];

// --- COMPONENTS FOR PROFILE SCREEN TABS ---

// Helper component for the Leadership List rows
const LeadershipRow = ({ item, isHeader }) => (
    <View style={[styles.leadershipRow, isHeader && styles.leadershipHeader]}>
        <Text style={[styles.leadershipText, isHeader && styles.leadershipHeaderText, { flex: 2 }]}>
            {item.title}
        </Text>
        <Text style={[styles.leadershipText, isHeader && styles.leadershipHeaderText, { flex: 1, textAlign: 'right' }]}>
            {item.year}
        </Text>
    </View>
);

// Renders the main Information Tab content
const InformationTab = () => {
    const [leadershipTab, setLeadershipTab] = useState('Past');

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

            {/* Comment Section */}
            <View style={styles.infoSection}>
                <View style={styles.infoHeader}>
                    <Text style={styles.sectionTitle}>Comment (4)</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
                </View>
                <View style={styles.commentRow}>
                    <View style={styles.commentCard}>
                        <Image source={{ uri: 'https://via.placeholder.com/50/FFC700?text=J' }} style={styles.commentAvatar} />
                        <View style={styles.commentTextContainer}>
                            <Text style={styles.commentName}>John</Text>
                            <Text style={styles.commentBody}>Great initiative</Text>
                        </View>
                    </View>
                    <View style={styles.commentCard}>
                        <Image source={{ uri: 'https://via.placeholder.com/50/FFC700?text=M' }} style={styles.commentAvatar} />
                        <View style={styles.commentTextContainer}>
                            <Text style={styles.commentName}>Meena</Text>
                            <Text style={styles.commentBody}>Great work</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Leadership Section */}
            <View style={styles.infoSection}>
                <View style={styles.infoHeader}>
                    <Text style={styles.sectionTitle}>District 306 D4 Leadership</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>View All</Text></TouchableOpacity>
                </View>
                <View style={styles.leadershipToggle}>
                    <TouchableOpacity onPress={() => setLeadershipTab('Past')}>
                        <Text style={[styles.leadershipTab, leadershipTab === 'Past' && styles.activeLeadershipTab]}>Past</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLeadershipTab('Present')}>
                        <Text style={[styles.leadershipTab, leadershipTab === 'Present' && styles.activeLeadershipTab]}>Present</Text>
                    </TouchableOpacity>
                </View>

                {/* Conditional Leadership Content */}
                {leadershipTab === 'Past' ? (
                    <View>
                        <LeadershipRow item={LEADERSHIP_PAST_DATA[0]} isHeader={true} />
                        {LEADERSHIP_PAST_DATA.slice(1).map((item) => (
                            <LeadershipRow key={item.id} item={item} />
                        ))}
                    </View>
                ) : (
                    <View style={styles.presentLeadershipContainer}>
                        {LEADERSHIP_PRESENT_DATA.map((member) => (
                            <View key={member.id} style={styles.presentLeaderCard}>
                                <Image source={{ uri: member.imageUri }} style={styles.presentLeaderImage} />
                                <Text style={styles.presentLeaderName}>{member.name}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

// Renders the List Of Clubs Tab content
const ListOfClubsTab = () => (
    <View style={styles.contentContainer}>
        {/* Trending Now */}
        <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
                <Text style={styles.sectionTitle}>Trending Now</Text>
                <TouchableOpacity><Text style={styles.seeAllText}>View All</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                {CLUB_DATA.slice(0, 2).map((club) => (
                    <View key={club.id} style={styles.clubCardTrending}>
                        <Image source={{ uri: club.imageUri }} style={styles.clubCardImage} />
                        <View style={styles.clubCardTextContainer}>
                            <Text style={styles.clubCardName}>{club.name}</Text>
                            <Text style={styles.clubCardDescription}>{club.description}</Text>
                            <Text style={styles.clubCardRating}>{club.rating}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>

        {/* Most Popular */}
        <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
                <Text style={styles.sectionTitle}>Most Popular</Text>
                <TouchableOpacity><Text style={styles.seeAllText}>View All</Text></TouchableOpacity>
            </View>
            <View style={styles.clubCardPopularRow}>
                {CLUB_DATA.slice(2).map((club) => (
                    <View key={club.id} style={styles.clubCardPopular}>
                        <Image source={{ uri: club.imageUri }} style={styles.clubCardPopularImage} />
                        <View style={styles.clubCardPopularOverlay}>
                            <Text style={styles.clubCardPopularName}>{club.name}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    </View>
);

// Renders the Event Tab content
const EventTab = () => (
    <View style={styles.contentContainer}>
        <View style={styles.eventGrid}>
            {EVENT_DATA.map((event) => (
                <Image key={event.id} source={{ uri: event.imageUri }} style={styles.eventGridImage} />
            ))}
        </View>
    </View>
);

// --- CHAT SCREEN COMPONENT ---
const ChatScreen = ({ onNavigateBack }) => {
    const renderMessage = ({ item }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[styles.messageRow, isUser ? styles.messageRowUser : styles.messageRowOther]}>
                {!isUser && item.imageUri && (
                    <Image source={{ uri: item.imageUri }} style={styles.chatAvatar} />
                )}
                <View style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}>
                    <Text style={isUser ? styles.userText : styles.otherText}>{item.text}</Text>
                </View>
                {isUser && item.imageUri && (
                    // Note: User avatar not in screenshot, but included logic for completeness
                    <Image source={{ uri: item.imageUri }} style={styles.chatAvatar} /> 
                )}
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.chatScreenContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust as needed
        >
            {/* Chat Header */}
            <View style={styles.chatHeader}>
                <TouchableOpacity onPress={onNavigateBack} style={styles.iconButton}>
                    <Text style={styles.iconText}>←</Text>
                </TouchableOpacity>
                <View style={styles.chatHeaderTitleContainer}>
                    <Image source={{ uri: 'https://via.placeholder.com/50/2E8B57?text=L' }} style={styles.chatHeaderAvatar} />
                    <Text style={styles.chatHeaderTitle}>Leo D1</Text>
                </View>
                <TouchableOpacity style={styles.iconButton}>
                    <Text style={styles.chatHeaderMenu}>...</Text>
                </TouchableOpacity>
            </View>

            {/* Message List */}
            <FlatList
                data={CHAT_MESSAGES}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.chatListContent}
                inverted={false} // Display from top to bottom
            />

            {/* Input Bar */}
            <View style={styles.chatInputContainer}>
                <TextInput
                    style={styles.chatInput}
                    placeholder="Write your message"
                    placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.chatIconMicrophone}>
                    <Text style={styles.chatIconText}>🎤</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatIconSend}>
                    <Text style={styles.chatIconTextSend}>➤</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

// --- MAIN SCREEN COMPONENTS ---

// The Search/List Screen
const SearchScreen = ({ onNavigateBack }) => {
    const [activeTab, setActiveTab] = useState('District');

    const dataToDisplay = activeTab === 'District' ? DISTRICT_DATA : CLUB_DATA;
    const searchPlaceholder = activeTab === 'District' ? 'Search your favorite place...' : 'Search your club...';

    const ListItemView = ({ item }) => (
        <TouchableOpacity style={styles.listItemContainer}>
            <Image 
                style={styles.entityImage} 
                source={{ uri: item.imageUri }} 
            />
            <View style={styles.textContainer}>
                <Text style={styles.entityName}>{item.name}</Text>
                {item.location && <Text style={styles.entityLocation}>{item.location}</Text>}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.screenContainer}>
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={onNavigateBack}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={searchPlaceholder}
                    placeholderTextColor="#888"
                />
                <Text style={styles.searchIcon}>🔎</Text>
            </View>

            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, activeTab === 'District' && styles.activeToggleButton]}
                    onPress={() => setActiveTab('District')}>
                    <Text style={[styles.toggleText, activeTab === 'District' && styles.activeToggleText]}>District</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, activeTab === 'Clubs' && styles.activeToggleButton]}
                    onPress={() => setActiveTab('Clubs')}>
                    <Text style={[styles.toggleText, activeTab === 'Clubs' && styles.activeToggleText]}>Clubs</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={dataToDisplay}
                renderItem={ListItemView}
                keyExtractor={(item, index) => item.id + index}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
            <View style={{ height: 80 }} /> {/* Spacer for Bottom Nav */}
        </View>
    );
};


// The Profile Screen (Default View)
const ProfileScreen = ({ onNavigateToSearch, onNavigateToChat }) => {
    const [activeTab, setActiveTab] = useState('Information');

    const renderContent = () => {
        switch (activeTab) {
            case 'Information': return <InformationTab />;
            case 'List Of Clubs': return <ListOfClubsTab />;
            case 'Event': return <EventTab />;
            default: return <InformationTab />;
        }
    };

    return (
        <View style={styles.screenContainer}>
            {/* Header Bar */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => {/* Placeholder for back action */}}>
                    <Text style={styles.iconText}>←</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Text style={styles.iconText}>⊞</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Banner and Profile Image */}
                <Image
                    style={styles.bannerImage}
                    source={{ uri: 'https://via.placeholder.com/400x150/000000/FFFFFF?text=LMD+306+Rangers+Banner' }}
                />

                <View style={styles.profileSection}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: 'https://via.placeholder.com/100x100/1E90FF/FFFFFF?text=LMD' }}
                    />
                    <Text style={styles.districtName}>Leo District D6</Text>
                    <Text style={styles.districtLocation}>Kegalle</Text>

                    {/* Follow and Message Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.followButton}>
                            <Text style={styles.followButtonText}>Follow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.messageButton} onPress={onNavigateToChat}>
                            {/* CONNECTED: This button now navigates to the ChatScreen */}
                            <Text style={styles.messageIcon}>➤</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tab Navigation */}
                <View style={styles.tabContainer}>
                    {['Information', 'List Of Clubs', 'Event'].map((tab) => (
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
        </View>
    );
};


// --- App Root Component to handle State (Screen Switching) ---
const LeoApp = () => {
    // State to toggle between 'Profile', 'Search', and 'Chat' screens
    const [currentScreen, setCurrentScreen] = useState('Profile');

    const renderScreen = () => {
        switch (currentScreen) {
            case 'Profile':
                return <ProfileScreen 
                    onNavigateToSearch={() => setCurrentScreen('Search')}
                    onNavigateToChat={() => setCurrentScreen('Chat')} // Added navigation to Chat
                />;
            case 'Search':
                return <SearchScreen onNavigateBack={() => setCurrentScreen('Profile')} />;
            case 'Chat':
                return <ChatScreen onNavigateBack={() => setCurrentScreen('Profile')} />; // Navigates back to Profile
            default:
                return <ProfileScreen 
                    onNavigateToSearch={() => setCurrentScreen('Search')}
                    onNavigateToChat={() => setCurrentScreen('Chat')}
                />;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Native Status Bar Styling */}
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {renderScreen()}

            {/* --- Global Bottom Navigation (Hidden on Chat Screen) --- */}
            {currentScreen !== 'Chat' && (
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Profile')}>
                        <Text style={currentScreen === 'Profile' ? styles.navTextActive : styles.navText}>🏠</Text>
                        <Text style={currentScreen === 'Profile' ? styles.navLabelActive : styles.navLabel}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navText}>🔔</Text>
                        <Text style={styles.navLabel}>Notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItemCenter}>
                        <View style={styles.plusButton}><Text style={styles.plusText}>+</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Search')}>
                        <Text style={currentScreen === 'Search' ? styles.navTextActive : styles.navText}>🔍</Text>
                        <Text style={currentScreen === 'Search' ? styles.navLabelActive : styles.navLabel}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navText}>👤</Text>
                        <Text style={styles.navLabel}>Me</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

// --- STYLESHEET (Expanded) ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    // --- Screen/Header Base Styles ---
    screenContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    topHeader: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    iconButton: {
        padding: 5,
    },
    iconText: {
        color: '#FFF',
        fontSize: 24,
    },
    backArrow: {
        color: '#FFF',
        fontSize: 24,
    },
    // --- Profile Details ---
    bannerImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
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
    // --- Action Buttons ---
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
    },
    followButton: {
        backgroundColor: '#FFC700',
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
        backgroundColor: '#FFF',
        width: '100%',
        position: 'absolute',
        bottom: -1,
    },
    // --- Information Tab Content ---
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
    // Leadership
    leadershipToggle: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    leadershipTab: {
        color: '#AAA',
        marginRight: 20,
        fontSize: 16,
    },
    activeLeadershipTab: {
        color: '#FFC700',
        fontWeight: 'bold',
    },
    leadershipRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: '#1C1C1C',
        borderRadius: 5,
        marginBottom: 3,
    },
    leadershipHeader: {
        backgroundColor: '#000',
        borderBottomWidth: 1,
        borderColor: '#333',
        borderRadius: 0,
        marginBottom: 5,
    },
    leadershipText: {
        color: '#FFF',
        fontSize: 14,
    },
    leadershipHeaderText: {
        fontWeight: 'bold',
    },
    presentLeadershipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    presentLeaderCard: {
        alignItems: 'center',
        width: '48%',
    },
    presentLeaderImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 5,
    },
    presentLeaderName: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    // --- List Of Clubs Tab Content ---
    horizontalScroll: {
        paddingVertical: 5,
    },
    clubCardTrending: {
        width: screenWidth * 0.7,
        flexDirection: 'row',
        backgroundColor: '#1C1C1C',
        borderRadius: 10,
        marginRight: 10,
        padding: 10,
        alignItems: 'center',
    },
    clubCardImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        backgroundColor: '#333',
    },
    clubCardTextContainer: {
        flex: 1,
    },
    clubCardName: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    clubCardDescription: {
        color: '#AAA',
        fontSize: 12,
    },
    clubCardRating: {
        color: '#FFC700',
        fontSize: 12,
        marginTop: 2,
    },
    clubCardPopularRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    clubCardPopular: {
        width: '48%',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    clubCardPopularImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    clubCardPopularOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
    },
    clubCardPopularName: {
        color: '#FFF',
        fontWeight: 'bold',
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
    // --- Search Screen Specific Styles ---
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        height: 50,
        marginHorizontal: 15,
    },
    searchInput: {
        flex: 1,
        color: '#FFF',
        fontSize: 16,
        paddingHorizontal: 5,
    },
    searchIcon: {
        fontSize: 20,
        color: '#FFF',
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#1C1C1C',
        borderRadius: 10,
        marginBottom: 20,
        padding: 5,
        alignSelf: 'stretch',
        marginHorizontal: 15,
    },
    toggleButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 8,
    },
    activeToggleButton: {
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: '#333',
    },
    toggleText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
    },
    activeToggleText: {
        color: '#FFF',
    },
    listContent: {
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    entityImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        backgroundColor: '#333',
        borderWidth: 1,
        borderColor: '#FFC700'
    },
    textContainer: {
        justifyContent: 'center',
    },
    entityName: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    entityLocation: {
        color: '#AAA',
        fontSize: 14,
        marginTop: 2,
    },
    // --- Bottom Nav Styles ---
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        backgroundColor: '#000',
        borderTopColor: '#1A1A1A',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        zIndex: 100,
    },
    navItem: {
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    navItemCenter: {
        alignItems: 'center',
        marginTop: -20,
    },
    navText: {
        color: '#888',
        fontSize: 24,
    },
    navTextActive: {
        color: '#FFF',
        fontSize: 24,
    },
    navLabel: {
        color: '#888',
        fontSize: 12,
    },
    navLabelActive: {
        color: '#FFF',
        fontSize: 12,
    },
    plusButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFC700',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusText: {
        color: '#000',
        fontSize: 30,
        lineHeight: 30,
        fontWeight: 'bold',
    },
    // --- Chat Screen Styles (New) ---
    chatScreenContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    chatHeaderTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 15,
    },
    chatHeaderAvatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginRight: 10,
    },
    chatHeaderTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    chatHeaderMenu: {
        color: '#FFF',
        fontSize: 30,
        lineHeight: 30,
    },
    chatListContent: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    messageRow: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'flex-end',
    },
    messageRowUser: {
        justifyContent: 'flex-end',
    },
    messageRowOther: {
        justifyContent: 'flex-start',
    },
    chatAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 5,
        backgroundColor: '#333',
        marginBottom: 5, // Align with bottom of bubble
    },
    bubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 15,
        elevation: 1,
    },
    userBubble: {
        backgroundColor: '#FFC700', // Yellow background for user messages
        borderTopRightRadius: 5,
        borderBottomRightRadius: 15,
    },
    otherBubble: {
        backgroundColor: '#1C1C1C', // Dark grey background for others
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 15,
    },
    userText: {
        color: '#000',
        fontSize: 15,
    },
    otherText: {
        color: '#FFF',
        fontSize: 15,
    },
    chatInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#1A1A1A',
    },
    chatInput: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        borderRadius: 20,
        color: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        fontSize: 16,
    },
    chatIconMicrophone: {
        padding: 8,
    },
    chatIconSend: {
        backgroundColor: '#FFC700',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    chatIconText: {
        fontSize: 20,
        color: '#FFF',
    },
    chatIconTextSend: {
        fontSize: 20,
        color: '#000',
        lineHeight: 25, // Correct alignment
        fontWeight: 'bold',
    },
});

export default LeoApp;