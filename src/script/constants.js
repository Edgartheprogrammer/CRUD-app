// constants.js

export const FormModes = {
  INITIAL: 'INITIAL',
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  SEARCH: 'SEARCH',
};

let previousAction = null;

export function setPreviousAction(action) {
  previousAction = action;
}

export function getPreviousAction() {
  return previousAction;
}