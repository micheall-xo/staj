// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});


document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});


const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (name.length < 2) {
            alert('Please enter a valid name');
            return;
        }
        
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        if (message.length < 10) {
            alert('Please enter a message with at least 10 characters');
            return;
        }
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}


const blogPosts = document.getElementById('blogPosts');

if (blogPosts) {
    function displayBlogPosts() {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        
        if (posts.length === 0) {
            blogPosts.innerHTML = '<p class="no-posts">No blog posts yet.</p>';
            return;
        }
        
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        blogPosts.innerHTML = posts.map(post => `
            <article class="blog-post">
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span class="date">${new Date(post.date).toLocaleDateString()}</span>
                </div>
                <p class="preview">${post.content.substring(0, 150)}${post.content.length > 150 ? '...' : ''}</p>
                <button class="read-more" onclick="showFullPost('${post.id}')">Read More</button>
            </article>
        `).join('');
    }
    
    function showFullPost(postId) {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>${post.title}</h2>
                    <div class="post-meta">
                        <span class="date">${new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div class="post-content">
                        ${post.content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
    }
    
    displayBlogPosts();
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 