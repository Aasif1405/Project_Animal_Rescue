

    // Add event listener for form submission
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
    
        // Get form values when the form is submitted and the values added in the form
        const fullName = document.getElementById('fullName').value;
        const contactNumber = document.getElementById('contactNumber').value;
        const emailAddress = document.getElementById('emailAddress').value;
        const message = document.getElementById('message').value;


        console.log('Full Name:', fullName);
        console.log('Contact Number:', contactNumber);
        console.log('Email Address:', emailAddress);
        console.log('Message:', message);
    

        });
        