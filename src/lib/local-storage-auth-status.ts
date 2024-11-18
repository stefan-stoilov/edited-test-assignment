export function getLsAuthStatus() {
  if (localStorage.getItem("isAuthenticated")) return true;

  if (sessionStorage.getItem("isAuthenticated")) return true;

  return false;
}

export function setLsAuthStatus({
  isAuthenticated,
  shouldRememberUser,
}: {
  isAuthenticated: boolean;
  shouldRememberUser?: boolean;
}) {
  if (!isAuthenticated) {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
  } else {
    if (shouldRememberUser) {
      localStorage.setItem("isAuthenticated", "true");
      sessionStorage.removeItem("isAuthenticated");
    } else {
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.removeItem("isAuthenticated");
    }
  }
}
