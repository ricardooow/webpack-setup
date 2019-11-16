// storybook config file
import { configure } from '@storybook/react';

configure(require.context('../src/stories', true, /\.stories\.js$/), module);