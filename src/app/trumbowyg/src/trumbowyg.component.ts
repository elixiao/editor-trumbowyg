import {
  Component, ElementRef, OnDestroy, Input, OnInit, EventEmitter, Output
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';

declare const jQuery: any;

@Component({
  selector: 'trumbowyg',
  templateUrl: './trumbowyg.component.html'
})
export class Trumbowyg implements OnInit, OnDestroy {

  @Input() initialContent: string;
  @Input() liveUpdate = false;
  @Input() update: Observable<any>;
  @Input() options: any = {};
  @Output() public savedContent: EventEmitter<any> = new EventEmitter();

  private content$: Subject<string> = new BehaviorSubject("");

  private contentSub: any;
  private updateSubscription: any;
  private trumbowygEl: any;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {

    this.trumbowygEl = jQuery(this.el.nativeElement).find('#ng-trumbowyg');
    this.trumbowygEl.trumbowyg(this.options);
    if (this.initialContent) this.content$.next(this.initialContent);
    if (this.liveUpdate) {
      this.trumbowygEl.trumbowyg().on('tbwchange', () => {
        this.savedContent.emit(this.trumbowygEl.trumbowyg('html'));
      })
    }

    this.contentSub = this.content$
      .filter(content => !!content)
      .subscribe(content => {
        console.log(content);
        if (content) {
          this.trumbowygEl.trumbowyg('html', content);
          this.savedContent.emit(this.trumbowygEl.trumbowyg('html'));
        }
      });

    this.updateSubscription = this.update ? this.update
      .subscribe(() => {
        this.savedContent.emit(this.trumbowygEl.trumbowyg('html'));
      }) : null;
  }

  ngOnDestroy() {
    this.contentSub.unsubscribe();
    if (this.updateSubscription) this.updateSubscription.unsubscribe();
  }
}
