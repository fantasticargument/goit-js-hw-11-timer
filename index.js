class CountdownTimer{
    constructor({selector, targetDate}) {
        
        this.selector = document.querySelector(`${selector}`);
        this.targetDate = targetDate;
        this.dataValueDays = this.selector.querySelector('[data-value="days"]');
        this.dataValueHours = this.selector.querySelector('[data-value="hours"]');
        this.dataValueMins = this.selector.querySelector('[data-value="mins"]');
        this.dataValueSecs = this.selector.querySelector('[data-value="secs"]');
    }

    intervalId = setInterval(() => {

        const startTime = Date.now();

        const time = this.targetDate - startTime;

        if (time  < 1000) {
            this.stop()
        }

        const leftTime = this.getTimeComponent(time);

        this.onTik(leftTime)

    }, 1000);

    stop () {
    clearInterval(this.intervalId);
    }

    pad(value) {
    return String(value).padStart(2, '0');  
    }

    getTimeComponent(time) {

    // /*
    //  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
    //  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
    //  */
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    // /*
    //  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
    //  * остатка % и делим его на количество миллисекунд в одном часе
    //  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
    //  */
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

    // /*
    //  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
    //  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
    //  */
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    // /*
    //  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
    //  * миллисекунд в одной секунде (1000)
    //  */
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
    }

    onTik(tik) {
        this.dataValueDays.textContent = tik.days;
        this.dataValueHours.textContent = tik.hours;
        this.dataValueMins.textContent = tik.mins;
        this.dataValueSecs.textContent = tik.secs;
    }

}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 08, 2029, 19:55'),
});
