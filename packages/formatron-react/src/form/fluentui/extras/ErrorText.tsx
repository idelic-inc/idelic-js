import {getTheme} from '@fluentui/react/lib/Styling';
import {ITextProps, Text} from '@fluentui/react/lib/Text';
import React from 'react';

const theme = getTheme();

export const ErrorText: React.FC<ITextProps> = (props) => (
  <Text
    variant="small"
    styles={{root: {color: theme.semanticColors.errorText}}}
    {...props}
  />
);
