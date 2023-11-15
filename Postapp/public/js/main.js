const API_URL = 'http://localhost:3000/api/posts';

function fetchPosts() {
    return fetch(API_URL)
        .then(response => response.json());
}

function createPost(title, description, author) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, author }),
    })
        .then(response => response.json());
}

function updatePost(id, data) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json());
}

function deletePost(id) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json());
}

const createForm = document.getElementById('create-form');
const postList = document.getElementById('post-list');

createForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const postTitle = createForm['post-title'].value;
    const postContent = createForm['post-content'].value;
    const createdBy = createForm['creator'].value;

    createPost(postTitle, postContent, createdBy).then(() => {
        createForm.reset();
        loadPosts();
    });
});

function openEditModal(postData) {
    fetch('edit_modal.html').then(response => response.text()).then(modalHtml => {
        const body = document.querySelector('body');
        body.insertAdjacentHTML('beforeend', modalHtml);

        const editModal = document.getElementById('edit-modal');
        const editForm = document.getElementById('edit-form');
        const closeModal = document.getElementById('close-modal');

        editModal.style.display = 'block';
        editForm['edit-post-id'].value = postData.id;
        editForm['edit-post-title'].value = postData.title;
        editForm['edit-post-content'].value = postData.description;
        editForm['edit-creator'].value = postData.author;

        closeModal.addEventListener('click', () => {
            editModal.style.display = 'none';
            // Remove the modal from the body after closing
            editModal.remove(); // Correct this line
        });

        editForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const postId = parseInt(editForm['edit-post-id'].value, 10);
            const postTitle = editForm['edit-post-title'].value;
            const postContent = editForm['edit-post-content'].value;
            const createdBy = editForm['edit-creator'].value;

            updatePost(postId, {
                title: postTitle, // Change this key
                description: postContent, // Change this key
                author: createdBy, // Change this key
            }).then(() => {
                editModal.style.display = 'none';
                editModal.remove();
                loadPosts();
            });
        });
    });
}

function renderPost(post) {
    const postItem = document.createElement('li');
    postItem.className = 'post-item';
    postItem.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <p>By: ${post.author}</p>
        <button class="delete-button button" data-id="${post.id}">Delete</button>
        <button class="edit-button button" data-id="${post.id}">Edit</button>
    `;

    postItem.querySelector('.delete-button').addEventListener('click', () => {
        const postId = parseInt(post.id, 10); // Retrieve postId directly from the 'post' object
        deletePost(postId).then(() => {
            loadPosts();
        });
    });

    postItem.querySelector('.edit-button').addEventListener('click', () => {
        openEditModal(post); // Pass the entire post object
    });

    return postItem;
}

function renderPosts(posts) {
    postList.innerHTML = '';
    posts.forEach((post) => {
        const postItem = renderPost(post);
        postList.appendChild(postItem);
    });
}

function loadPosts() {
    fetchPosts().then(renderPosts);
}

loadPosts();
setInterval(loadPosts, 5000);