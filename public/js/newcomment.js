const newFormHandler = async (event) => {
  event.preventDefault();

  // const name = document.querySelector('#project-name').value.trim();
  const commentContent = document.querySelector('#new-comment-input').value.trim();
  const postID = document.querySelector('#post-id').textContent;
  // const description = document.querySelector('#project-desc').value.trim();

  if (commentContent) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ commentContent, postID }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create comment');
    }
  }
};

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/projects/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete project');
//     }
//   }
// };

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
