
document.getElementById('contactForm').addEventListener( 'submit', function (e) {
    e.preventDefault(); //prevent default formsubmision behaviour 

    //get the form element 
    const form = this;

    // select the submit button and add a loading state 
    const submitBtn  = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending....`;
    submitBtn.disabled =true;

    //collect form data 
    const formData  = new FormData(form);

    //send the form data to Formspree 

    fetch('https://formspree.io/f/xrbbzegd', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept' : 'application/json'
        }
    })

        .then(response => {
            if (response.ok) {
                //if the submison is successfull
                alert('Message sent succesfully');
                form.reset() //reset the form fields 
            } else {
                // if the submission fails 
                alert('Oops! Something went wrong. PLease try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occured. Please check your internet connection and try again.')
        })
        .finally(() => {
            //reset the submit button state 
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
        
});