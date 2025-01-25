import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClosetProvider } from './src/contexts/ClosetContext';
import WeatherProvider from './src/contexts/WeatherProvider';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Components
import InitialLogin from './src/components/Auth/InitialLogin';
import ChooseUserType from './src/components/Auth/ChooseUserType';
import SeekerLogin from './src/components/Auth/Seeker/SeekerLogin';
import SeekerComplete from './src/components/Auth/Seeker/SeekerComplete';
import SetterLogin from './src/components/Auth/Setter/SetterLogin';
import SetterComplete from './src/components/Auth/Setter/SetterComplete';
import SeekerSignup from './src/components/Auth/SeekerSignup';
import SetterSignup from './src/components/Auth/SetterSignup';
import StyleSelection from './src/components/Auth/StyleSelection';
import StyleResult from './src/components/Auth/StyleResult';
import BodyType from './src/components/Auth/BodyType';
import Congratulations from './src/components/Auth/Congratulations';
import SeekerMainPage from './src/components/Home/Main/SeekerMainPage';
import SetterMainPage from './src/components/Home/Main/SetterMainPage';
import RequestApproval from './src/components/Home/Request/RequestApproval';
import RequestPage from './src/components/Home/Request/RequestPage';
import RequestStyle from './src/components/Home/Request/RequestStyle';
import RequestSent from './src/components/Home/Request/RequestSent';
import RequestAccepted from './src/components/Home/Request/RequestAccepted';
import MatchingPage from './src/components/Home/Matching/MatchingPage';
import MatchingPageSeeker from './src/components/Home/Matching/MatchingPageSeeker';
import AddCloset from './src/components/Closet/AddCloset';
import ClosetMain from './src/components/Closet/ClosetMain';
import DoraCloset from './src/components/Closet/DoraCloset';
import ChatDetail from './src/components/Chat/ChatDetail';
import ChatList from './src/components/Chat/ChatList';
import CalendarWithCloset from './src/components/Calendar/CalendarWithCloset';
import WeatherPage from "./src/components/Weather/WeatherPage";
import PortfolioPage from './src/components/Home/MyPage/PortfolioPage';
import Review from './src/components/Home/MyPage/Review';
import MyPageTabView from './src/components/Home/MyPage/MyPageTabView';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* 모든 스크린을 하나의 네비게이터로 통합 */}
      <Stack.Screen name="InitialLogin" component={InitialLogin} />
      <Stack.Screen name="ChooseUserType" component={ChooseUserType} />
      <Stack.Screen name="SeekerLogin" component={SeekerLogin} />
      <Stack.Screen name="SetterLogin" component={SetterLogin} />
      <Stack.Screen name="SeekerSignup" component={SeekerSignup} />
      <Stack.Screen name="SetterSignup" component={SetterSignup} />
      <Stack.Screen name="StyleSelection" component={StyleSelection} />
      <Stack.Screen name="StyleResult" component={StyleResult} />
      <Stack.Screen name="BodyType" component={BodyType} />
      <Stack.Screen name="Congratulations" component={Congratulations} />
      <Stack.Screen name="PortfolioPage" component={PortfolioPage} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="MyPageTabView" component={MyPageTabView} />
      <Stack.Screen name="AddCloset" component={AddCloset} />
      <Stack.Screen name="ClosetMain" component={ClosetMain} />
      <Stack.Screen name="DoraCloset" component={DoraCloset} />
      <Stack.Screen name="WeatherPage" component={WeatherPage} />
      <Stack.Screen name="SeekerComplete" component={SeekerComplete} />
      <Stack.Screen name="SetterComplete" component={SetterComplete} />
      <Stack.Screen name="SeekerMainPage" component={SeekerMainPage} />
      <Stack.Screen name="SetterMainPage" component={SetterMainPage} />
      <Stack.Screen name="RequestStyle" component={RequestStyle} />
      <Stack.Screen name="RequestApproval" component={RequestApproval} />
      <Stack.Screen name="RequestPage" component={RequestPage} />
      <Stack.Screen name="RequestSent" component={RequestSent} />
      <Stack.Screen name="RequestAccepted" component={RequestAccepted} />
      <Stack.Screen name="MatchingPage" component={MatchingPage} />
      <Stack.Screen name="MatchingPageSeeker" component={MatchingPageSeeker} />
      <Stack.Screen name="CalendarWithCloset" component={CalendarWithCloset} />
      <Stack.Screen name="ChatDetail" component={ChatDetail} />
      <Stack.Screen name="ChatList" component={ChatList} />
    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ClosetProvider>
      <NavigationContainer>
        <WeatherProvider>
          <SafeAreaView style={[styles.container, backgroundStyle]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <AppNavigator />
          </SafeAreaView>
        </WeatherProvider>
      </NavigationContainer>
    </ClosetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
