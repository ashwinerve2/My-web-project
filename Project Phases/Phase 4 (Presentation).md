# 📊 NumBase – Smart Base Conversion and Arithmetic Tool

## 📝 Project Overview

**NumBase** is a modern web application tailored for developers, students, and tech enthusiasts who work with different number systems such as binary, octal, decimal, and hexadecimal. The application merges two essential tools—base conversion and base-specific arithmetic—into a single, clean interface. 

Designed with a dark-themed minimalist UI, NumBase focuses on real-time usability, seamless input validation, and efficient backend integration.

## 📌 Use Case Summary

Refer to full use cases in [Phase 1](https://github.com/ashwinerve2/My-web-project/blob/main/Project%20Phases/Phase%201%20(Defination%20and%20Planning).md).

| Use Case | Implemented (Yes/No) | Demonstration / Notes |
|----------|-----------------------|------------------------|
| Convert numbers between bases | Yes | Real-time converter supporting binary, octal, decimal, and hexadecimal. |
| Perform arithmetic operations in a selected base | Yes | Supports basic operations: +, –, ×, ÷. |
| View history of operations | Yes | Includes a dedicated page displaying calculation and conversion logs. |
| Copy results to clipboard | Yes | Each result can be copied with a visual click effect. |
| Error handling and input validation | Yes | Invalid or unsupported inputs are gracefully handled. |

## ✍️ Technical Implementation

NumBase was developed using a **Node.js + Express.js** backend with a **vanilla JavaScript frontend**. The architecture follows a simple but efficient separation of concerns:

- **Frontend:** Uses HTML, CSS (custom dark theme), and JavaScript. All user inputs are validated on the client side before requests are made. Dynamic DOM updates and copy-to-clipboard functionality provide a good UX. The layout is responsive and intentionally minimalist for clarity.
  
- **Backend:** Built with Express.js, the server exposes three main endpoints:
  - `POST /api/convert` – accepts a number, source base, and target base, returns the converted result.
  - `POST /api/calculate` – performs arithmetic operations on two inputs in the selected base.
  - `GET /api/history` – retrieves stored records of conversions and calculations.

- **State Management:** The app uses in-memory storage for history tracking during the session. Input sanitization and base-specific validation ensure accurate and secure operations.

Every result includes a "copy" button with an animated click effect. Errors like invalid inputs or server failures are shown clearly up front.

## 🚂 Development Process

The development of NumBase followed a four-phase plan:

- **Phase 1:** Project planning included defining user personas, core use cases, and site architecture.
- **Phase 2:** Core structure was implemented—conversion logic, arithmetic functionality, and basic UI layout.
- **Phase 3:** Focused on refinement—visual enhancements, responsive layout, error handling, and clipboard UX.
- **Phase 4:** Final polishing, content organization, and documentation were completed.

Throughout the project, attention was paid to usability, visual clarity, and functional reliability.

## ☀️ Reflection and Future Work

**What worked well:**
- Combining conversion and arithmetic tools in one intuitive interface.
- The dark mode theme enhances focus and looks modern.
- Clear input validation and error messages make the app foolproof.

**Challenges faced:**
- Handling edge cases in different bases (especially hexadecimal arithmetic).
- Ensuring the UI remains responsive and visually stable during real-time input.
- Implementing clear visual feedback for user interactions (e.g., copy buttons).

**Future improvements:**
- Support for more number systems like base-3, base-5, and Roman numerals.
- Adding more arithmetic functions like modulo, power, and bitwise operations.
- Allowing export or persistent storage of user history.

## 📊 Work Hours Log


# Project logbook

| Date  | Used hours | Subject(s) |  Outcome |
| :---  |     :---:      |     :---:      |     :---:      |
| 2025.04.01 | 2 | Phase 1  | Defined User Personas  |
| 2025.04.02 | 2 |  Phase 1  | Defined Use Cases  |
| 2025.04.04 | 3 |  Phase 1  | Defined Pages and Architecture  |
| 2025.04.15 | 2 | Phase 2  | Defined Environments (Backend, Frontend, Testing)   |
| 2025.04.18 | 2 |  Phase 2  | Defined Error Handling and UI Interaction  |
| 2025.04.19 | 2 |  Phase 2  | Defined Structure and Functionalities  |
| 2025.04.27 | 6 |  Phase 2   | Frontend Implementation |
| 2025.04.29 | 6 |  Phase 2   | Backend Implementation |
| 2025.04.30 | 5 |  Phase 3   | API Improvement and Error handling |
| 2025.05.01 | 5 |  Phase 3   | UX Enhancements |
| 2025.05.02 | 5 |  Phase 3   | UI Layout Refinement |
| 2025.05.05 | 4 |  Phase 3   | Styling & Polish |
| 2025.05.05 | 3 |  Phase 3   | Code Cleanup & Review |
| 2025.05.07 | 3 |  Phase 3   | Testing|
| 2025.05.08 | 2 |  Phase 4   | Documentation and Presentation| 
| **Total**  | **52 hours** | |


