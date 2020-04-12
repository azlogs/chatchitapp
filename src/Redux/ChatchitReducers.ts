import { contacts } from './ContactReducers/';
import { leftSide } from './LeftSideReducer';
import { chatWindow } from './ChatWindowReducer';
import { authorize } from './AuthorizeReducer';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

const chatchitReducers = combineReducers({
  router: connectRouter(history),
  contacts,
  leftSide,
  chatWindow,
  authorize
});

export default chatchitReducers;