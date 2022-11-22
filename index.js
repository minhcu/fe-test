// TODO: chia todo theo 3 state

const app = {
    data: {
        todos: [
            {
                category: 'Marketing',
                title: 'Write SEO article for new product',
                content: 'This is an existential moment for effective altruism and the rationalist community writ-large.',
                time: 'June 30, 2022',
                state: 0,
            },
            {
                category: 'Marketing',
                title: 'Write SEO article for new product',
                content: 'This is an existential moment for effective altruism and the rationalist community writ-large.',
                time: 'June 30, 2022',
                state: 1,
            },
            {
                category: 'Marketing',
                title: 'Write SEO article for new product',
                content: 'This is an existential moment for effective altruism and the rationalist community writ-large.',
                time: 'June 30, 2022',
                state: 2,
            },
        ],
        boxSelectors: {},
        formSelectors: {
            popup: '.popup',
            form: '.form',
            category: '#category',
            title: '#title',
            content: '#content',
        },
        btnSelectors: {
            add: '.btn-add',
            close: '.btn-close',
            submit: '#submit',
        }
    },
    getElement: function (selector) {
        const ele = document.querySelector(selector);
        return ele;
    },
    setTodo: function() {

    },
    getTodo: function() {
        const data = localStorage.getItem('todoItem');
        this.data = JSON.parse(data);
    },
    postTodo: function() {
        JSON.stringify(this.data);
        localStorage.setItem('todoItem', this.data);
    },
    htmlConvert: function (item) {
        const html = `
        <div class="box">
            <div class="box-head">
                <div class="box-title">
                    <div class="category">${item.category}</div>
                    <h3 class="title">${item.title}</h3>
                </div>
                <div class="box-action">
                    <div class="icon">
                        <img src="./static/Edit.png" alt="edit">
                    </div>
                    <div class="icon">
                        <img src="./static/Delete.png" alt="delete">
                    </div>
                </div>
            </div>
            <div class="box-divider"></div>
            <div class="box-body">
                <p class="box-desc">
                    ${item.content}
                </p>
                <div class="box-time">
                    <img src="./static/time.png" alt="time">
                    <span>${item.time}</span>
                </div>
            </div>
        </div>
        `
        return html;
    },
    form: {
        validate: function(html) {
            const isValid = html.value !== ''
            if (isValid)
                html.classList.add('valid')
            if (!isValid)
                html.classList.add('invalid');
        },
        handleForm: function(formData) {
            const date = new Date();
            const time = date.getMonth() + ' ' + date.getDay() + ', ' + date.getFullYear();
            const todo = {
                category,
                title,
                content,
                time,
                state: 0,
            }
            data.todos.push(todo);
        },
    },
    handleEvent: function() {
        const that = this;
        const data = this.data;
        const addBtn = this.getElement(data.btnSelectors.add);
        const closeBtn = this.getElement(data.btnSelectors.close);
        const popup = this.getElement(data.formSelectors.popup);
        const form = this.getElement(data.formSelectors.form);
        const formSubmit = this.getElement(data.btnSelectors.submit);

        // Form field
        const category = this.getElement(data.formSelectors.category);
        const title = this.getElement(data.formSelectors.title);
        const content = this.getElement(data.formSelectors.content);
        const arr = [category, title, content]
        
        // Handle form
        function closeForm() {
            popup.classList.remove('visible');
            arr.forEach(el => {
                el.classList.remove('invalid');
                el.classList.remove('valid');
                el.value = ''
            })
        };
        addBtn.onclick = function() {
            popup.classList.add('visible');
        }
        closeBtn.onclick = function() {
            closeForm();
        }
        popup.onclick = function() {
            closeForm();
        }
        form.onclick = function(e) {
            e.stopPropagation();
        }

        arr.forEach(el => {
            el.onfocus = function() {
                el.classList.remove('invalid')
            };
            el.onblur = function() {
                that.form.validate(el);
            };
        })

        formSubmit.onclick = function() {
            const formData = {
                category: category.value,
                title: title.value,
                content: content.value
            };
            that.form.handleForm(formData);
        }
    },
    render() {
        const that = this;
        const data = this.data;
        const containerList = ['#todo', '#doing', '#finished']

        for (let i = 0; i < 3; i++) {
            const container = this.getElement(containerList[i]);
            const filteredTodo = data.todos.filter(todo => todo.state % 3 === i);
            const html = filteredTodo.map(todo => that.htmlConvert(todo));
            container.innerHTML = html;
        }
    },
    start: function() {
        this.handleEvent();
        this.render();
    }
}

const form = {
    selectors: {
        popup: '.popup',
        form: '.form',
        category: '#category',
        title: '#title',
        content: '#content',
    },
    validator: {
        validate: function() {},
        handleEvent: function(selector) {
            const inputElement = document.querySelector(selector);
            inputElement.onblur = function() {}
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
    handleRules: function(rules) {
        let result = {};
        rules.forEach(rule => result[rule.selector] = rule.test);

        return result;
    },
    start: function() {
        const selectors = this.selectors;
        const isRequired = this.validator.isRequired;
        const selectorRules = this.handleRules([
            isRequired(selectors.category),
            isRequired(selectors.title),
            isRequired(selectors.content)
        ])
        console.log(selectorRules)
    }
}
form.start()
app.start();
