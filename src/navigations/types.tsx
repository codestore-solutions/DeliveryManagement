import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

export type drawerParamList = {
    Assignments: undefined;
    Dashboard: undefined;
    Settigns: undefined;
    Location:undefined;
    Notification:undefined;
    HelpAndSupport: undefined
}

export type RootStackParamList = {
    Landing: undefined;
    Login: undefined;
    CreateProfile: undefined;
    VerifyStatus: undefined;
    Home: NavigatorScreenParams<drawerParamList>;
    Faq: undefined;
    TandC: undefined;
    About: undefined;
    Policy: undefined;
    AssignmentDetail: undefined;
  };