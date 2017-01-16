import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';

describe('CommentList' , () => {
  let component;
  const comments = ['Comment 1', 'Comment 2', 'Comment 3'];
  beforeEach(() => {
    const props = { comments };
    component = renderComponent(CommentList, null, props);
  });

  it('shows an LI for each comment', () => {
    expect(component.find('li').lenght).to.equal(comments.lenght);
  });

  it('shows each comment that is provided', () => {
    comments.forEach((comment) => {
      expect(component).to.contain(comment);
    })
  });
});
