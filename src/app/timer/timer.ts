import { Component } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { add, CountdownSegment, CountupSegment, ITimeEmission, Sequencer } from 'sots';


enum AppStates {
    Beep = 2,
    Warning = 4,
    Rest = 8,
    Active = 16,
    Alert = AppStates.Beep + AppStates.Warning,
}

@Component({
    templateUrl: './timer.html',
})
export class TimerPage {

    sequencer: Sequencer;
    output: string;
    disableButton: boolean;

    constructor(private sound: NativeAudio) {
        this.init();
        this.output = '---';
        this.disableButton = false;
        this.sound.preloadSimple('beep', 'assets/beep.mp3');
    }

    init() {
        this.sequencer = new Sequencer({ period: 100, compareAsBitwise: true });
        this.sequencer.add(CountdownSegment, {
            duration: 10000,
            states: [
                { state: AppStates.Beep, timeAt: '10,2,1' },
                { state: AppStates.Warning, timeLessThanOrEqualTo: '5' },
            ],
        })
            .group(3,
                add(CountdownSegment, {
                    duration: 1000 * 2,
                    omitFirst: true,
                    states: [
                        { state: AppStates.Rest, timeLessThanOrEqualTo: '2' },
                        { state: AppStates.Beep, timeAt: '2' },
                    ],
                }),
                add(CountdownSegment, {
                    duration: 1000 * 2,
                    states: [
                        { state: AppStates.Active, timeLessThanOrEqualTo: '2' },
                        { state: AppStates.Beep, timeAt: '2' },
                    ],
                })
            )
            .add(CountupSegment, {
                duration: 5000,
                states: [
                    { state: AppStates.Beep, timeAt: '0,3,4' },
                    { state: AppStates.Warning, timeGreaterThanOrEqualTo: '3' }],
            });

        this.sequencer.subscribe((value: ITimeEmission) => {
            this.output = 'time: ' + value.time + '\n';

            if (value.state) {
                if (value.state.valueOf(AppStates.Alert)) {
                    this.output += ' state: \'alert!\'' + '\n';
                } else if (value.state.valueOf(AppStates.Warning)) {
                    this.output += ' state: \'warning\'' + '\n';
                } else if (value.state.valueOf(AppStates.Beep)) {
                    this.output += ' state: \'beep\'' + '\n';
                    this.sound.play('beep');
                }

                if (value.state.valueOf(AppStates.Rest)) {
                    this.output += ' state: \'rest\'' + '\n';
                } else if (value.state.valueOf(AppStates.Active)) {
                    this.output += ' state: \'active\'' + '\n';
                }
            }

            if (value.interval) {
                this.output += ' interval.current: ' + value.interval.current;
                this.output += ' interval.total: ' + value.interval.total;
            }

            console.log(this.output);
        }, (error) => {
            console.error(error);
        }, () => {
            this.sound.play('beep');
            this.output = 'completed!';
        });
    }

    start() {
        this.disableButton = true;
        this.sequencer.start();
    }
}
