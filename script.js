let expression = "";
let angleMode = "DEG";

let bracketShortcutActive = false;
let bracketShortcutTimer = null;


// ===============================
// ELEMENTS
// ===============================

const expressionDisplay =
    document.getElementById("expression");

const resultDisplay =
    document.getElementById("result");

const buttons =
    document.querySelectorAll(".buttons button");


// ===============================
// MOUSE BUTTONS
// ===============================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        handleButton(value);

    });

});


// ===============================
// MAIN BUTTON HANDLER
// ===============================

function handleButton(value) {


    // Numbers
    if (/^[0-9]$/.test(value)) {

        expression += value;

        updateDisplay();

        return;
    }


    // Decimal
    if (value === ".") {

        expression += ".";

        updateDisplay();

        return;
    }


    // Operators
    if (
        value === "+" ||
        value === "−" ||
        value === "×" ||
        value === "÷" ||
        value === "%"
    ) {

        expression += value;

        updateDisplay();

        return;
    }


    // Brackets
    if (value === "(" || value === ")") {

        expression += value;

        updateDisplay();

        return;
    }


    // Pi
    if (value === "π") {

        expression += "π";

        updateDisplay();

        return;
    }


    // Euler number
    if (value === "e") {

        expression += "e";

        updateDisplay();

        return;
    }


    // Power
    if (value === "xʸ") {

        expression += "^";

        updateDisplay();

        return;
    }


    // Square
    if (value === "x²") {

        expression += "^2";

        updateDisplay();

        return;
    }


    // Square root
    if (value === "√") {

        expression += "√(";

        updateDisplay();

        return;
    }


    // sin
    if (value === "sin") {

        expression += "sin(";

        updateDisplay();

        return;
    }


    // cos
    if (value === "cos") {

        expression += "cos(";

        updateDisplay();

        return;
    }


    // tan
    if (value === "tan") {

        expression += "tan(";

        updateDisplay();

        return;
    }


    // inverse sin
    if (value === "sin⁻¹") {

        expression += "asin(";

        updateDisplay();

        return;
    }


    // inverse cos
    if (value === "cos⁻¹") {

        expression += "acos(";

        updateDisplay();

        return;
    }


    // inverse tan
    if (value === "tan⁻¹") {

        expression += "atan(";

        updateDisplay();

        return;
    }


    // log
    if (value === "log") {

        expression += "log(";

        updateDisplay();

        return;
    }


    // ln
    if (value === "ln") {

        expression += "ln(";

        updateDisplay();

        return;
    }


    // Factorial
    if (value === "!") {

        expression += "!";

        updateDisplay();

        return;
    }


    // Clear
    if (value === "AC") {

        expression = "";

        expressionDisplay.textContent = "";

        resultDisplay.textContent = "0";

        return;
    }


    // Delete
    if (value === "DEL") {

        expression =
            expression.slice(0, -1);

        updateDisplay();

        return;
    }


    // Equals
    if (value === "=") {

        calculate();

        return;
    }

}


// ===============================
// UPDATE DISPLAY
// ===============================

function updateDisplay() {

    expressionDisplay.textContent =
        expression;

}


// ===============================
// CALCULATE
// ===============================

function calculate() {

    if (expression === "") {

        return;
    }


    try {

        let calculation =
            expression;


        // -------------------------
        // Constants
        // -------------------------

        calculation =
            calculation.replace(
                /π/g,
                "Math.PI"
            );


        calculation =
            calculation.replace(
                /\be\b/g,
                "Math.E"
            );


        // -------------------------
        // Operators
        // -------------------------

        calculation =
            calculation.replace(
                /×/g,
                "*"
            );


        calculation =
            calculation.replace(
                /÷/g,
                "/"
            );


        calculation =
            calculation.replace(
                /−/g,
                "-"
            );


        // -------------------------
        // Power
        // -------------------------

        calculation =
            calculation.replace(
                /\^/g,
                "**"
            );


        // -------------------------
        // Square root
        // -------------------------

        calculation =
            calculation.replace(
                /√\(/g,
                "Math.sqrt("
            );


        // -------------------------
        // Log
        // -------------------------

        calculation =
            calculation.replace(
                /log\(/g,
                "Math.log10("
            );


        calculation =
            calculation.replace(
                /ln\(/g,
                "Math.log("
            );


        // -------------------------
        // Factorial
        // -------------------------

        calculation =
            calculation.replace(
                /(\d+(?:\.\d+)?)!/g,
                "factorial($1)"
            );


        // -------------------------
        // Percentage
        // -------------------------

        calculation =
            calculation.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );


        // -------------------------
        // Evaluate
        // -------------------------

        const answer =
            eval(calculation);


        // Check result

        if (
            typeof answer !== "number" ||
            !Number.isFinite(answer)
        ) {

            resultDisplay.textContent =
                "Error";

            return;
        }


        resultDisplay.textContent =
            formatNumber(answer);


    } catch (error) {

        console.error(
            "Calculator error:",
            error
        );

        resultDisplay.textContent =
            "Error";
    }

}


// ===============================
// FORMAT NUMBER
// ===============================

function formatNumber(number) {

    if (Number.isInteger(number)) {

        return number.toString();

    }


    return Number(
        number.toPrecision(12)
    ).toString();

}


// ===============================
// FACTORIAL
// ===============================

function factorial(n) {

    if (
        n < 0 ||
        !Number.isInteger(n)
    ) {

        throw new Error(
            "Invalid factorial"
        );

    }


    let result = 1;


    for (
        let i = 2;
        i <= n;
        i++
    ) {

        result *= i;

    }


    return result;

}


// ===============================
// TRIG FUNCTIONS
// ===============================

function sin(x) {

    if (angleMode === "DEG") {

        x =
            x * Math.PI / 180;

    }

    return Math.sin(x);

}


function cos(x) {

    if (angleMode === "DEG") {

        x =
            x * Math.PI / 180;

    }

    return Math.cos(x);

}


function tan(x) {

    if (angleMode === "DEG") {

        x =
            x * Math.PI / 180;

    }

    return Math.tan(x);

}


// ===============================
// INVERSE TRIG
// ===============================

function asin(x) {

    let answer =
        Math.asin(x);


    if (angleMode === "DEG") {

        answer =
            answer * 180 / Math.PI;

    }


    return answer;

}


function acos(x) {

    let answer =
        Math.acos(x);


    if (angleMode === "DEG") {

        answer =
            answer * 180 / Math.PI;

    }


    return answer;

}


function atan(x) {

    let answer =
        Math.atan(x);


    if (angleMode === "DEG") {

        answer =
            answer * 180 / Math.PI;

    }


    return answer;

}


// ===============================
// DEG / RAD
// ===============================

document
    .getElementById("degreeBtn")
    .addEventListener(
        "click",
        () => {

            angleMode = "DEG";

        }
    );


document
    .getElementById("radianBtn")
    .addEventListener(
        "click",
        () => {

            angleMode = "RAD";

        }
    );


// ===============================
// KEYBOARD SYSTEM
// ===============================

document.addEventListener(
    "keydown",
    (event) => {


        const key =
            event.key.toLowerCase();


        // -------------------------
        // B + O / B + C
        // -------------------------

        if (bracketShortcutActive) {


            if (key === "o") {

                handleButton("(");

                bracketShortcutActive =
                    false;

                clearTimeout(
                    bracketShortcutTimer
                );

                event.preventDefault();

                return;
            }


            if (key === "c") {

                handleButton(")");

                bracketShortcutActive =
                    false;

                clearTimeout(
                    bracketShortcutTimer
                );

                event.preventDefault();

                return;
            }


            // Invalid second key

            bracketShortcutActive =
                false;

            clearTimeout(
                bracketShortcutTimer
            );
        }


        // Start B shortcut

        if (key === "b") {

            bracketShortcutActive =
                true;


            clearTimeout(
                bracketShortcutTimer
            );


            bracketShortcutTimer =
                setTimeout(() => {

                    bracketShortcutActive =
                        false;

                }, 1200);


            event.preventDefault();

            return;
        }


        // -------------------------
        // Numbers
        // -------------------------

        if (/^[0-9]$/.test(key)) {

            handleButton(key);

            return;
        }


        // -------------------------
        // Decimal
        // -------------------------

        if (key === ".") {

            handleButton(".");

            return;
        }


        // -------------------------
        // Operators
        // -------------------------

        if (key === "+") {

            handleButton("+");

            return;
        }


        if (key === "-") {

            handleButton("−");

            return;
        }


        if (key === "*") {

            handleButton("×");

            return;
        }


        if (key === "/") {

            event.preventDefault();

            handleButton("÷");

            return;
        }


        if (key === "%") {

            handleButton("%");

            return;
        }


        // -------------------------
        // Enter
        // -------------------------

        if (
            key === "enter" ||
            key === "="
        ) {

            event.preventDefault();

            handleButton("=");

            return;
        }


        // -------------------------
        // Backspace
        // -------------------------

        if (key === "backspace") {

            event.preventDefault();

            handleButton("DEL");

            return;
        }


        // -------------------------
        // Escape
        // -------------------------

        if (key === "escape") {

            handleButton("AC");

            return;
        }


        // -------------------------
        // Scientific
        // -------------------------

        if (key === "s") {

            handleButton("sin");

            return;
        }


        if (key === "c") {

            handleButton("cos");

            return;
        }


        if (key === "t") {

            handleButton("tan");

            return;
        }


        if (key === "i") {

            handleButton("sin⁻¹");

            return;
        }


        if (key === "o") {

            handleButton("cos⁻¹");

            return;
        }


        if (key === "a") {

            handleButton("tan⁻¹");

            return;
        }


        if (key === "l") {

            handleButton("log");

            return;
        }


        if (key === "n") {

            handleButton("ln");

            return;
        }


        if (key === "r") {

            handleButton("√");

            return;
        }


        if (key === "x") {

            handleButton("x²");

            return;
        }


        if (key === "y") {

            handleButton("xʸ");

            return;
        }


        if (key === "p") {

            handleButton("π");

            return;
        }


        if (key === "e") {

            handleButton("e");

            return;
        }


        if (key === "f") {

            handleButton("!");

            return;
        }

    }
);


// ===============================
// MANUAL
// ===============================

const manualBtn =
    document.getElementById(
        "manualBtn"
    );

const manual =
    document.getElementById(
        "manual"
    );

const closeManual =
    document.getElementById(
        "closeManual"
    );


manualBtn.addEventListener(
    "click",
    () => {

        manual.style.display =
            "flex";

    }
);


closeManual.addEventListener(
    "click",
    () => {

        manual.style.display =
            "none";

    }
);


// Click outside manual

manual.addEventListener(
    "click",
    (event) => {

        if (
            event.target === manual
        ) {

            manual.style.display =
                "none";

        }

    }
);