# Project phase 1 - Definition and planning


Welcome to the NumBase

Easily manage and explore number systems using this comprehensive toolkit.

Convert values between binary, decimal, hexadecimal, and octal formats, perform arithmetic operations, and access a history of your recent activity — all in one place.


## 1. User Personas


Persona 1: Mike Shinoda – University Student (Computer Science Major)

Age: 24

Background: 2nd-year undergraduate student studying computer science. Currently learning digital logic and computer architecture.

Technical Skills: Intermediate – familiar with programming basics, understands number systems but often needs help converting manually.

Goals:
•	Quickly convert between binary, decimal, octal, and hexadecimal during assignments or lab work.
•	Verify manual calculations from homework or exams.
•	Perform arithmetic operations in number systems without switching tools or calculators.

Frustrations:
•	Switching between multiple tools for conversion and calculation.
•	Manually tracking previous conversions or calculations.

Needs:
•	A fast, intuitive tool for converting and calculating in different number systems.
•	A history panel to check recent conversions and calculations.
•	Live updates so he can see results instantly while typing.



Persona 2: Priya Joshi – Software Developer (Embedded Systems Engineer)

Age: 32

Background: Works in an embedded systems company where low-level programming and bitwise operations are frequent.

Technical Skills: Advanced – writes code in C/C++ for microcontrollers, works daily with binary and hex formats.

Goals:
•	Seamlessly convert between number systems for debugging and memory mapping.
•	Perform quick hex and binary arithmetic while coding or troubleshooting.
•	Save and reuse recent conversions for future reference.

Frustrations:
•	Most online tools are overloaded with ads.
•	Lack of features like live conversion and clipboard copy.
•	Difficult to navigate UI.

Needs:
•	A distraction-free, efficient tool that supports copy-to-clipboard.
•	Instant feedback while editing hex or binary values.
•	A lightweight utility she can keep open while working.




## 2. Use Cases and User Flows


Use Case 1: Convert a Number Between Two Number Systems

Users: Mike (student), Priya (developer)

Description: User selects input and output number systems (e.g., Binary to Decimal), enters a value, and sees the converted result.

User Flow:
•	Open the tool.
•	Select input number system (e.g., Binary).
•	Select output number system (e.g., Decimal).
•	Type the number in the input field.
•	View result in the output field.



Use Case 2: Perform Arithmetic Operations in a Selected Number System

Users: Mike, Priya

Description: User inputs two values and selects an arithmetic operation (+, −, ×, ÷) in a chosen number system.

User Flow:
•	Open the calculator tab/section.
•	Select the number system (e.g., Hexadecimal).
•	Enter the first number.
•	Select an operator (e.g., +).
•	Enter the second number.
•	View the result.



Use Case 3: Live Conversion While Typing

Actors: Mike

Description: While entering a number, conversion results update in real-time.

User Flow:
•	Select input/output systems.
•	Begin typing a number.
•	Output field updates instantly with conversion.
•	User corrects or modifies input as needed.



Use Case 4: Copy Converted Result to Clipboard

Actors: Priya

Description: User clicks a "copy" button next to the result to use it elsewhere (e.g., in code or notes).

User Flow:
•	Complete a conversion or calculation.
•	Click the “Copy” icon/button near the result.
•	System confirms the result is copied.
•	User pastes the result in desired location.




Use Case 5: View Recent Conversion/Calculation History

Actors: Mike

Description: User checks the history section to reuse or verify past conversions.

User Flow:
•	Scroll or navigate to the history panel.
•	View a list of recent conversions or calculations (with input/output details).
•	Optionally, clear the history.





## 3. UI Prototypes


Link to Figma Prototype: https://www.figma.com/design/RMwAqmuQ3leEg2NUr7qH9h/Untitled?node-id=0-1&t=AvCJdznBrRIZzZTJ-1

Page 1: Home Screen – Welcome Page

Top Section:
•	Title: “Welcome to Digital Number Toolkit”
•	Subtext: “Choose a tool below to get started”

Middle Section:
Three primary buttons, centered:
•	Converter
•	Calculator
•	History

Navigation:
•	Buttons route to respective feature pages.
•	Simple and minimal layout for easy access.




Page 2: Converter Page – Number System Converter

Top Section:
•	Title: “Converter”
•	Home button (top-left) to return to the Home screen.

Middle Section:
•	Input Field: "Enter number here"
•	Dropdown menu with "From" and "To" (Binary, Decimal, Hex, Octal).

Bottom Section:
•	Output Field: Displays result while user types
•	Copy button: 📋 (next to result)




Page 3: Calculator Page – Arithmetic Operations

Top Section:

•	Title: “Calculator”
•	Home button (top-left) to return to the Home screen.

Middle Section:
•	Two Input Fields: Number 1, Number 2
•	Dropdowns:
•	Number System: Binary, Decimal, Hex, Octal
•	Operation: +, –, ×, ÷

Bottom Section:
•	Result Box: Displays calculated result as user types
•	📋 Copy button




Page 4: History Page 

Top Section:
•	Title: “History”
•	Home button (On top-left) and Clear button (On top-right)

Middle Section:
•	Scrollable List showing last 10 entries
•	Each item includes:
•	Input value
•	Output value
•	From → To system (or operation)
•	Timestamp (e.g., 07-Apr-2025 14:52)
•	Records are auto updated after each operation.




## 4. Information Architecture and Technical Design


🧱 Information Architecture (IA)

The app page will consist the following key sections/pages:

Home
•	Welcome Message
•	Three buttons Converter, Calculator and History
•	Copy to Clipboard Function.

Home
•	Number System Converter Bin,Dec,Oct,Hex
•	Live Conversion Display
•	Copy to Clipboard Function.

Calculator
•	Arithmetic Operations in any number system
•	Real-time result display
•	Copy result to clipboard

History
•	List of recent conversions and calculations
•	Option to clear history
•	Max 10 history items.




Technical Design

Frontend:
•	HTML, CSS, JavaScript
•	Figma for UI design
•	Tailwind CSS (optional for quick, responsive styling).

Backend:
•	Node.js + Express server run on a VM 

Development Environment:
•	Run on local VM (VirtualBox) 
•	Server + DB run locally.

Database:
•	SQLite for handling history table (stores operation type, input, output, number system, and timestamp)
•	Limit to last 10 items
•	Auto-update and render to the History section.

Clipboard API:
•	Use built-in JavaScript Clipboard API for “Copy to Clipboard” functionality.

Live Conversion:
•	Use JavaScript Event Listeners to update output as user types.

Number System Logic:
•	Use built-in JavaScript functions like parseInt(number, base), .toString(base)
•	Custom functions to handle different base arithmetic operations.

Error Handling & Validation
•	Validate inputs based on selected number system (e.g., binary only allows 0 and 1)
•	Display user-friendly messages for invalid input.





## 5. Project Management and User Testing


🗓️ Project Timeline & Milestones

|Week	  | Task
|---------|--------------------------------------------------------|
|Week 11  |Finalize UI prototype + Choose environment and tools|
|Week 12	|Implement Home page and Calculator module           |
|Week 13	|Implement Converter and History module              |
|Week 14	|Polish UI + Test features + Bug fixes               |



Agile-Inspired Development Approach
•	Iterations: Weekly sprints with specific goals
•	Version Control: Git + GitHub for tracking progress.

Testing Approach:
•	Manual UI testing during development
•	Unit testing of core conversion/calculation functions
•	Functional testing for form inputs and buttons
•	End-to-end testing (With tools like Playwright or Cypress).



User Testing Plan

Testing Group:
•	1 university student
•	1 computer science professional


Testing Tools:
•	Observation during use
•	Google Form or Notion page for collecting feedback
•	Screen recording for UI/UX review.


Usability Metrics:
•	Were they able to complete a task without help?
•	Was the interface clear and responsive?
•	Any UI confusion or bugs detected?


Success Criteria
•	All core features functional: Conversion, Calculator, Live output, Copy, History
•	Error messages visible for invalid input
•	Clean, responsive UI 
•	History working across reloads
•	All feedback from testers considered and applied.


