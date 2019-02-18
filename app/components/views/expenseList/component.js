import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import ExpenseItem from '../expenseItem';
import Separator from '../separator';
import LoadingFooter from '../loadingFooter';

const ExpenseList = props => (
  <FlatList
    data={props.list}
    renderItem={({ item }) => <ExpenseItem item={item} />}
    ItemSeparatorComponent={() => <Separator />}
    ListFooterComponent={() => <LoadingFooter loading={props.loading} />}
    keyExtractor={item => item.time}
    onRefresh={props.onListRefresh}
    refreshing={props.refreshing}
    onEndReached={props.onListEndReached}
    onEndReachedThreshold={0.01}
  />
);

ExpenseList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    categoryIconUrl: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })),
  loading: PropTypes.bool.isRequired,
  refreshing: PropTypes.bool.isRequired,
  onListRefresh: PropTypes.func.isRequired,
  onListEndReached: PropTypes.func.isRequired,
};

export default ExpenseList;
