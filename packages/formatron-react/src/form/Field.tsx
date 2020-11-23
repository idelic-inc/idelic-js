import {Shimmer, ShimmerElementType} from '@fluentui/react/lib/Shimmer';
import React, {ReactElement, useMemo} from 'react';

import {useFormatron} from '../context';
import {useField, useFormContext} from './Form';

export interface FieldProps {
  field: string;
  renderLoadingState?: () => ReactElement;
}

export const Field: React.FC<FieldProps> = ({field, renderLoadingState}) => {
  const {fieldComponents} = useFormatron();
  const {isLoading} = useFormContext();
  const item = useField(field);
  const FieldComponent = useMemo(() => {
    if (!item.dataType) {
      return undefined;
    }
    const component = fieldComponents[item.dataType.type];
    if (!component) {
      console.error(
        `No field component found for dataType "${item.dataType.type}"`
      );
    }
    return component;
  }, [item]);
  if (!FieldComponent || isLoading) {
    return renderLoadingState ? (
      renderLoadingState()
    ) : (
      <div>
        <Shimmer
          shimmerElements={[
            {
              type: ShimmerElementType.line,
              height: 19
            }
          ]}
          styles={{root: {padding: '5px 0', width: '33%'}}}
        />
        <Shimmer
          shimmerElements={[{type: ShimmerElementType.line, height: 32}]}
        />
      </div>
    );
  }
  return <FieldComponent field={item} />;
};
