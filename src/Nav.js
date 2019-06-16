import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { Easing, Animated } from "react-native";
import Family from "./Family";
import Login from "./Login";
import SignUp from "./SignUp";
import Mood from "./Mood";
import AllPolls from "./Polls/AllPolls";
import SinglePoll from "./Polls/SinglePoll";
import CreatePoll from "./Polls/CreatePoll";
import ForgotPassword from "./ForgotPassword";
import Events from "./Events/Events";
import SingleEvent from "./Events/SingleEvent";
import AddEvent from "./Events/AddEvent";
import SingleEventAssigned from "./Events/SingleEventAssigned";
import AvatarGenerator from "./AvatarGenerator";
import TwoUp from "./TwoUp";
import Location from "./Location";
import SetAllRelationships from "./SetAllRelationships";
import SetSingleRelationship from "./SetSingleRelationship";
import AllAlerts from "./Alerts/AllAlerts";
import ShareLocation from "./ShareLocation";

const AuthNavigator = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword
});

const UserNavigator = createStackNavigator(
  {
    Family: {
      screen: Family
    },
    Mood: { screen: Mood },
    Events: { screen: Events },
    Event: { screen: SingleEvent },
    EventAssigned: { screen: SingleEventAssigned },
    AddEvent: { screen: AddEvent },
    Polls: { screen: AllPolls },
    Poll: { screen: SinglePoll },
    CreatePoll: { screen: CreatePoll },
    AvatarGenerator: {
      screen: AvatarGenerator
    },
    TwoUp: { screen: TwoUp },
    Location: { screen: Location },
    SetAllRelationships: { screen: SetAllRelationships },
    SetSingleRelationship: { screen: SetSingleRelationship }
  },
  {
    NavigationOptions: {
      gesturesEnabled: false
    },

    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      }
    })
  }
);

const RootNavigator = createBottomTabNavigator({
  Account: AuthNavigator,
  Family: UserNavigator,
  Notifications: AllAlerts,
  ShareLocation: ShareLocation
});

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
