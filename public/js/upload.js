var current_project = {
    "project_name": "SO_project",
    "categories": [
        {
            "id": 0,
            "title": "cat-1",
            "entries":
            [ 
                {
                    "name": "entry-1-1",
                    "sections": [ {"type": ""} ]
                },

                {
                    "name": "entry-1-2",
                    "sections": [ {"type": ""} ]
                },

                {
                    "name": "entry-1-3",
                    "sections": [ {"type": ""} ]
                }
            ],
        },
        {
            "id": 1,
            "title": "cat-2",
            "entries":
            [ 
                {
                    "name": "entry-2-1",
                    "sections": [ {"type": ""} ]
                },

                {
                    "name": "entry-2-2",
                    "sections": [ {"type": ""} ]
                }
            ],
        }
    ],
};

const proj_name = document.getElementById("proj-name");

window.onload = () => {
    if (current_project !== null) {
        loadProject(current_project);
    }
}


function loadProject(project) {
    current_project = project;
    proj_name.value = current_project.project_name;


    current_project.categories.forEach((category, i) => {
        let det = document.createElement("details");
        let sum = document.createElement("summary");

        det.id = "cat-" + i;
        det.className = "category"; 
        sum.textContent = category.title;

        det.appendChild(sum);

        category.entries.forEach((entry, j) => {
            const p = document.createElement("p");

            p.className = "entry";
            p.textContent = entry.name;

            p.onclick = (event) => {
                console.log(i, j);
                selectEntry(i, j);
            };

            det.appendChild(p);
        });

        sidebar.appendChild(det);
    });
}

function saveProject() {
    current_project.project_name = proj_name.value;
}

function downloadProject() {
    saveProject();

    let blob = new Blob([JSON.stringify(current_project)], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.href = url;
    link.download = current_project.project_name + ".json";
    link.click();

    URL.revokeObjectURL(url);
}