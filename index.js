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
    },
    selector: {
        openformBtn: '.btn-add',
        popup: '.popup'
    },
    getElement: function (selector) {
        const ele = document.querySelector(selector);
        return ele;
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
        const popup = this.getElement(this.selector.popup);
        const addBtn = this.getElement(this.selector.openformBtn);
        //
        addBtn.onclick = () => popup.classList.add('visible');

        // Handles submit data
        window.addEventListener('formSubmit', (e) => console.log(e.detail));
    },
    render() {
        const _this = this;
        const data = this.data;
        const containerList = ['#todo', '#doing', '#finished']

        for (let i = 0; i < 3; i++) {
            const container = this.getElement(containerList[i]);
            const filteredTodo = data.todos.filter(todo => todo.state % 3 === i);
            const html = filteredTodo.map(todo => _this.htmlConvert(todo)).join('');
            container.innerHTML = html;
        }
    },
    start: function() {
        this.handleEvent();
        this.render();
    }
}
app.start();
