const links = document.querySelectorAll("nav a");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});
// Career Page //
const careerTabs = document.querySelectorAll(".career-tab");
const careerContents = document.querySelectorAll(".career-content");

careerTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    careerTabs.forEach(item => item.classList.remove("active"));
    careerContents.forEach(item => item.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});
// Projects Page //
const projectTabs = document.querySelectorAll(".project-tab");
const projectContents = document.querySelectorAll(".project-content");

projectTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    projectTabs.forEach(item => item.classList.remove("active"));
    projectContents.forEach(item => item.classList.remove("active"));

    tab.classList.add("active");

    const content = document.getElementById(tab.dataset.tab);

    if (content) {
      content.classList.add("active");
    }
  });
});

// Show project details within the Projects page
const projectList = document.querySelector(".project-page");
const projectViews = document.querySelectorAll(".project-detail-view");

let projectTransitioning = false;
let projectListScroll = 0;
let selectedProjectCard = null;

const projectDelay = ms =>
  new Promise(resolve => window.setTimeout(resolve, ms));

async function switchProjectView(from, to, scrollPosition, focusTarget) {
  if (projectTransitioning) return;
  projectTransitioning = true;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const duration = reducedMotion ? 0 : 250;

  // Fade out the current view.
  from.classList.add("view-transitioning");
  await projectDelay(duration);

  // Replace it with the next view.
  from.hidden = true;
  from.classList.remove("view-transitioning");

  to.classList.add("view-transitioning");
  to.hidden = false;

  // Restore the appropriate scroll position immediately.
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo(0, scrollPosition);
  root.style.scrollBehavior = previousScrollBehavior;

  // Establish the starting style before fading in.
  void to.offsetWidth;
  to.classList.remove("view-transitioning");

  await projectDelay(duration);

  focusTarget?.focus({ preventScroll: true });
  projectTransitioning = false;
}

if (projectList) {
  document.querySelectorAll("[data-project]").forEach(card => {
    card.addEventListener("click", () => {
      if (projectTransitioning) return;

      const detail = document.getElementById(card.dataset.project);

      if (!detail?.classList.contains("project-detail-view")) return;

      selectedProjectCard = card;
      projectListScroll = window.scrollY;

      switchProjectView(
        projectList,
        detail,
        0,
        detail.querySelector("h2")
      );
    });
  });

  projectViews.forEach(detail => {
    detail.querySelector(".project-back").addEventListener("click", () => {
      switchProjectView(
        detail,
        projectList,
        projectListScroll,
        selectedProjectCard
      );
    });
  });
}