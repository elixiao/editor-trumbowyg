import {Component, ChangeDetectionStrategy} from '@angular/core';

import './trumbowyg/trumbowyg.js';
import './trumbowyg/langs/zh_cn.min.js';
import './trumbowyg/plugins/upload/trumbowyg.upload.js';
import './trumbowyg/plugins/colors/trumbowyg.colors.js';

@Component({
  selector: 'app-root',
  template: `
    <h2>Angular 2 Trumbowyg <strong>Live Update</strong> Example</h2>
    <div class="row">
      <div class="col-md-6">
        <trumbowyg liveUpdate="true"
                   [initialContent]="initialContentTwo"
                   [options]="options"
                   (savedContent)="contentTwo=$event"
        >
        </trumbowyg>
      </div>
      <div class="col-md-6">
        <p [innerHTML]="contentTwo|safeHtml"></p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  public initialContentTwo = `
<h2>This is an initial title Two.</h2>
<p>This is an initial content.</p>
<p><img src="https://github.com/Alex-D/Trumbowyg/raw/develop/banner.png" alt=""><br></p>
<p><br></p>`;

  public contentTwo: string;

  public options: any = {
    lang: 'zh_cn',
    btnsDef: {
      image: {
        dropdown: ['insertImage', 'upload'],
        ico: 'insertImage'
      }
    },
    btns: [
      // ['viewHTML'],
      ['undo', 'redo'],
      ['formatting'],
      'btnGrp-design',
      ['link', 'image'],
      'btnGrp-justify',
      'btnGrp-lists',
      ['foreColor', 'backColor'],
      ['table', 'insertTable'],
      ['preformatted'],
      ['horizontalRule'],
      ['fullscreen']
    ],
    plugins: {
      upload: {
        serverPath: 'https://api.imgur.com/3/image',
        fileFieldName: 'image',
        headers: {
          'Authorization': 'Client-ID 9e57cb1c4791cea'
        },
        urlPropertyName: 'data.link'
      }
    }
  };

}
