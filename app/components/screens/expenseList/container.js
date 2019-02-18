import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import translations from '../../../i18n';
import { restoreSession } from '../../../store/session';
import { restoreCategoryList } from '../../../store/categoryList';
import { loadExpenseList, refreshExpenseList } from '../../../store/expenseList';

import ExpenseListComponent from './component';

class ExpenseListContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: translations.t('home'),
      headerRight: params.signedIn && (
        <Button
          title={translations.t('add')}
          color="white"
          onPress={() => params.add()}
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.handleAddButtonPress = () => {
      this.props.navigation.navigate('AddExpense');
    };

    this.handleExpenseListRefresh = () => {
      if (!this.props.loading) {
        this.props.refreshExpenseList(this.props.user.id, this.props.categoryList);
      }
    };

    this.handleExpenseListEndReached = () => {
      if (!this.props.loading && this.props.canLoadMore) {
        const lastExpense = this.props.expenseList[this.props.expenseList.length - 1];
        const startAt = moment(lastExpense.time).utc().format();

        this.props.loadExpenseList(this.props.user.id, this.props.categoryList, startAt);
      }
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content');

    this.props.restoreSession();
    this.props.restoreCategoryList();

    this.props.navigation.setParams({
      signedIn: this.props.signedIn,
      add: this.handleAddButtonPress,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signedIn !== this.props.signedIn) {
      this.props.navigation.setParams({
        signedIn: this.props.signedIn,
      });
    }

    if (!prevProps.error && this.props.error) {
      Alert.alert(translations.t('error'), this.props.error);
    }

    const isExpenseListExist = this.props.expenseList;
    const isLoading = this.props.loading;
    const isUserExist = this.props.user;
    const isCategoryListExist = this.props.categoryList;

    if (!isExpenseListExist && !isLoading && isUserExist && isCategoryListExist) {
      this.props.loadExpenseList(this.props.user.id, this.props.categoryList);
    }
  }

  render() {
    return (
      <ExpenseListComponent
        signedIn={this.props.signedIn}
        loading={this.props.loading}
        refreshing={this.props.refreshing}
        expenseList={this.props.expenseList}
        onExpenseListRefresh={this.handleExpenseListRefresh}
        onExpenseListEndReached={this.handleExpenseListEndReached}
      />
    );
  }
}

ExpenseListContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  signedIn: PropTypes.bool.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    iconUrl: PropTypes.string.isRequired,
  })),
  loading: PropTypes.bool.isRequired,
  refreshing: PropTypes.bool.isRequired,
  canLoadMore: PropTypes.bool.isRequired,
  expenseList: PropTypes.arrayOf(PropTypes.shape({
    categoryIconUrl: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })),
  error: PropTypes.string,
  restoreSession: PropTypes.func.isRequired,
  restoreCategoryList: PropTypes.func.isRequired,
  loadExpenseList: PropTypes.func,
  refreshExpenseList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.session.user,
  signedIn: state.session.user !== null,
  categoryList: state.categoryList.categoryList,
  loading: state.expenseList.loading,
  refreshing: state.expenseList.refreshing,
  canLoadMore: state.expenseList.canLoadMore,
  expenseList: state.expenseList.expenseList,
  error: state.expenseList.error,
});

const mapDispatchToProps = {
  restoreSession,
  restoreCategoryList,
  loadExpenseList,
  refreshExpenseList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListContainer);
