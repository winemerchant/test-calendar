var app = new Vue({
    el: '#calendar',
    data: function() {
        return {
            //текущие год, месяц и день
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            date: new Date().getDate(),
            //дни недели
            days: ['Sn', 'Mn', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            //массив для дней месяца
            daysInMonth: [],
            monthes: ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            //дата, выбранная пользователем
            chosenDate: null,
            //текущая дата
            currentDate: [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()],
            lang: 'en',
            textForDate: 'Current Date', 
            textForLang: 'Change Language'
        }
    },
    mounted() {
        //отрисовывает календарь
        this.getDaysInMonth()
        //окрашивает ячейку с текущей датой  
        this.$nextTick(this.colorCurrentDate)
    },
    methods: {  
        getDaysInMonth() {
            this.daysInMonth = []
            let allDays = []
            let daysCounter = 0
            let week = []
            //какой день недели был 1го числа текущего или выбранного месяца
            let dayOfFirstDate = new Date (this.year, this.month, 1).getDay()
            if (this.lang == 'ru') {
                dayOfFirstDate += 6
            }
            //какой день последний в текущем или выбранном месяце
            let lastDateOfMonth = new Date(this.year, this.month + 1, 0).getDate()
            //создает массив чисел - дней месяца
            for (i = 1; i < lastDateOfMonth + 1; i++) {
                allDays.push(i)
            }
            //если месяц начинается не с понедельника, добавляет нужное количество "пустых" дней
            // if (dayOfFirstDate != 0){
            //     for(i = 0; i < dayOfFirstDate; i++) {
            //         allDays.unshift('')
            //     }
            // }
            for (i = 0; i < (dayOfFirstDate % 7); i++) {
                allDays.unshift('')
            }
            //присваивает каждые 7 дней в массив week и помещает его в массив dayInMonth
            for (i = 1; i < allDays.length + 1; i++) {
                week.push(allDays[daysCounter])
                daysCounter++
                if (i % 7 == 0) {
                    this.daysInMonth.push(week)
                    week = []
                }
            }
            //оставшиеся дни недели (если в последней неделе меньше 7ми дней)
            this.daysInMonth.push(week)
        },
        //выбрать предыдущий месяц
        choosePreviousMonth() {
            let elem = document.getElementById(String(new Date().getDate()))
            elem.style.borderWidth = '0px'
            this.daysInMonth = []
            this.month--
            if (this.month < 0) {
                this.month = 11
                this.year--
            }
            
            this.getDaysInMonth()
            if(this.month == new Date().getMonth()) {
                this.$nextTick(this.colorCurrentDate)
            }
        },
        //выбрать следующий месяц
        chooseNextMonth() {
            let elem = document.getElementById(String(new Date().getDate()))
            elem.style.borderWidth = '0px'
            this.daysInMonth = []
            this.month++
            if (this.month > 11) {
                this.month = 0
                this.year++
            }
            this.getDaysInMonth()
            if(this.month == new Date().getMonth()) {
                this.$nextTick(this.colorCurrentDate)
            }
        },
        //окрашивает текущую дату
        colorCurrentDate() {
                let elem = document.getElementById(String(new Date().getDate()))
                elem.style.borderWidth = '2px'
                elem.style.borderColor = 'green' 
        },
        //меняет выбранную дату и окрашивает ее
        changeDate(e) {
            if(this.chosenDate != null) {
                this.chosenDate.style.background = 'white'
            } 
            this.chosenDate = e.currentTarget
            console.log(this.chosenDate)
            this.date = e.target.innerHTML
            this.chosenDate.style.background = 'lime'
            this.currentDate  = String(this.year) + '/' + String(this.month) + '/' + String (this.date)
            console.log(this.currentDate) 
        },
        changeLang: function(event) {
            let elem = document.getElementById(String(new Date().getDate()))
            elem.style.borderWidth = '0px'
            if(event.target.value == 'en') {
                this.lang = 'en'
                this.days = ['Sn', 'Mn', 'Tu', 'We', 'Th', 'Fr', 'Sa']
                this.textForDate = 'Current Date' 
                this.textForLang = 'Change Language'
                this.$nextTick(this.getDaysInMonth)
            } else if (event.target.value == 'ru') {
                this.lang = 'ru'
                this.days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
                this.textForDate = 'Текущая дата' 
                this.textForLang = 'Сменить язык'
                this.$nextTick(this.getDaysInMonth)
            }
            setTimeout(() => {
                this.colorCurrentDate()
            }, 1);
        } 
    },   
})