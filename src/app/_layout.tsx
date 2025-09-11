import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack, SplashScreen } from 'expo-router';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';
import { useLogPlayerState } from '@/hooks/useLogPlayerState';


SplashScreen.preventAutoHideAsync();

const App = () => {
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  })

  useSetupTrackPlayer({
    onLoad: () => {
      console.log("Track Player is ready");
    }
  });

  useLogPlayerState();

  return (
		<SafeAreaProvider>      
        {/*<GestureHandlerRootView style={{flex: 1}}>*/}
				  <RootNavigation />
          <StatusBar style="auto" />
        {/*</GestureHandlerRootView>*/}
		</SafeAreaProvider>
	)
};

const RootNavigation = () => {
   return ( 
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>

      <Stack.Screen 
        name="player" 
        options={{
          presentation: 'card',
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationDuration: 400,
          headerShown: false,
        }}
      />
    </Stack>
   )
};

export default App