import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComponentConfig, FieldModel } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct, NgbCalendar, NgbDatepicker, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';

export const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
   one && two && two.year === one.year && two.month === one.month && two.day === one.day;

export const before = (one: NgbDateStruct, two: NgbDateStruct) =>
   !one || !two
      ? false
      : one.year === two.year
         ? one.month === two.month
            ? one.day === two.day
               ? false
               : one.day < two.day
            : one.month < two.month
         : one.year < two.year;

export const after = (one: NgbDateStruct, two: NgbDateStruct) =>
   !one || !two
      ? false
      : one.year === two.year
         ? one.month === two.month
            ? one.day === two.day
               ? false
               : one.day > two.day
            : one.month > two.month
         : one.year > two.year;

@Component({
   selector: 'z-form-datepicker',
   templateUrl: './form-datepicker.component.html',
   styles: [
      `
         .custom-day {
            text-align: center;
            padding: 0.185rem 0.25rem;
            display: inline-block;
            height: 2rem;
            width: 2rem;
         }
         .custom-day.focused {
            background-color: #e6e6e6;
         }
         .custom-day.range,
         .custom-day:hover {
            background-color: rgb(2, 117, 216);
            color: white;
         }
         .custom-day.faded {
            background-color: rgba(2, 117, 216, 0.5);
         }
      `
   ]
})
export class FormDatepickerComponent implements ComponentConfig, OnInit {
   group: FormGroup;
   config: FieldModel;

   // Date Config
   startDate: NgbDateStruct;
   minDate: NgbDateStruct;
   maxDate: NgbDateStruct;
   autoClose = true;
   displayMonths = 1;
   // Range date picker values
   hoveredDate: NgbDateStruct;
   fromDate: NgbDateStruct;
   toDate: NgbDateStruct;

   constructor(private dateParse: NgbDateParserFormatter, private calendar: NgbCalendar) {
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
   }

   ngOnInit() {
      this.setDateValidations();
   }

   setDateValidations(): void {

      if (this.config.type === 'range') {
         this.autoClose = false;
         this.displayMonths = 2;
      }
      if (this.config.config) {
         Object.keys(this.config.config).forEach(key => (this[key] = this.dateParse.parse(this.config.config[key])));
      }
   }

   onDateSelection(date: NgbDateStruct, dp: NgbInputDatepicker) {
      //  When its a single date picker
      if (this.config.type === 'single') {
         this.group.controls[this.config.id].setValue(new Date(this.dateParse.format(date)).toISOString());
         return;
      } 

      //  When its a range date picker
      if (!this.fromDate && !this.toDate) {
         this.fromDate = date;
      } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
         // Assign to date and close the Date picker
         this.toDate = date;
         dp.close();
      } else {
         this.toDate = null;
         this.fromDate = date;
      }

      console.log(this.fromDate, this.toDate);

   }

   // Applies to the range date picker
   isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
   isInside = date => after(date, this.fromDate) && before(date, this.toDate);
   isFrom = date => equals(date, this.fromDate);
   isTo = date => equals(date, this.toDate);
}
