// ==========================================
// VARIABLES
// ==========================================

let selectedDate = "";
let selectedTime = "";
let selectedFood = "";

let noAttempts = 0;


// ==========================================
// ELEMENTS
// ==========================================

const noButton = document.getElementById("noButton");
const buttonsArea = document.querySelector(".buttons-area");


// ==========================================
// SCREEN FUNCTION
// ==========================================

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });

    document
        .getElementById(id)
        .classList.add("active");
}


// ==========================================
// NO BUTTON - ESCAPE SYSTEM
// ==========================================

let lastMoveTime = 0;

const ESCAPE_DISTANCE = 120;
const MOVE_COOLDOWN = 180;


// ==========================================
// MOVE NO BUTTON
// ==========================================

function moveNoButton(mouseX, mouseY) {

    const now = Date.now();

    if (now - lastMoveTime < MOVE_COOLDOWN) {
        return;
    }

    lastMoveTime = now;

    noAttempts++;

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const padding = 20;

    /*
        Get the complete browser window size.
    */

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;


    /*
        Calculate the maximum position
        anywhere on the screen.
    */

    const maxX =
        screenWidth -
        buttonWidth -
        padding;

    const maxY =
        screenHeight -
        buttonHeight -
        padding;


    let newX;
    let newY;

    let safePosition = false;


    /*
        Try up to 100 random positions.

        We want the new position to be
        far away from the cursor.
    */

    for (let i = 0; i < 100; i++) {

        newX =
            padding +
            Math.random() * maxX;

        newY =
            padding +
            Math.random() * maxY;


        const buttonCenterX =
            newX +
            buttonWidth / 2;


        const buttonCenterY =
            newY +
            buttonHeight / 2;


        const distance =
            Math.sqrt(

                Math.pow(
                    buttonCenterX - mouseX,
                    2
                )

                +

                Math.pow(
                    buttonCenterY - mouseY,
                    2
                )

            );


        /*
            Make sure the button is far
            enough from the cursor.
        */

        if (distance > 220) {

            safePosition = true;

            break;
        }
    }


    /*
        If we couldn't find a safe
        position, choose a random one.
    */

    if (!safePosition) {

        newX =
            Math.random() * maxX;

        newY =
            Math.random() * maxY;
    }


    /*
        Move the button anywhere
        on the screen.
    */

    noButton.style.left =
        `${newX}px`;

    noButton.style.top =
        `${newY}px`;

    noButton.style.transform =
        "none";


    /*
        Change the text after
        several attempts.
    */

    if (noAttempts === 3) {

        noButton.innerText =
            "Nope 😭";
    }

    if (noAttempts === 5) {

        noButton.innerText =
            "Nice try 😂";
    }

    if (noAttempts === 8) {

        noButton.innerText =
            "Catch me 😭";
    }

    if (noAttempts >= 12) {

        noButton.innerText =
            "PLEASE 😂";
    }
}


// ==========================================
// CURSOR PROXIMITY DETECTION
// ==========================================

document.addEventListener(
    "mousemove",
    function(event) {

        const questionScreen =
            document.getElementById(
                "questionScreen"
            );

        if (
            !questionScreen.classList.contains(
                "active"
            )
        ) {
            return;
        }

        const buttonRect =
            noButton.getBoundingClientRect();


        const buttonCenterX =
            buttonRect.left +
            buttonRect.width / 2;


        const buttonCenterY =
            buttonRect.top +
            buttonRect.height / 2;


        const distance =
            Math.sqrt(

                Math.pow(
                    event.clientX -
                    buttonCenterX,
                    2
                )

                +

                Math.pow(
                    event.clientY -
                    buttonCenterY,
                    2
                )

            );


        if (
            distance < ESCAPE_DISTANCE
        ) {

            moveNoButton(
                event.clientX,
                event.clientY
            );

        }

    }
);


// ==========================================
// MOBILE TOUCH
// ==========================================

document.addEventListener(
    "touchstart",
    function(event) {

        const touch =
            event.touches[0];


        const buttonRect =
            noButton.getBoundingClientRect();


        const buttonCenterX =
            buttonRect.left +
            buttonRect.width / 2;


        const buttonCenterY =
            buttonRect.top +
            buttonRect.height / 2;


        const distance =
            Math.sqrt(

                Math.pow(
                    touch.clientX -
                    buttonCenterX,
                    2
                )

                +

                Math.pow(
                    touch.clientY -
                    buttonCenterY,
                    2
                )

            );


        if (
            distance <
            ESCAPE_DISTANCE + 30
        ) {

            moveNoButton(
                touch.clientX,
                touch.clientY
            );

        }

    },
    {
        passive: true
    }
);


// ==========================================
// EXTRA PROTECTION
// ==========================================

noButton.addEventListener(
    "mouseenter",
    function() {

        moveNoButton(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

    }
);


noButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        moveNoButton(
            event.clientX,
            event.clientY
        );

    }
);


// ==========================================
// YES BUTTON
// ==========================================

document
    .getElementById("yesButton")
    .addEventListener(
        "click",
        function() {

            showScreen(
                "reactionScreen"
            );

        }
    );


// ==========================================
// PLANNING BUTTON
// ==========================================

document
    .getElementById("planningButton")
    .addEventListener(
        "click",
        function() {

            showScreen(
                "dateScreen"
            );

        }
    );


// ==========================================
// DATE CONTINUE
// ==========================================

document
    .getElementById("dateContinue")
    .addEventListener(
        "click",
        function() {

            const date =
                document
                    .getElementById("dateInput")
                    .value;


            const time =
                document
                    .getElementById("timeInput")
                    .value;


            if (!date) {

                alert(
                    "Pick a date first 💗"
                );

                return;
            }


            if (!time) {

                alert(
                    "Pick a time first 💗"
                );

                return;
            }


            selectedDate = date;
            selectedTime = time;


            showScreen(
                "foodScreen"
            );

        }
    );


// ==========================================
// FOOD SELECTION
// ==========================================

document
    .querySelectorAll(".food")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(".food")
                    .forEach(item => {

                        item.classList.remove(
                            "selected"
                        );

                    });


                this.classList.add(
                    "selected"
                );


                selectedFood =
                    this.dataset.food;

            }
        );

    });


// ==========================================
// FINISH
// ==========================================

document
    .getElementById("finishButton")
    .addEventListener(
        "click",
        async function() {

            if (!selectedFood) {

                alert(
                    "Choose something to eat first 🍕"
                );

                return;
            }


            // Format date

            const dateObject =
                new Date(
                    selectedDate +
                    "T00:00:00"
                );


            const formattedDate =
                dateObject.toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


            // Format time

            const timeObject =
                new Date(
                    `1970-01-01T${selectedTime}`
                );


            const formattedTime =
                timeObject.toLocaleTimeString(
                    "en-IN",
                    {
                        hour: "numeric",
                        minute: "2-digit"
                    }
                );


            // Final screen

            document
                .getElementById("finalDate")
                .innerText =
                formattedDate;


            document
                .getElementById("finalTime")
                .innerText =
                formattedTime;


            document
                .getElementById("finalFood")
                .innerText =
                selectedFood;


            // Send Telegram notification

            try {

                const response =
                    await fetch(
                        "/api/yes",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    date:
                                        formattedDate,

                                    time:
                                        formattedTime,

                                    food:
                                        selectedFood

                                })

                        }
                    );


                const result =
                    await response.json();


                if (!result.success) {

                    console.error(
                        "Telegram notification failed."
                    );

                }

            }
            catch (error) {

                console.error(
                    "Notification error:",
                    error
                );

            }


            showScreen(
                "finalScreen"
            );

        }
    );