import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import FORMS from '../../../constants/reduxForms';
import translations from '../../../i18n';
import { addExpense } from '../../../store/expenseList';

import AddExpenseComponent from './component';

class AddExpenseContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || { disabled: true };

    return {
      headerRight: params.loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Button
          title={translations.t('add')}
          color="white"
          disabled={params.disabled}
          onPress={() => params.add()}
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.handleAddButtonPress = () => {
      const userId = this.props.user.id;
      const { category, amount } = this.props.formValues;

      this.props.addExpense(userId, this.props.categoryList, category, amount);
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      loading: this.props.loading,
      disabled: true,
      add: this.handleAddButtonPress,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading && !this.props.error) {
      this.props.navigation.goBack();
    }

    if (prevProps.loading !== this.props.loading) {
      this.props.navigation.setParams({
        loading: this.props.loading,
      });
    }

    if (prevProps.formValues !== this.props.formValues) {
      const isFormValuesObjectExist = this.props.formValues !== undefined;
      let isFormValuesPropertiesExist = false;

      if (isFormValuesObjectExist) {
        const { formValues } = this.props;
        const isCategoryExist = formValues.category !== undefined;
        const isAmountExist = formValues.amount !== undefined;

        isFormValuesPropertiesExist = isCategoryExist && isAmountExist;
      }

      this.props.navigation.setParams({
        disabled: !(isFormValuesObjectExist && isFormValuesPropertiesExist),
      });
    }

    if (!prevProps.error && this.props.error) {
      Alert.alert(translations.t('error'), this.props.error);
    }
  }

  render() {
    return <AddExpenseComponent categoryList={this.props.categoryList} />;
  }
}

AddExpenseContainer.propTypes = {
  navigation: PropTypes.shape({
    setParams: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  formValues: PropTypes.shape({
    amount: PropTypes.string,
    category: PropTypes.string,
  }),
  addExpense: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.session.user,
  categoryList: state.categoryList.categoryList,
  loading: state.expenseList.addExpenseLoading,
  error: state.expenseList.addExpenseError,
  formValues: getFormValues(FORMS.ADD_EXPENSE)(state),
});

const mapDispatchToProps = {
  addExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseContainer);
