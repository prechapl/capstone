import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Family from "./Family";
import User from "./User";
import Login from "./Login";
import SignUp from "./SignUp";
import Mood from "./Mood";
import AllPolls from "./AllPolls";
import SinglePoll from "./SinglePoll";

const PollsNavigator = createStackNavigator({
  Polls: AllPolls,
  Poll: SinglePoll
});

const AuthNavigator = createStackNavigator({
  "Log In": Login,
  "Sign Up": SignUp
});

const RootNavigator = createBottomTabNavigator({
  Account: AuthNavigator,
  User: User,
  Family: Family,
  Mood: Mood,
  Polls: PollsNavigator
});

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
