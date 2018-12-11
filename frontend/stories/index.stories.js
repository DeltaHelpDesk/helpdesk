import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import Menu from './../src/components/Menu.tsx';
import Login from './../src/components/Login.tsx';
import Administration from './../src/components/Administration';
import MicrosoftButtonLogin from './../src/components/MicrosoftButtonLogin';


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('Menu', module).add('Default', () => <Menu />)
storiesOf('Login', module).add('Default', () => <Login />)
storiesOf('Administration', module).add('Default', () => <Administration />)
storiesOf('MicrosoftButtonLogin', module).add('Default', () => <MicrosoftButtonLogin />)
