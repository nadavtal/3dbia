/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  users: {
    id: `${scope}.users`,
    defaultMessage: 'users',
  },
  roles: {
    id: `${scope}.roles`,
    defaultMessage: 'roles',
  },
  bridgePage: {
    id: `${scope}.bridgePage`,
    defaultMessage: 'Project page',
  },
  projectsPage: {
    id: `${scope}.projects `,
    defaultMessage: 'Projects',
  },
  messages: {
    id: `${scope}.messages`,
    defaultMessage: 'Messages',
  },
});
