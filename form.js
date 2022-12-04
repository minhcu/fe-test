const form = {
    selectors: {
        popup: '.popup',
        form: '.form',
        closeBtn: '.btn-close',
        inputs: ['#category', '#title', '#content'],
    },
    validator: {
        validate: function(inputElement, rule) {
            const isValid = rule.test(inputElement.value)
            if (!isValid) {
                inputElement.classList.remove('valid')
                inputElement.classList.add('invalid')
            } else {
                inputElement.classList.add('valid')
            }
            return isValid;
        },
        isRequired: function(selector) {
            return {
                selector: selector,
                test: function(value) {
                    return value !== ''
                }
            }
        }
    },
    handleInput: function(rules) {
        rules.forEach(rule => {
            const inputElement = document.querySelector(rule.selector);

            inputElement.onblur = () => this.validator.validate(inputElement, rule);

            inputElement.oninput = () => inputElement.classList.remove('invalid');
        })
    },
    handleSubmit: function(e, rules) {
        e.preventDefault();
        let isFormValid = true;
        rules.forEach(rule => {
            const inputElement = document.querySelector(rule.selector);
            const isValid = this.validator.validate(inputElement, rule);
            if (!isValid) return isFormValid = false;
        });

        if (isFormValid) {
            // Get input elements
            const inputElements = this.selectors.inputs.map(selector => document.querySelector(selector));

            // Get input value
            const formData = inputElements.reduce(function(value, input) {
                value[input.id] = 'test';
                return value;
            }, {})

            // Dispatch data
            const event = new CustomEvent('formSubmit', {detail: formData})
            window.dispatchEvent(event);
        }
    },
    clearForm: function(inputElements) {
        inputElements.forEach(element => {
            element.classList.remove('invalid');
            element.classList.remove('valid');
            element.value = '';
        })
    },
    handleEvent: function(rules) {
        const popup = document.querySelector(this.selectors.popup);
        const form = document.querySelector(this.selectors.form);
        const closeBtn = document.querySelector(this.selectors.closeBtn);

        // Handle submit
        form.onsubmit = (e) => this.handleSubmit(e, rules);

        // Handle close form
        closeBtn.onclick = (e) => {
            const inputElements = this.selectors.inputs.map(selector => document.querySelector(selector));
            this.clearForm(inputElements);
            popup.classList.remove('visible');
        }
        form.onclick = (e) => e.stopPropagation();

        popup.onclick = () => popup.classList.remove('visible');
    },
    start: function() {
        const selectors = this.selectors;
        const isRequired = this.validator.isRequired;
        const rules = selectors.inputs.map(selector => isRequired(selector));
        this.handleInput(rules);
        this.handleEvent(rules);
    },
}
form.start();