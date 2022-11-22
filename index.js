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
                state: 0,
            },
            {
                category: 'Marketing',
                title: 'Write SEO article for new product',
                content: 'This is an existential moment for effective altruism and the rationalist community writ-large.',
                time: 'June 30, 2022',
                state: 0,
            },
        ],
        boxSelectors: {},
        formSelectors: {
            popup: '.popup',
            form: '.form',
            category: '',
            title: '',
            description: '',
        },
        btnSelectors: {
            add: '.btn-add',
            close: '.btn-close'
        }
    },
    getElement: function (selector) {
        const ele = document.querySelector(selector);
        return ele;
    },
    getDate: function () {
        
    },
    setTodo: function() {
        const category = this.getElement();
        const title = this.getElement();
        const description = this.getElement();
        return {
            category,
            title,
            description,
            state: 0, //0: Todo | 1: Doing | 2: Finished
        }
    },
    fetchTodo: function() {
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
    handleEvent: function() {
        const that = this;
        const data = this.data;
        const addBtn = this.getElement(data.btnSelectors.add);
        const closeBtn = this.getElement(data.btnSelectors.close);
        const popup = this.getElement(data.formSelectors.popup);
        const form = this.getElement(data.formSelectors.form);
        
        // Handle form
        addBtn.onclick = function() {
            popup.classList.add('visible');
        }
        closeBtn.onclick = function() {
            popup.classList.remove('visible');
        }
        popup.onclick = function() {
            popup.classList.remove('visible');
        }
        form.onclick = function(e) {
            e.stopPropagation();
        }
    },
    start: function() {
        this.handleEvent();
    }
}

app.start();