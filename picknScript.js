async function fetchAndDisplayReviews() {
    const reviewsContainer = document.getElementById('reviews-container');

    try {
        const response = await fetch('http://localhost:3000/parks/pickn/reviews');
        const data = await response.json();

        if (data.length === 0) {
            reviewsContainer.innerHTML = '<p>No reviews available.</p>';
        } else {
            reviewsContainer.innerHTML = ''; 
            data.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.innerHTML = `
                    <h3>${review.userName}</h3>
                    <p>Rating: ${review.rating}</p>
                    <p>${review.Description}</p>
                    <p>Visited: ${review.timeOfVisit}</p>
                    <p>Keywords: ${review.keyWords}</p>
                    <hr>
                `;
                reviewsContainer.appendChild(reviewElement);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        reviewsContainer.innerHTML = '<p>Error fetching reviews.</p>';
    }
}


async function updateReview(userName, rating, description, timeOfVisit, keyWords) {
    try {
      
        await fetch(`http://localhost:3000/parks/pickn/reviews/${userName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName,
                rating,
                Description: description,
                timeOfVisit,
                keyWords,
            }),
        });

        
        fetchAndDisplayReviews();
    } catch (error) {
        console.error('Error updating review:', error.message);
    }
}


async function deleteReview(userName) {
    try {
        
        const response = await fetch(`http://localhost:3000/parks/pickn/reviews/${userName}`);
        const reviewToDelete = await response.json();

        if (!reviewToDelete) {
            
            alert(`No review exists for user: ${userName}`);
        } else {
            
            await fetch(`http://localhost:3000/parks/pickn/reviews/${userName}`, {
                method: 'DELETE',
            });

            
            fetchAndDisplayReviews();
        }
    } catch (error) {
        console.error('Error deleting review:', error.message);
    }
}


window.onload = function () {
    fetchAndDisplayReviews();

    
    document.getElementById('review-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const userName = document.getElementById('userName').value;
        const rating = document.getElementById('rating').value;
        const description = document.getElementById('description').value;
        const timeOfVisit = document.getElementById('timeOfVisit').value;
        const keyWords = document.getElementById('keyWords').value;

        try {
            
            await fetch('http://localhost:3000/parks/pickn/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    rating,
                    Description: description,
                    timeOfVisit,
                    keyWords,
                }),
            });

            
            fetchAndDisplayReviews();
        } catch (error) {
            console.error('Error submitting review:', error.message);
        }
    });

   
    document.getElementById('update-review-button').addEventListener('click', async function () {
       
        const updateUserNameInput = prompt('Enter User Name to Update Review:');

        if (updateUserNameInput) {
            try {
                
                const response = await fetch(`http://localhost:3000/parks/pickn/reviews/${updateUserNameInput}`);
                const review = await response.json();

                if (review) {
                    
                    document.getElementById('updateUserNameInput').value = updateUserNameInput;

                    
                    const updateReviewForm = document.getElementById('update-review-container');
                    updateReviewForm.style.display = 'block';

                    
                    document.getElementById('updated-review-form').style.display = 'none';

                    
                    document.getElementById('updateRating').value = '';
                    document.getElementById('updateDescription').value = '';
                    document.getElementById('updateTimeOfVisit').value = '';
                    document.getElementById('updateKeyWords').value = '';
                } else {
                    
                    alert(`No review exists for user: ${updateUserNameInput}`);
                }
            } catch (error) {
                console.error('Error checking for review existence:', error.message);
                alert('Error checking for review existence.');
            }
        }
    });

   
    document.getElementById('delete-review-button').addEventListener('click', async function () {
        
        const deleteUserNameInput = prompt('Enter User Name to Delete Review:');

        if (deleteUserNameInput) {
            try {
                
                const response = await fetch(`http://localhost:3000/parks/pickn/reviews/${deleteUserNameInput}`);
                const review = await response.json();

                if (review) {
                    
                    await fetch(`http://localhost:3000/parks/pickn/reviews/${deleteUserNameInput}`, {
                        method: 'DELETE',
                    });

                    
                    fetchAndDisplayReviews();
                } else {
                    
                    alert(`No review exists for user: ${deleteUserNameInput}`);
                }
            } catch (error) {
                console.error('Error checking for review existence or deleting review:', error.message);
                alert('Error checking for review existence or deleting review.');
            }
        }
    });

    
    document.getElementById('updateUserNameButton').addEventListener('click', function () {
        
        document.getElementById('updated-review-form').style.display = 'block';
    });

    
    document.getElementById('submit-updated-review-button').addEventListener('click', async function () {
        const updateUserName = document.getElementById('updateUserNameInput').value;
        const updateRating = document.getElementById('updateRating').value;
        const updateDescription = document.getElementById('updateDescription').value;
        const updateTimeOfVisit = document.getElementById('updateTimeOfVisit').value;
        const updateKeyWords = document.getElementById('updateKeyWords').value;

        
        updateReview(updateUserName, updateRating, updateDescription, updateTimeOfVisit, updateKeyWords);

        
        document.getElementById('update-review-container').style.display = 'none';
    });
};