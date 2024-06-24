document.addEventListener("DOMContentLoaded", function() {
    const projectsContainer = document.getElementById('projectsContainer');
    const noResultsMessage = document.getElementById('noResultsMessage');

    fetch('assets/projects.json')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
                data.forEach(project => {
                    const projectElement = document.createElement('article');
                    projectElement.classList.add('project');
                    
                    projectElement.innerHTML = `
                        <img src="${project.image}" alt="${project.title}">
                        <h2>${project.title}</h2>
                        <p>${project.description}</p>
                        <button class="btn-code" onclick="window.open('${project.sourceCodeLink}', '_blank')">Source Code</button>
                        <button class="btn-live" onclick="window.open('${project.liveDemoLink}', '_blank')">View Live</button>
                    `;

                    projectsContainer.appendChild(projectElement);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching the projects:', error);
            noResultsMessage.style.display = 'block';
            noResultsMessage.textContent = 'Failed to load projects :(';
        });

    document.getElementById('searchInput').addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase();
        const projects = document.querySelectorAll('.project');

        let hasResults = false;

        projects.forEach(project => {
            const title = project.querySelector('h2').textContent.toLowerCase();
            if (title.includes(searchText)) {
                project.style.display = '';
                hasResults = true;
            } else {
                project.style.display = 'none';
            }
        });

        noResultsMessage.style.display = hasResults ? 'none' : 'block';
    });
});
