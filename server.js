const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;


// ===============================
// SECURITY CHECK
// ===============================

if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Missing Telegram configuration.");
    console.error("Check your .env file.");

    process.exit(1);
}


// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(express.static(
    path.join(__dirname, "public")
));


// ===============================
// TELEGRAM MESSAGE
// ===============================

app.post("/api/yes", async (req, res) => {

    try {

        const {
            date,
            time,
            food
        } = req.body;


        // Basic validation

        if (!date || !time || !food) {

            return res.status(400).json({
                success: false,
                message: "Missing information."
            });

        }


        // ===============================
        // CREATE TELEGRAM MESSAGE
        // ===============================

        const message = `
❤️ SHE SAID YES! ❤️

Someone just accepted the date!

📅 Date:
${date}

🕐 Time:
${time}

🍴 Food:
${food}

Looks like you have a date 😭❤️
`;


        // ===============================
        // TELEGRAM API
        // ===============================

        const telegramURL =
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;


        const telegramResponse =
            await fetch(telegramURL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    chat_id: CHAT_ID,

                    text: message

                })

            });


        const telegramData =
            await telegramResponse.json();


        // ===============================
        // CHECK TELEGRAM RESPONSE
        // ===============================

        if (!telegramData.ok) {

            console.error(
                "Telegram error:",
                telegramData
            );

            return res.status(500).json({

                success: false,

                message:
                    "Telegram notification failed."

            });

        }


        // ===============================
        // SUCCESS
        // ===============================

        console.log(
            "YES notification sent successfully."
        );


        res.json({

            success: true

        });

    }

    catch (error) {

        console.error(
            "Server error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Something went wrong."

        });

    }

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `Server running on port ${PORT}`
    );
});