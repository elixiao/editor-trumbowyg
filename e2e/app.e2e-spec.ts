import { EditorTrumbowygPage } from './app.po';

describe('editor-trumbowyg App', () => {
  let page: EditorTrumbowygPage;

  beforeEach(() => {
    page = new EditorTrumbowygPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
