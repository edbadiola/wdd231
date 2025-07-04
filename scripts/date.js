document.addEventListener("DOMContentLoaded", () => {
    // Set current year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Set last modified
    document.getElementById("lastModified").textContent =
        "Last Modification: " + document.lastModified;
});
  