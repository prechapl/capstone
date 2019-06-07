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
import AllPolls from "./AllPolls";
import SinglePoll from "./SinglePoll";
import CreatePoll from "./CreatePoll";
import ForgotPassword from "./ForgotPassword";
import Events from "./Events";
import SingleEvent from "./SingleEvent";
import AddEvent from "./AddEvent";
import AvatarGenerator from "./AvatarGenerator";

const PollsNavigator = createStackNavigator({
  Polls: AllPolls,
  Poll: SinglePoll,
  CreatePoll: CreatePoll
});

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
    AvatarGenerator: {
      screen: AvatarGenerator
    }
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

const EventNavigator = createStackNavigator({
  Events: Events,
  Event: SingleEvent,
  AddEvent: AddEvent
});

const RootNavigator = createBottomTabNavigator({
  Account: AuthNavigator,
  User: UserNavigator,
  Polls: PollsNavigator,
  Events: EventNavigator
});

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
