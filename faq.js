// faq.js - For expandable FAQ sections
document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ question headings
    const faqQuestions = document.querySelectorAll('.faq-item h3');
    
    // Add click event listener to each question
    faqQuestions.forEach(question => {
        // Initially hide all answers
        const answer = question.nextElementSibling;
        answer.style.maxHeight = '0px';
        
        question.addEventListener('click', function() {
            // Toggle active class on the question
            this.classList.toggle('active');
            
            // Get the answer element (next sibling after the heading)
            const answer = this.nextElementSibling;
            
            // Toggle active class on the answer
            answer.classList.toggle('active');
            
            // Toggle visibility of the answer
            if (answer.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
        });
    });
});