import React, {useMemo} from 'react';

import {useFormatron} from '../context';
import {useField} from './ModelForm';

export interface FieldProps {
  field: string;
}

export const Field: React.FC<FieldProps> = ({field}) => {
  const {fieldComponents} = useFormatron();
  const item = useField(field);
  const FieldComponent = useMemo(
    () => (item.dataType ? fieldComponents[item.dataType.type] : undefined),
    [item]
  );
  return FieldComponent ? <FieldComponent field={item} /> : null;
};
