import { Component, Input } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>
  <angular-editor id="editor1" [(ngModel)]="text"></angular-editor>
  text
  `,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '20rem',
    maxHeight: '20rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  text;

  @Input() name: string;
}
