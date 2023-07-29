const routes = [
  { path: "/", view: () => "inbox" },
  { path: "/important", view: () => "important" },
  { path: "/sent", view: () => "sent" },
];

export const router = async () => {
  const allRoutes = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname,
    };
  });

  let match = allRoutes.find((route) => route.isMatch);
  if (!match) {
    match = { route: routes[0], isMatch: true };
  }
  const view = match.route.view();

  document.querySelector("#app").innerHTML = view;
};

export const navigateTo = (route) => {
  history.pushState(null, null, route);
  router();
};
