import AboutMe from "./views/AboutMe.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: AboutMe},
        //{ path: "/experience" },
        // { path: "/education/:id" },
        // { path: "/projects" }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route,
            // result: location.pathname.match(pathToRegex(route.path))
            isMatch: location.pathname === route.path
        };
    });
    
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    
    /* Route not found - return first route OR a specific "not-found" route */
    if (!match) {
        match = {
            //default view
            route: routes[0],
            // result: [location.pathname]
            isMatch: true
        };
    }

    const view = new match.route.view();
    
    document.querySelector('#app').innerHTML = await view.getHtml();
};


window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    /* Document has loaded -  run the router! */
    router();
});
