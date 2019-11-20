import React from 'react';
import { storiesOf } from '@storybook/react';
import TextInput from './TextInput';
import SubmitInput from './SubmitInput';

function test() {
  alert('Test onChange');
}

storiesOf('Input', module)
  .add('Text Input', () => <TextInput name={'Test Name'} placeholder={'Test Placeholder'} onChange={test} />)
  .add('Submit Input', () => <SubmitInput />)