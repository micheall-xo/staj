const blogForm = document.getElementById('blogForm');
const blogList = document.getElementById('blogList');
const cancelEditBtn = document.getElementById('cancelEdit');

let editingPostId = null;

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function displayBlogPosts() {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    
    if (posts.length === 0) {
        blogList.innerHTML = '<p class="no-posts">No blog posts yet.</p>';
        return;
    }
    
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    blogList.innerHTML = posts.map(post => `
        <div class="blog-item">
            <h3>${post.title}</h3>
            <div class="date">${new Date(post.date).toLocaleDateString()}</div>
            <p class="preview">${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</p>
            <div class="blog-actions">
                <button class="edit-btn" onclick="editPost('${post.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deletePost('${post.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function savePost(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    
    if (editingPostId) {
        // Update existing post
        const postIndex = posts.findIndex(post => post.id === editingPostId);
        if (postIndex !== -1) {
            posts[postIndex] = {
                ...posts[postIndex],
                title,
                content,
                lastModified: new Date().toISOString()
            };
        }
    } else {
        posts.push({
            id: generateId(),
            title,
            content,
            date: new Date().toISOString(),
            lastModified: new Date().toISOString()
        });
    }
    
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    resetForm();
    displayBlogPosts();
}

function editPost(postId) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        editingPostId = postId;
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        document.getElementById('postId').value = postId;
        
        blogForm.querySelector('button[type="submit"]').textContent = 'Update Post';
        cancelEditBtn.style.display = 'block';
        
        blogForm.scrollIntoView({ behavior: 'smooth' });
    }
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const updatedPosts = posts.filter(post => post.id !== postId);
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
        displayBlogPosts();
        
        if (editingPostId === postId) {
            resetForm();
        }
    }
}

function resetForm() {
    editingPostId = null;
    blogForm.reset();
    document.getElementById('postId').value = '';
    blogForm.querySelector('button[type="submit"]').textContent = 'Save Post';
    cancelEditBtn.style.display = 'none';
}

blogForm.addEventListener('submit', savePost);
cancelEditBtn.addEventListener('click', resetForm);

displayBlogPosts();
cancelEditBtn.style.display = 'none'; 