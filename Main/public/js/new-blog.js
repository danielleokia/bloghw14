

async function submitBlog(event) {
event.preventDefault();
    
    const blog_title = document.querySelector('textarea[name="blog-title"]').value;
    const blog_text = document.querySelector('textarea[name="blog-text"]').value;


   const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({
         blog_title,
         blog_text
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




document.querySelector('.new-blog-form').addEventListener('submit', submitBlog)