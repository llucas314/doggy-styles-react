import React from 'react';
import { storiesOf } from '@storybook/react';
import Dog from './Dog';

storiesOf('Dog', module)
  .add('Search Dog', () => <Dog />)