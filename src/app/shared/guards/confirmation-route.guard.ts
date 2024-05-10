import type { CanDeactivateFn } from '@angular/router';

export const confirmationRouteGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  if (confirm("Changes will not be saved. Are you sure to change the screen?")) {
    return true;
  } else {
    return false;
  }
};
