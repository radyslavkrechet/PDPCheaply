import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import translations from '../../../i18n';
import EmptyState from '../../views/emptyState';
import LoadingState from '../../views/loadingState';
import ExpenseList from '../../views/expenseList';

import styles from './styles';

const ExpenseListComponent = (props) => {
  if (props.signedIn) {
    if (props.loading && !props.expenseList) {
      return (
        <LoadingState />
      );
    } else if (!props.expenseList || props.expenseList.length === 0) {
      return (
        <EmptyState text={translations.t('noExpenses')} />
      );
    }

    return (
      <View style={styles.container}>
        <ExpenseList
          list={props.expenseList}
          loading={props.loading}
          refreshing={props.refreshing}
          onListRefresh={props.onExpenseListRefresh}
          onListEndReached={props.onExpenseListEndReached}
        />
      </View>
    );
  }

  return (
    <EmptyState text={translations.t('notAuthorized')} />
  );
};

ExpenseListComponent.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  refreshing: PropTypes.bool.isRequired,
  expenseList: PropTypes.arrayOf(PropTypes.shape({
    categoryIconUrl: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })),
  onExpenseListRefresh: PropTypes.func.isRequired,
  onExpenseListEndReached: PropTypes.func.isRequired,
};

export default ExpenseListComponent;
