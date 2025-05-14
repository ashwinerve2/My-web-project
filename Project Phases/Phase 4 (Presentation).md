# 📊 NumBase – Smart Number Conversion and Arithmetic Platform

## 📝 Project Overview

**NumBase** is a lightweight web application designed for students, developers, and enthusiasts working with different numerical bases (binary, decimal, hexadecimal, and octal). The application combines base conversion and arithmetic operations into a single, easy-to-use interface. 

The project was built as part of an advanced web development course, with a focus on clean user experience, minimalistic design, and seamless backend integration.

## 📌 Use Case Summary

Refer to full use cases in [Phase 1](https://github.com/ashwinerve2/My-web-project/blob/main/Project%20Phases/Phase%201%20(Defination%20and%20Planning).md).

| Use Case | Implemented (Yes/No) | Demonstration / Notes |
|----------|-----------------------|------------------------|
| Convert numbers between bases | Yes | User inputs a number and selects source/target bases. Real-time conversion shown. |
| Perform arithmetic operations in a selected base | Yes | Supports addition, subtraction, multiplication, and division in binary, octal, decimal, and hexadecimal. |
| View history of operations | Yes | A separate history page shows previously performed conversions and calculations. |
| Copy results to clipboard | Yes | Copy buttons implemented with visual feedback. |
| Error handling and input validation | Yes | Invalid inputs are caught and feedback is displayed in real time. |

## ✍️ Technical Implementation

The frontend is built with **HTML, CSS, and JavaScript**, using minimalist styling principles. 

The backend is built using **Node.js and Express.js**, with RESTful endpoints for:
- `/api/convert` — to handle base conversions.
- `/api/calculate` — to process arithmetic operations.
- `/api/history` — to store and retrieve the history of actions.

Data is handled in-memory for simplicity, and input is validated both client- and server-side.

## 🚂 Development Process

The project followed a structured development plan divided into four phases:
- **Phase 1**: Defined use cases, pages, and user personas.
- **Phase 2**: Implemented main functionality and structure.
- **Phase 3**: Focused on refining UI, improving user interaction, and enhancing error handling.
- **Phase 4**: Finalized project for presentation, cleaned code, and created documentation.

Throughout the development, we iterated frequently, tested UI and backend separately, and gradually integrated the components.

## ☀️ Reflection and Future Work

**What worked well:**
- Real-time conversion and calculations feel responsive and intuitive.
- The visual feedback for copy buttons adds to user satisfaction.
- The codebase is clean and easy to extend.

**Challenges:**
- Implementing responsive UI without flickering required debounce logic.
- Styling copy buttons in a visually effective way was trial-and-error.
- Managing validation rules for different bases consistently was tricky.

**Future improvements:**
- Add user authentication and persistent history storage.
- Include support for floating-point numbers in conversions.
- Provide a dark mode and accessibility improvements.

## 📊 Work Hours Log

| Date       | Time | Task |
|------------|------|------|
| 2025.04.01 | 2h   | Planning Phase 1 – Defined User Personas |
| 2025.04.02 | 5h   | Planning Phase 1 – Defined Use Cases and Architecture |
| 2025.04.15 | 3h   | Planning Phase 2 – Defined Environments |
| 2025.04.18 | 2h   | Planning Phase 2 – Defined Error Handling and UI Interaction |
| 2025.04.19 | 2h   | Planning Phase 2 – Defined Structure and Functionalities |
| 2025.04.21 | 1h   | Planning Phase 2 – Documentation |
| 2025.05.02 | 3h   | Planning Phase 3 – Implemented UI styling and conversion debounce |
| 2025.05.03 | 3h   | Planning Phase 3 – Added copy functionality and visual feedback |
| 2025.05.04 | 2h   | Planning Phase 3 – Input validation and error handling |
| 2025.05.05 | 2h   | Planning Phase 3 – Final styling and layout tweaks |
| 2025.05.14 | 2h   | Planning Phase 4 – Created final documentation and presentation |
| **Total**  | **27h** | |

