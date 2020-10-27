import React from 'react';
import {ITextProps, Text} from '@fluentui/react/lib/Text';
import {getTheme} from '@fluentui/react/lib/Styling';

const theme = getTheme();

export const ErrorText: React.FC<ITextProps> = (props) => (
  <Text
    variant="small"
    styles={{root: {color: theme.semanticColors.errorText}}}
    {...props}
  />
);
