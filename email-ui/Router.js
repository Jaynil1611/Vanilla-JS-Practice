import { MailList } from "./MailList.js";

const routes = [
  {
    path: "/",
    view: () => new MailList("inbox"),
  },
  { path: "/important", view: () => new MailList("important") },
  { path: "/sent", view: () => new MailList("sent") },
  {
    path: "/mails/mail_csfsdfsdf",
    view: () => "mail content",
  },
];

const matchPathName = (path) => {
  if (path && path.includes("mails")) {
    const result = path.split("/");
    console.log({ result });
    return result.length === 3;
  }
  return path === location.pathname;
};

export const router = async () => {
  const allRoutes = routes.map((route) => {
    return {
      route,
      isMatch: matchPathName(route.path),
    };
  });

  let match = allRoutes.find((route) => route.isMatch);

  if (!match) {
    match = { route: routes[0], isMatch: true };
  }

  match.route.view();
  // document.querySelector("#mail_list").innerHTML = view;
};

export const navigateTo = (route) => {
  history.pushState(null, null, route);
  router();
};
