const courses = [
    {
        code: "CSE 110",
        name: "Intro to Programming",
        category: "CSE",
        completed: true
    },
    {
        code: "CSE 111",
        name: "Programming with Functions",
        category: "CSE",
        completed: true
    },
    {
        code: "CSE 210",
        name: "Programming with Classes",
        category: "CSE",
        completed: true
    },
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        category: "WDD",
        completed: true
    },
    {
        code: "WDD 131",
        name: "Dynamic Web Fundamentals",
        category: "WDD",
        completed: true
    },
    {
        code: "WDD 231",
        name: "Web Frontend Development I",
        category: "WDD",
        completed: false
    }
];

function renderCourses(filter = "all") {
    const list = document.getElementById("course-list");
    list.innerHTML = "";

    const filtered = filter === "all"
        ? courses
        : courses.filter(course => course.category === filter);

    filtered.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) card.classList.add("completed");

        card.innerHTML = `
        <h3>${course.code}</h3>
        <p>${course.name}</p>
      `;

        list.appendChild(card);
    });

    // Always show "Total Credits: 6" regardless of filter
    document.getElementById("total-credits").textContent = "Total Credits: 6";
}

document.addEventListener("DOMContentLoaded", () => {
    renderCourses();

    document.querySelectorAll(".filters button").forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");
            renderCourses(filter);
        });
    });
});
  