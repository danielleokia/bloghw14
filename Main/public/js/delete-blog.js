async function deleteBlog(event) {
    event.preventDefault();

        const id = window.location.toString().split('/').pop();
        const blog_title = document.querySelector('textarea[name="blog-title"]').value;
        const blog_text = document.querySelector('textarea[name="blog-text"]').value;
        
       const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
          body: JSON.stringify({
             blog_id: id,
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
    
    
    
    
    document.querySelector('.delete-blog-form').addEventListener('click', deleteBlog)