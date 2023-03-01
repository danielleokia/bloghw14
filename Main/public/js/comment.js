

async function submitComment(event) {
event.preventDefault();
    
    const comment = document.querySelector('textinput[name="comment-text"]').getAttribute('value').trim();
    const blog_id = window.location.toString().split('/').pop();

if (comment) {
   const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
         blog_id,
         comment
       }),
      headers: { 'Content-Type': 'application/json'
    }
});

if (response.ok) {
  document.location.reload();
} else {
  alert(response.statusText);
}
}
}



document.querySelector('.comment-form').addEventListener('submit', submitComment);