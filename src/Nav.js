import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
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
  Family: UserNavigator,
  Notifications: AllAlerts
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    { Account: AuthNavigator, App: RootNavigator },
    {
      initialRouteName: "Account",
      activeColor: "#f0edf6",
      inactiveColor: "#3e2465"
    }
  )
);

export default AppContainer;
