import AboutMe from "./views/AboutMe.js";
import Experience from "./views/Experience.js";
import Education from "./views/Education.js";
import Projects from "./views/Projects.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: AboutMe},
        { path: "/experience", view: Experience},
        { path: "/education", view: Education},
        { path: "/projects", view: Projects}
    ];

    const potentialMatches = routes.map(route => {
        return {
            route,
        
            isMatch: new RegExp(`^${route.path}$`).test(location.pathname)

        };
    });
    
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

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
