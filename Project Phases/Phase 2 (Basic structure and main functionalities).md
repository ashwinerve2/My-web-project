# Phase 2: Basic Structure and Main Functionalities

Welcome to Phase 2 of NumBase! We now shift from planning to execution by establishing the app’s environment, backend logic, database setup, and core functionalities.

## 1. Environment Setup

### Development Environment:
- Local Virtual Machine (VM) using VirtualBox
- Host system: MacOS
- OS on VM: Ubuntu Server (20.04+)
- All components (frontend, backend, and database) run locally for now

### Technology Stack:
- **Frontend**: HTML, CSS, JavaScript 
- **Backend**: Node.js with Express framework
- **Database**: SQLite
- **Version Control**: Git + GitHub

### Other Tools:
- **Figma**: For UI design reference
- **VS Code**: Code editor (IDE)
- **GitHub**: For managing phases

## 2. Backend

### Main Responsibilities:
- Handle conversion, calculations, and history operations directly from server-side logic.
- Validate incoming inputs and provide accurate output (no API calls).
- Serve frontend files.
- Connect to and manage the SQLite database.

### Core Functionalities:
- **Conversion**: Convert between number systems (binary, decimal, hexadecimal, octal).
- **Calculations**: Perform arithmetic operations (+, −, ×, ÷) in the chosen number system.
- **History**: Store and retrieve conversion and calculation history from the database.

### Server File Structure:
```
backend/
  |-- index.js            # Main server file handling all logic
  |-- db/                 # Database management
      |-- database.js     # DB connection and schema
      |-- schema.sql      # Database schema
  |-- utils/              # Helper functions for validation, conversion, and arithmetic
      |-- validation.js   # Input validation logic
      |-- converter.js   # Conversion logic
      |-- arithmetic.js   # Arithmetic operations logic
```


### Detailed Breakdown of Logic:

1. **index.js (Main server file)**:
   - Handles conversion, calculation, and history logic directly within the file.
   - Includes routes for serving static frontend files.
   - Handles all backend functionality (no API layer).

2. **database.js (Database Connection and Schema)**:
   - Manages the SQLite database connection.
   - Includes functions to query the database, insert records, and manage history.

3. **schema.sql (Database Schema)**:
   - Defines the schema for the SQLite database, specifically the history table to store conversion and calculation records.

4. **Utility Files (validation.js, converter.js, arithmetic.js)**:
   - **validation.js**: Validates inputs (e.g., ensures binary only allows 0/1, hexadecimal allows 0-9 and A-F).
   - **converter.js**: Handles number system conversions (binary ↔ decimal ↔ hexadecimal ↔ octal).
   - **arithmetic.js**: Performs arithmetic operations in the selected number system (addition, subtraction, multiplication, division).

## 3. Frontend

### Pages Based on Phase 1 UI Design:
- **Home Page** (with buttons: Converter, Calculator, History)
- **Converter Page**: Input a number, choose from/to systems, view output instantly.
- **Calculator Page**: Enter numbers, choose operation, view result.
- **History Page**: View recent conversion and calculation history.

### Frontend Functionalities:
- Responsive Layout (using Figma as reference).
- **Copy-to-clipboard**: Implemented using JavaScript's Clipboard API.
- **Live Conversion and Calculation Updates**: Real-time updates as the user types.
- **Dropdown Selectors**: Choose number system and arithmetic operation.
- **Real-time Input Validation**: For binary (only 0/1), hexadecimal (0-9, A-F), etc.

### Frontend File Structure:
frontend/
  |-- index.html          # Home page
  |-- converter.html      # Converter page
  |-- calculator.html     # Calculator page
  |-- history.html        # History page
  |-- css/                # Styles
      |-- styles.css      # Main styles
  |-- js/                 # JavaScript
      |-- converter.js    # Converter logic
      |-- calculator.js   # Calculator logic
      |-- history.js      # History logic
      |-- utils.js        # Utility functions (e.g., validation, clipboard)



## 4. Database

### SQLite DB Setup:
- Lightweight and embedded, ideal for local VM use.
- Stores the 10 most recent records for conversions and calculations.

### History Table Schema:

CREATE TABLE history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,               -- "conversion" or "calculation"
    input_value TEXT NOT NULL,
    output_value TEXT NOT NULL,
    from_system TEXT,
    to_system TEXT,
    operation TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

### Database Logic

- Insert new records each time a conversion or calculation is performed.
- Maintain only the last 10 records in the database, deleting the oldest ones when new records are added.

## 5. Basic Structure and Architecture

### App Architecture:
- Modular folder structure with a clear separation of concerns (frontend, backend, database).
- Backend directly handles logic without using API endpoints.
- SQLite database acts as the simple persistent layer for history management.

### Flow Overview:
- **User Input (Frontend)** → Frontend Validation & Live Preview
- **Backend Logic**: Conversion or Calculation Logic is applied → Update Database
- **Send Response to Frontend** → UI Updates Output Field + History List

## 6. Core Functionalities

### 1. Converter:
- Select the input and output number systems.
- Enter a number to convert.
- Instant output appears in the designated field.
- Copy-to-clipboard functionality for the result.

### 2. Calculator:
- Choose the number system (binary, decimal, hexadecimal, octal).
- Enter two numbers for calculation.
- Select an operation: addition, subtraction, multiplication, division.
- Instant result display with a copy option.

### 3. Live Update:
- All conversions and calculations update live as the user types.

### 4. History:
- The 10 most recent actions are stored and displayed.
- Each history record includes input, output, operation type, number systems, and timestamp.
- Clear button resets history.

### 5. Validation:
- Binary system accepts only 0/1.
- Hexadecimal system accepts 0-9 and A-F.
- Friendly error messages when invalid inputs are detected.

### 6. Copy to Clipboard:
- Implemented using JavaScript's Clipboard API.
- Visual confirmation (tooltip) when the result is copied.

## 7. Code Quality and Documentation

### Code Practices:
- Modular JavaScript code (organized into utility files for validation, conversion, arithmetic).
- Comments for each function to ensure clarity.
- Consistent folder and file naming conventions.

### Documentation:
- **README**: Includes setup instructions, dependencies, and how to run the app locally.
- Inline comments for complex functions and logic.
- **Schema.sql**: Database schema for quick reference.
- **GitHub**: Issues and pull requests to track progress and bugs.

## 8. Testing and Error Handling

### Testing Approaches:
- Manual testing of all user flows (conversion, calculation, history).
- Unit testing of core JavaScript functions (e.g., conversion, arithmetic).
- Functional tests for form inputs and button interactions.
- End-to-end (E2E) testing using Playwright or Cypress.

### Error Handling:
- Invalid inputs show user-friendly error messages.
- Proper server-side error handling with try-catch blocks.
- History management ensures smooth data handling (e.g., handling database errors).

## 9. User Interface and Interaction

### [Figma Prototype Link](https://www.figma.com/design/RMwAqmuQ3leEg2NUr7qH9h/Untitled?node-id=0-1&p=f&t=Sr4byQK1pxvqfPH7-0)


### UI Traits:
- Minimalist layout for easy navigation.
- Clear labeling for each section (Converter, Calculator, History).
- Instant feedback for every interaction.

### Interactions:
- Button clicks and dropdown selections route via JavaScript functions.
- History list updates dynamically.
- Copy-to-clipboard.




