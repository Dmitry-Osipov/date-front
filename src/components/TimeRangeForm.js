import React, { useState } from "react";

function TimeRangeForm() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [timePeriodResponse, setTimePeriodResponse] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Преобразование значений дат в формат ISO
        const timeRangeRequest = {
            from: new Date(from),
            to: new Date(to),
        };

        try {
            const response = await fetch("/api/time", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(timeRangeRequest),
            });

            if (response.ok) {
                const data = await response.json();
                setTimePeriodResponse(data);
            } else {
                console.error("Ошибка при отправке данных:", response.status);
            }
        } catch (error) {
            console.error("Произошла ошибка:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        From:
                        <input
                            type="datetime-local"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        To:
                        <input
                            type="datetime-local"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>

            {timePeriodResponse && (
                <div>
                    <h2>Результат:</h2>
                    <p>Years: {timePeriodResponse.years}</p>
                    <p>Months: {timePeriodResponse.months}</p>
                    <p>Days: {timePeriodResponse.days}</p>
                    <p>Hours: {timePeriodResponse.hours}</p>
                    <p>Minutes: {timePeriodResponse.minutes}</p>
                </div>
            )}
        </div>
    );
}

export default TimeRangeForm;
