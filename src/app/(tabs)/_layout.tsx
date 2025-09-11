import { colors, fontSize } from '@/constants/tokens';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FloatingPlayer } from 'components/FloatingPlayer';

const TabsNavigation = () => {
    return (
        <>
        <Tabs 
        screenOptions={{  
            tabBarActiveTintColor: colors.primary,
            tabBarLabelStyle: {
                fontSize: fontSize.xs,
                fontWeight: '500',
            },
            headerShown: false,
            tabBarStyle: {
                position:'absolute',
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                borderTopWidth: 0,
                paddingTop: 8,
            },
            tabBarBackground: () => 
            <BlurView 
                intensity={30} 
                style={{
                    ...StyleSheet.absoluteFillObject,
                    overflow: 'hidden',
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                }}
            />,
        }}
        >
            <Tabs.Screen name="favorite"
            options={{ 
                title: 'Favorite',
                tabBarIcon: ({ color }: { color: string }) => <FontAwesome name="heart" size={24} color={color} />,
            }} 
            />
            <Tabs.Screen name="playlist"
            options={{
                title: 'Playlists',
                tabBarIcon: ({ color }: { color: string }) => <MaterialCommunityIcons name="playlist-play" size={24} color={color} />,
            }}
            />
            <Tabs.Screen name="(songs)" 
            options={{
                title: 'Songs',
                tabBarIcon: ({ color }: { color: string }) => <Ionicons name="musical-notes-sharp" size={24} color={color} />,
            }}
            />
            <Tabs.Screen name="artists"
            options={{
                title: 'Artists',
                tabBarIcon: ({ color }: { color: string }) => <FontAwesome6 name="users-line" size={24} color={color} />,
            }}
            />
        </Tabs>

        <FloatingPlayer 
        style={{
            position: 'absolute',
            left: 8,
            right: 8,
            bottom: 78,
        }}/>
        </>

    )
}

export default TabsNavigation