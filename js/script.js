function getComparer(prop) {
        return function (a,b) {
            if (a[prop] < b[prop]) {
                return -1;
            }
            if (a[prop] > b[prop]) {
                return 1;
            }
            return 0;
        }
    };

const skills = {
    data: [],

    sortMode: null,

    renderList(parentElement) {
        parentElement.innerHTML = '';
        this.data.forEach(skill => {
            const dtElement = document.createElement('dt');
            dtElement.className = 'skill-item';
            dtElement.textContent = skill.name;
            dtElement.style.backgroundImage = `url('img/${skill.image}')`;
            
            const ddElement = document.createElement('dd');
            ddElement.className = 'skill-level';
            
            const divElement = document.createElement('div');
            divElement.style.width = skill.level + '%';
            divElement.textContent = skill.level;
            
            ddElement.appendChild(divElement);
            this.skillList.append(dtElement, ddElement);
        });
    },

    sortList(type) {
        if (this.sortMode !== type) {
                this.data.sort(getComparer(type));
                this.sortMode = type;
                console.log('Отсортировали данные по ' + type);
            } else {
                this.data.reverse();
                console.log('Инвертировали порядок сортировки');
            }
        this.renderList(this.skillList);
    },

    getData(filePath) {
        fetch(filePath)
            .then(data => data.json())
            .then(object => {
                this.data = object;
                this.renderList(this.skillList);
            })
            .catch(() => {
                console.error('Что-то пошло не так');
                this.skillSection.style.display = 'none';
            });
    },

    init() {
        this.skillList = document.querySelector('dl.skill-list');
        this.skillSort = document.querySelector('.skills-buttons');
        this.skillSection = document.querySelector('.skills');
        const filePath = 'db/skills.json';
        this.getData(filePath);

        this.skillSort.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.nodeName === "BUTTON") {
                const type = target.dataset.type;
                switch(type) {
                    case 'name':
                        this.sortList(type);
                        break;
                    case 'level':
                        this.sortList(type);
                        break;
                    default:
                        console.log('Неизвестная кнопка');
                }
            }
        });
    }
};

const menu = {
    close() {
        this.nav.classList.add('main-nav_closed');
        this.navButton.classList.remove('nav-btn_close');
        this.navButton.classList.add('nav-btn_open');
        this.navButton.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
    },

    open() {
        this.nav.classList.remove('main-nav_closed');
        this.navButton.classList.add('nav-btn_close');
        this.navButton.classList.remove('nav-btn_open');
        this.navButton.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
    },

    init() {
        this.nav = document.querySelector('.main-nav');
        this.navButton = document.querySelector('.nav-btn');

        this.close();

        this.navButton.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-btn_open')) {
                this.open();
            } else {
                this.close();
            }
        });
    }
};

const themeSwitch = document.querySelector('.switch-checkbox');
const body = document.querySelector('body');

menu.init();

skills.init();

if (localStorage.getItem('theme') === 'light') {
    body.classList.remove('dark-theme');
    themeSwitch.checked = true;
};

themeSwitch.addEventListener('change', (e) => {
    if (e.target.checked === true) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
});