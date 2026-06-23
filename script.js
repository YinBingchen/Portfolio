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
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});