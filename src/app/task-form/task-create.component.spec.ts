import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from "rxjs";

import {TaskCreateComponent} from './task-create.component';
import {TaskService} from '../task.service';
import {Task} from '../task.model';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../app-routing.module";
import {RouterOutlet} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {MessageModule} from "primeng/message";

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskService = jasmine.createSpyObj<TaskService>('TaskService', ['createTask']);

    await TestBed.configureTestingModule({
      declarations: [TaskCreateComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RouterOutlet,
        ButtonModule,
        InputTextareaModule,
        InputTextModule,
        CalendarModule,
        MessageModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: TaskService, useValue: taskService}
      ]
    })
      .compileComponents();

    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен быть создан', () => {
    expect(component).toBeTruthy();
  });

  it('должен создать задачу, когда форма отправлена', () => {
    taskServiceSpy.createTask.and.returnValue(of({
      id: 1,
      title: 'Новая задача',
      description: 'Описание новой задачи',
      dueDate: new Date(),
      completed: false
    }));

    const formValues = {
      title: 'Новая задача',
      description: 'Описание новой задачи',
      dueDate: new Date()
    };

    component.taskForm.setValue(formValues);

    component.onSubmit();

    expect(taskServiceSpy.createTask).toHaveBeenCalledWith({
      title: formValues.title,
      description: formValues.description,
      dueDate: new Date(formValues.dueDate)
    } as Task);

    expect(component.taskForm.valid).toBeTrue();
  });
});
