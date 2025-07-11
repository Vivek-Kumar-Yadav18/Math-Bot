// Math Bot JavaScript Implementation
class MathBot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.clearBtn = document.getElementById('clearChat');
        this.quickBtns = document.querySelectorAll('.quick-btn');
        this.examples = document.querySelectorAll('.example');
        
        this.initializeEventListeners();
        this.setCurrentTime();
    }

    initializeEventListeners() {
        // Send button click
        this.sendBtn.addEventListener('click', () => this.handleUserInput());
        
        // Enter key press
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserInput();
            }
        });

        // Clear chat button
        this.clearBtn.addEventListener('click', () => this.clearChat());

        // Quick action buttons
        this.quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.userInput.value = btn.dataset.action;
                this.handleUserInput();
            });
        });

        // Example clicks
        this.examples.forEach(example => {
            example.addEventListener('click', () => {
                this.userInput.value = example.textContent;
                this.handleUserInput();
            });
        });
    }

    setCurrentTime() {
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = new Date().toLocaleTimeString();
        }
    }

    addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (isUser) {
            messageContent.innerHTML = `
                <div class="message-header">
                    <span class="message-time">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="message-text">${content}</div>
            `;
        } else {
            messageContent.innerHTML = `
                <div class="message-header">
                    <i class="fas fa-robot bot-icon"></i>
                    <span class="message-time">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="message-text">${content}</div>
            `;
        }
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    clearChat() {
        // Keep only the welcome message
        const welcomeMessage = this.chatMessages.querySelector('.bot-message');
        this.chatMessages.innerHTML = '';
        if (welcomeMessage) {
            this.chatMessages.appendChild(welcomeMessage);
        }
    }

    handleUserInput() {
        const input = this.userInput.value.trim();
        if (!input) return;

        // Add user message
        this.addMessage(input, true);
        this.userInput.value = '';

        // Process the input
        const response = this.processMathInput(input);
        this.addMessage(response);
    }

    processMathInput(input) {
        const lowerInput = input.toLowerCase();
        
        try {
            // Basic calculations (+, -, *, /, ^)
            if (this.hasMathOperators(input)) {
                return this.basicCalculator(input);
            }
            
            // Square root
            if (lowerInput.includes('sqrt') || lowerInput.includes('root')) {
                return this.calculateSquareRoot(input);
            }
            
            // Area calculations
            if (this.isAreaCalculation(lowerInput)) {
                return this.calculateArea(input);
            }
            
            // Interest calculation
            if (lowerInput.includes('interest')) {
                return this.calculateInterest(input);
            }
            
            // LCM and HCF
            if (lowerInput.includes('lcm') || lowerInput.includes('hcf') || lowerInput.includes('gcd')) {
                return this.findLcmHcf(input);
            }
            
            // Trigonometry
            if (this.isTrigonometry(lowerInput)) {
                return this.calculateTrigonometry(input);
            }
            
            // Logarithms
            if (lowerInput.includes('log') || lowerInput.includes('ln')) {
                return this.calculateLogarithm(input);
            }
            
            // Help
            if (lowerInput === 'help' || lowerInput === '?') {
                return this.getHelpMessage();
            }
            
            // Default response
            return this.getDefaultResponse();
            
        } catch (error) {
            return `❌ Error: ${error.message}`;
        }
    }

    hasMathOperators(input) {
        return /[+\-*/^]/.test(input);
    }

    basicCalculator(expression) {
        try {
            // Replace ^ with ** for power
            expression = expression.replace(/\^/g, '**');
            // Remove spaces
            expression = expression.replace(/\s/g, '');
            // Calculate the result
            const result = eval(expression);
            return `Result: ${result}`;
        } catch (error) {
            return "❌ Sorry, I couldn't calculate that. Please check your expression.";
        }
    }

    calculateSquareRoot(input) {
        const numbers = this.extractNumbers(input);
        if (numbers.length === 0) {
            return "❌ Please provide a number for square root";
        }
        
        const number = numbers[0];
        if (number < 0) {
            return "❌ Cannot calculate square root of negative number";
        }
        
        const result = Math.sqrt(number);
        return `√${number} = ${result}`;
    }

    isAreaCalculation(input) {
        return input.includes('area') || input.includes('circle') || 
               input.includes('square') || input.includes('rectangle') || 
               input.includes('triangle');
    }

    calculateArea(input) {
        const numbers = this.extractNumbers(input);
        
        if (input.includes('circle') && numbers.length > 0) {
            const radius = numbers[0];
            const area = Math.PI * radius * radius;
            return `Area of circle with radius ${radius} = ${area.toFixed(2)}`;
        }
        
        if (input.includes('square') && numbers.length > 0) {
            const side = numbers[0];
            const area = side * side;
            return `Area of square with side ${side} = ${area}`;
        }
        
        if (input.includes('rectangle') && numbers.length >= 2) {
            const length = numbers[0];
            const width = numbers[1];
            const area = length * width;
            return `Area of rectangle ${length} × ${width} = ${area}`;
        }
        
        if (input.includes('triangle') && numbers.length >= 2) {
            const base = numbers[0];
            const height = numbers[1];
            const area = 0.5 * base * height;
            return `Area of triangle (base=${base}, height=${height}) = ${area}`;
        }
        
        return "❌ Please provide dimensions for the shape";
    }

    calculateInterest(input) {
        const numbers = this.extractNumbers(input);
        if (numbers.length < 3) {
            return "❌ Please provide Principal, Rate, and Time";
        }
        
        const principal = numbers[0];
        const rate = numbers[1];
        const time = numbers[2];
        
        const interest = (principal * rate * time) / 100;
        const total = principal + interest;
        
        return `Simple Interest: $${interest.toFixed(2)}<br>Total Amount: $${total.toFixed(2)}`;
    }

    findLcmHcf(input) {
        const numbers = this.extractNumbers(input);
        if (numbers.length < 2) {
            return "❌ Need at least 2 numbers";
        }
        
        // Find HCF (GCD)
        const gcd = (a, b) => {
            while (b) {
                [a, b] = [b, a % b];
            }
            return a;
        };
        
        // Find LCM
        const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
        
        // Calculate HCF
        let hcf = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            hcf = gcd(hcf, numbers[i]);
        }
        
        // Calculate LCM
        let lcmResult = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            lcmResult = lcm(lcmResult, numbers[i]);
        }
        
        return `HCF: ${hcf}<br>LCM: ${lcmResult}`;
    }

    isTrigonometry(input) {
        return /(sin|cos|tan|sec|cosec|cot)/.test(input);
    }

    calculateTrigonometry(input) {
        const trigPattern = /(sin|cos|tan|sec|cosec|cot)\(?(\d+\.?\d*)\)?/i;
        const match = input.match(trigPattern);
        
        if (!match) {
            return "❌ Please use format: sin(30), cos(45), tan(60)";
        }
        
        const functionName = match[1].toLowerCase();
        const angleDegrees = parseFloat(match[2]);
        const angleRadians = angleDegrees * Math.PI / 180;
        
        let result;
        switch (functionName) {
            case 'sin':
                result = Math.sin(angleRadians);
                break;
            case 'cos':
                result = Math.cos(angleRadians);
                break;
            case 'tan':
                result = Math.tan(angleRadians);
                break;
            case 'sec':
                result = 1 / Math.cos(angleRadians);
                break;
            case 'cosec':
                result = 1 / Math.sin(angleRadians);
                break;
            case 'cot':
                result = 1 / Math.tan(angleRadians);
                break;
            default:
                return "❌ Function not supported";
        }
        
        return `${functionName}(${angleDegrees}°) = ${result.toFixed(4)}`;
    }

    calculateLogarithm(input) {
        const logPattern = /(log|ln)(\d+)?\(?(\d+\.?\d*)\)?/i;
        const match = input.match(logPattern);
        
        if (!match) {
            return "❌ Please use format: log(100), log2(8), ln(10)";
        }
        
        const logType = match[1].toLowerCase();
        const baseStr = match[2];
        const number = parseFloat(match[3]);
        
        if (number <= 0) {
            return "❌ Cannot calculate log of zero or negative number";
        }
        
        if (logType === 'ln') {
            const result = Math.log(number);
            return `ln(${number}) = ${result.toFixed(4)}`;
        } else if (logType === 'log') {
            if (baseStr) {
                const base = parseFloat(baseStr);
                if (base <= 0 || base === 1) {
                    return "❌ Invalid base for logarithm";
                }
                const result = Math.log(number) / Math.log(base);
                return `log${base}(${number}) = ${result.toFixed(4)}`;
            } else {
                const result = Math.log10(number);
                return `log(${number}) = ${result.toFixed(4)}`;
            }
        }
        
        return "❌ Logarithm type not supported";
    }

    extractNumbers(text) {
        const numbers = text.match(/\d+/g);
        return numbers ? numbers.map(num => parseInt(num)) : [];
    }

    getHelpMessage() {
        return `
            <h3>🤖 Welcome to Math Bot!</h3>
            <p>I can help you with:</p>
            <ul>
                <li>Basic math (+, -, *, /)</li>
                <li>Powers (2^3 = 8)</li>
                <li>Square root (sqrt 16)</li>
                <li>Trigonometry (sin, cos, tan)</li>
                <li>Logarithms (log 100, log2 8)</li>
                <li>Area calculations</li>
                <li>Simple interest</li>
                <li>LCM and HCF</li>
            </ul>
            <p>Try asking me something like:</p>
            <div class="examples">
                <span class="example">2 + 3 * 4</span>
                <span class="example">5^3</span>
                <span class="example">sqrt 16</span>
                <span class="example">sin(30)</span>
                <span class="example">area of circle 5</span>
            </div>
        `;
    }

    getDefaultResponse() {
        return `
            🤖 I didn't understand that. Try:<br>
            • 2 + 3 * 4<br>
            • 5^3<br>
            • sqrt 16<br>
            • sin(30)<br>
            • log(100)<br>
            • area of circle 5<br>
            • interest 1000 5 2<br>
            • lcm 12 18<br>
            • Type 'help' for more options
        `;
    }
}

// Initialize the Math Bot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MathBot();
}); 