import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

type TabParamList = {
    Assignments: undefined
}

export type RootStackParamList = {
    Landing: undefined;
    Login: undefined;
    Verify: undefined;
    VerifyStatus: undefined;
    Home: NavigatorScreenParams<TabParamList>;
  };