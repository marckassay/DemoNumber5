import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TimerPage } from './timer';

const routes: Routes = [
    {
        path: '',
        component: TimerPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TimerPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class TimerPageModule { }
