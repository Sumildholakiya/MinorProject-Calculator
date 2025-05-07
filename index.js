let display = document.getElementById('display');
let btns = document.querySelectorAll("button");

// This string holds what the user is typing
let res = "";

// Listen for keyboard input
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Map some keyboard keys to match the symbols on the calculator buttons
    const map = {
        '*': '×',
        '/': '÷',
        '-': '−',
        '+': '+',
        '.': '.',
        'Enter': '=',
        '=': '=',
        'Backspace': '⌫',
        'Escape': 'C'
    };

    // Find the symbol that matches the key pressed
    const keyVal = map[key] || key;

    // Find the button that has the same symbol/text as the key pressed
    const button = [...btns].find(btn => btn.textContent === keyVal);

    // If we found a matching button, highlight it briefly
    if (button) {
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 150);
    }

    // If the user typed a number, decimal point, or operator, add it to the expression
    if (!isNaN(key) || key === '.' || key === '00' || ['+', '-', '*', '/'].includes(key)) {
        res += key;
        display.value = res;
    }
    // If the user pressed Enter or =, calculate the result
    else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Stop the default form submission if any
        try {
            res = eval(res).toString();
            display.value = res;
        } catch {
            display.value = "Error";
            res = "";
        }
    }
    // If Backspace is pressed, remove the last character
    else if (key === 'Backspace') {
        res = res.slice(0, -1);
        display.value = res;
    }
    // If Escape is pressed, clear everything
    else if (key === 'Escape') {
        res = "";
        display.value = res;
    }
});

// Handle mouse clicks on calculator buttons
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let value = btn.dataset.value;
        let action = btn.dataset.action;

        // If it's a number or operator button, add it to the expression
        if (value) {
            res += value;
            display.value = res;
        }

        // Handle different special actions
        switch (action) {
            case "ce": // Clear the last entered number
                res = res.replace(/[\d.]+$/, '');
                display.value = res;
                break;
            case "clear": // Clear everything
                res = "";
                display.value = res;
                break;
            case "backspace": // Remove the last character
                res = res.slice(0, -1);
                display.value = res;
                break;
            case "inverse": // Calculate 1 divided by the current value
                try {
                    res = (1 / eval(res)).toString();
                    display.value = res;
                } catch {
                    display.value = "Error";
                    res = "";
                }
                break;
            case "square": // Square the current value
                try {
                    res = Math.pow(eval(res), 2).toString();
                    display.value = res;
                } catch {
                    display.value = "Error";
                    res = "";
                }
                break;
            case "sqrt": // Take the square root of the current value
                try {
                    res = Math.sqrt(eval(res)).toString();
                    display.value = res;
                } catch {
                    display.value = "Error";
                    res = "";
                }
                break;
            case "calculate": // Evaluate the full expression
                try {
                    res = eval(res).toString();
                    display.value = res;
                } catch {
                    display.value = "Error";
                    res = "";
                }
                break;

            default:
                break;
        }
    });
});
