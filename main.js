var app = new Vue({
    el: '#calendar',
    data: function() {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            date: new Date().getDate(),
            days: ['Sn', 'Mn', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            daysInMonth: [],
            monthes: ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            chosenDate: null,
            currentDate: [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()]
        }
    },

    mounted() {
        this.getDaysInMonth()
        // setTimeout(this.chooseCurrentData, 1000)
        
    },
            
    methods: {  
        getDaysInMonth() {
            let allDays = []
            let daysCounter = 0
            let weak = []
            let dayOfFirstDate = new Date (this.year, this.month, 1).getDay()
            let lastDateOfMonth = new Date(this.year, this.month + 1, 0).getDate()
            
            for (i = 1; i < lastDateOfMonth + 1; i++) {
                allDays.push(i)
                
            }

            if (dayOfFirstDate != 1){
                for(i = 0; i < dayOfFirstDate - 1; i++) {
                    allDays.unshift('')
                }
            }

            for (i = 1; i < allDays.length + 1; i++) {
                weak.push(allDays[daysCounter])
                daysCounter++
                if (i % 7 == 0) {
                    this.daysInMonth.push(weak)
                    weak = []
                }
            }

            this.daysInMonth.push(weak)
            
            

        },

        choosePreviousMonth() {
            this.daysInMonth = []
            this.month--
            if (this.month < 0) {
                this.month = 11
                this.year--
            }
            this.getDaysInMonth()
        },

        chooseNextMonth() {
            this.daysInMonth = []
            this.month++
            if (this.month > 11) {
                this.month = 0
                this.year++
            }
            this.getDaysInMonth()
        },

        changeDate(e) {
            if(this.chosenDate != null) {
                this.chosenDate.style.background = 'white'
            } 
            this.chosenDate = e.currentTarget
            this.date = e.target.innerHTML
            this.chosenDate.style.background = 'red'
            this.currentDate  = String(this.year) + '/' + String(this.month) + '/' + String (this.date)
            console.log(this.currentDate)
            
        },


    },

    
})
