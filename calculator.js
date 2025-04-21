const Calculadora = {

    currentInput: '',
    previousInput: '',
    operation: '',
    resultDisplay: document.getElementById('result'),
    historicDisplay: document.getElementById('historic'),

    init() {
        this.attachEventListeners();
        this.clear();
    },

    // acá centralizo todos los métodos que deben llamarse cuando se da click a un botón
    attachEventListeners() {
        const numberButtons = document.querySelectorAll('.number:not([disabled])');
        const operationButtons = document.querySelectorAll('.operation:not(#equal)');
        const clearButton = document.getElementById('clear');
        const equalButton = document.getElementById('equal');

        numberButtons.forEach(button => {
            button.addEventListener('click', () => this.appendNumber(button.textContent));
        });

        operationButtons.forEach(button => {
            button.addEventListener('click', () => this.chooseOperation(button.dataset.value, button.textContent));
        });

        equalButton.addEventListener('click', () => this.compute());

        clearButton.addEventListener('click', () => this.clear());
    },

    appendNumber(number) {            // para ir agregando números a medida que se presionan
        this.currentInput += number;
        this.updateDisplay();
    },

    chooseOperation(opValue, opSymbol) {
        if (this.currentInput === '') return;
        this.previousInput = this.currentInput;
        this.operation = opValue;
        this.historicDisplay.textContent = `${this.previousInput} ${opSymbol}`;
        this.currentInput = '';
        this.updateDisplay();
    },

    compute() {
        if (this.previousInput === '' || this.currentInput === '' || this.operation === '') return;

        const a = parseFloat(this.previousInput);
        const b = parseFloat(this.currentInput);
        let result;

        switch (this.operation) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = b !== 0 ? a / b : 'Error';
                break;
            default:
                return;
        }

        this.historicDisplay.textContent = `${this.previousInput} ${this.operation} ${this.currentInput}`;
        this.currentInput = result.toString();
        this.previousInput = '';
        this.operation = '';
        this.updateDisplay();
    },

    clear() {
        this.currentInput = '';
        this.previousInput = '';
        this.operation = '';
        this.resultDisplay.textContent = '0';
        this.historicDisplay.textContent = '';
    },

    updateDisplay() {
        this.resultDisplay.textContent = this.currentInput || '0';
    }
};

// Inicializar la calculadora
document.addEventListener('DOMContentLoaded', () => {
    Calculadora.init();
});