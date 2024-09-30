import React, {useEffect, useState} from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const FormWrapper = styled.div`
    background-color: #002244;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    margin: 0 auto;
    color: #fff;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const StyledLabel = styled.label`
    margin-bottom: 10px;
    font-size: 18px;
`;

const StyledInput = styled(DatePicker)`
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 16px;
    width: 100%;
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #1E90FF;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    
    &:hover {
        background-color: #0B3D91;
    }
`;

function TimeRangeForm() {
    useEffect(() => {
        document.title = "Расчёт времени";
    }, [])

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [timePeriodResponse, setTimePeriodResponse] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

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
        <FormWrapper>
            <StyledForm onSubmit={handleSubmit}>
                <div>
                    <StyledLabel>От: </StyledLabel>
                    <StyledInput
                        selected={from}
                        onChange={(date) => setFrom(date)}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>
                <div>
                    <StyledLabel>До: </StyledLabel>
                    <StyledInput
                        selected={to}
                        onChange={(date) => setTo(date)}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>
                <SubmitButton type="submit">Принять</SubmitButton>
            </StyledForm>

            {timePeriodResponse && (
                <div>
                    <h2>Результат:</h2>
                    <p>Лет: {timePeriodResponse.years}</p>
                    <p>Месяцев: {timePeriodResponse.months}</p>
                    <p>Дней: {timePeriodResponse.days}</p>
                    <p>Часов: {timePeriodResponse.hours}</p>
                    <p>Минут: {timePeriodResponse.minutes}</p>
                </div>
            )}
        </FormWrapper>
    );
}

export default TimeRangeForm;
