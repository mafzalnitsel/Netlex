import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-register-progress-loading',
  templateUrl: './register-progress-loading.component.html',
  styleUrls: ['./register-progress-loading.component.scss']
})
export class RegisterProgressLoadingComponent implements OnInit {
  color: ThemePalette = 'primary';
  // mode: ProgressBarMode = 'determinate';
  mode: ProgressBarMode = 'buffer';
  // value = 50;
  value = 0;
  // value = 90;
  bufferValue = 100;
  task1 = false;
  task2 = false;
  task3 = false;

  @Input() firstTask: {};
  @Output() progressBarStatus = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log("firstTask", this.firstTask);

    let progressInterval = setInterval(() => {
      this.value = this.value + 0.2
      console.log("value", this.value);
      if (this.value >= 100) {
        console.log("Value reached 100", this.value);
        clearInterval(progressInterval);
        // this.progressBarStatus.emit(true)
      }
    }, 100)
    setTimeout(() => {
      this.value = 34;
      this.task1 = true;
      // setTimeout(() => {
      //   this.task1 = true;
      // }, 200);
    }, 5000);
    setTimeout(() => {
      this.value = 65;
      this.task2 = true;
    }, 7000);
    setTimeout(() => {
      this.value = 100;
      this.task3 = true;
    }, 9000);
  }

}
