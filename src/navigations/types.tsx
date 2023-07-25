import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type drawerParamList = {
  Assignments: undefined;
  Dashboard: undefined;
  Settigns: undefined;
  Location: undefined;
  Notification: undefined;
  HelpAndSupport: undefined;
};

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  CreateProfile: undefined;
  VerifyStatus: undefined;
  Home: NavigatorScreenParams<drawerParamList> & { screen?: keyof drawerParamList };
  Faq: undefined;
  TandC: undefined;
  About: undefined;
  Policy: undefined;
  AssignmentDetail: undefined;
};


export type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  DrawerNavigationProp<drawerParamList>
>;