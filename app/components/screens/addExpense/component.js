import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Picker } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import COLORS from '../../../constants/colors';
import FORMS from '../../../constants/reduxForms';
import translations from '../../../i18n';
import FormTextInput from '../../views/formTextInput';
import FormPicker from '../../views/formPicker';

const categoryItemList = (categoryList) => {
  const itemList = categoryList.map(category => (
    <Picker.Item
      key={category.id}
      value={category.id}
      label={category.name}
    />
  ));

  return itemList;
};

const AddExpenseComponent = ({ categoryList }) => (
  <ScrollView
    keyboardShouldPersistTaps="handled"
    keyboardDismissMode="on-drag"
  >
    <Field
      name="amount"
      autoFocus
      placeholder={translations.t('amount')}
      selectionColor={COLORS.BRAND}
      keyboardType="numeric"
      component={FormTextInput}
    />
    <Field
      name="category"
      label={translations.t('category')}
      component={FormPicker}
    >
      {categoryItemList(categoryList)}
    </Field >
  </ScrollView >
);

AddExpenseComponent.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default reduxForm({ form: FORMS.ADD_EXPENSE })(AddExpenseComponent);
