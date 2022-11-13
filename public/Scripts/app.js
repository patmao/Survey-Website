/*
Filename: app.js
Student's name: Viet Nguyen Hoang
StudentID: 301228010
Date: 10/23/2022
*/

// IIFE -- Immediately Invoked Function Expression
(function () {

    function Start() {
        console.log("App Started...");

        let deleteButtons = document.querySelectorAll('.btn-danger')

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=> {
                if(!confirm("Are you sure you want to delete?"))
                {
                    event.preventDefault();
                    window.location.assign('/surveys');
                }
            })
        }
    }

    window.addEventListener("load", Start);

})();