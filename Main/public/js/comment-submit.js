const commentSubmitInput = document.querySelector("#comment-submit");
const submitBtn = document.querySelector("#comment-submit");


function submitComment(event) {
    const inputVal = commentSubmitInput.value
    fetch("/api/newcomment", {
        method: 'POST',
      body: JSON.stringify({ inputVal }),
      headers: { 'Content-Type': 'application/json' },
    })
}