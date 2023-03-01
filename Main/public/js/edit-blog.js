async function editBlog(event) {
    event.preventDefault();

        const blog_id = window.location.toString().split('/').pop();
        const blog_title = document.querySelector('textarea[name="blog-title"]').value;
        const blog_text = document.querySelector('textarea[name="blog-text"]').value;
        
       const response = await fetch(`/api/blogs/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
             blog_id,
             blog_title,
             blog_text,
            
           }),
          headers: { 'Content-Type': 'application/json'
          }
    });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
    }
    
    
    
    
    document.querySelector('.edit-blog-form').addEventListener('edit', editBlog)