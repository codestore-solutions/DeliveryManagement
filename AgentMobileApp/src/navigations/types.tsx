import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

type TabParamList = {
    Assignments: undefined
}

export type RootStackParamList = {
    Landing: undefined;
    Login: undefined;
    Signup: undefined;
    Verify: undefined;
    Profile: undefined;
    Home: NavigatorScreenParams<TabParamList>;
    AddupdateProfile: undefined | {userId: {}};
  };