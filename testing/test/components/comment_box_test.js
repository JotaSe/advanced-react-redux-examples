import { renderComponent, expect } from '../test_helper';
import CommentBox from '../../src/components/comment_box';

describe('CommentBox',  () => {
  let component;

  beforeEach(() => {
    component = renderComponent(CommentBox);
  });

  it('has a text area', () => {
    expect(component.find('textarea')).to.exist;
  });

  it('has a button', () => {
    expect(component.find('button')).to.exist;
  });

  it('has the correct class', () => {
    expect(component).to.have.class('comment-box');
  });

  describe('entering some text', () => {
    const dummyText = 'new comment';
    beforeEach(() => {
      component.find('textarea').simulate('change', dummyText);
    });

    it('shows that text in the textarea', () => {
      expect(component.find('textarea')).to.have.value(dummyText);
    });

    it('when submitted, clears the input', () => {
      component.simulate('submit');
      expect(component.find('textarea')).to.have.value('');
    });
  })
});
