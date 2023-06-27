import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

export type drawerParamList = {
    Assignments: undefined;
    Dashboard: undefined;
    Settigns: undefined;
    Revenue:undefined;
    Notification:undefined;
    HelpAndSupport: undefined
}

export type RootStackParamList = {
    Landing: undefined;
    Login: undefined;
    CreateProfile: undefined;
    VerifyStatus: undefined;
    Home: NavigatorScreenParams<drawerParamList>;
  };