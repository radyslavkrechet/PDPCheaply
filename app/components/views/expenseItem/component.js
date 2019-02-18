import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import moment from 'moment';

import styles from './styles';

const amountLocale = 'en-US';

const amountLocaleOptions = {
  style: 'currency',
  currency: 'USD',
};

const ExpenseItem = ({ item }) => (
  <View style={styles.container}>
    <Image
      style={styles.icon}
      source={{
        uri: item.categoryIconUrl,
      }}
    />
    <View style={styles.content}>
      <Text style={styles.categoryText}>
        {item.categoryName}
      </Text>
      <View style={styles.bottomContent}>
        <Text style={styles.timeText}>
          {moment(item.time).fromNow()}
        </Text>
        <Text style={styles.amountText}>
          {item.amount.toLocaleString(amountLocale, amountLocaleOptions)}
        </Text>
      </View>
    </View>
  </View>
);

ExpenseItem.propTypes = {
  item: PropTypes.shape({
    categoryIconUrl: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default ExpenseItem;
