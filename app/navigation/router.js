import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import COLORS from '../constants/colors';
import ExpenseListScreen from '../components/screens/expenseList';
import AddExpenseScreen from '../components/screens/addExpense';
import ProfileScreen from '../components/screens/profile';
import SignUpScreen from '../components/screens/signUp';
import SignInScreen from '../components/screens/signIn';

const homeIcon = require('../icons/home.png');
const profileIcon = require('../icons/profile.png');

const tabBarIcon = source => ({ tintColor }) => <Image source={source} style={{ tintColor }} />;

const HomeStack = createStackNavigator(
  {
    ExpenseList: ExpenseListScreen,
    AddExpense: AddExpenseScreen,
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: COLORS.BRAND,
      },
      headerTintColor: 'white',
    },
  },
);

const ProfileStack = createStackNavigator(
  {
    Proile: ProfileScreen,
    SignUp: SignUpScreen,
    SignIn: SignInScreen,
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: COLORS.BRAND,
      },
      headerTintColor: 'white',
    },
  },
);

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: tabBarIcon(homeIcon),
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: tabBarIcon(profileIcon),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: COLORS.BRAND,
      inactiveTintColor: COLORS.GRAY,
      showIcon: true,
      showLabel: false,
      scrollEnabled: false,
      style: {
        backgroundColor: 'white',
      },
      indicatorStyle: {
        display: 'none',
      },
    },
    tabBarPosition: 'bottom',
  },
);
