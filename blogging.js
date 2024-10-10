document.getElementById('blog-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const blogTitle = document.getElementById('blog-title').value;
    const blogContent = document.getElementById('blog-content').value;
    
    addBlog(blogTitle, blogContent);
    updateBlogList();
});

const blogs = [];

function addBlog(title, content) {
    blogs.push({ title, content });
}

function updateBlogList() {
    const blogList = document.getElementById('blogs');
    blogList.innerHTML = '';
    blogs.forEach(blog => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<h4>${blog.title}</h4><p>${blog.content}</p>`;
        blogList.appendChild(listItem);
    });
}
