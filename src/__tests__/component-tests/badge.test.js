import Badge from '../../components/Badge.svelte'
import mockBadges from '../../mockData/getBadgesMock'
import { render } from '@testing-library/svelte'
import moment from "../../../__mocks__/moment";

const badge1 = mockBadges[0];
const badge2 = mockBadges[1];

// jest.mock('moment', moment);

test('should render badge1', () => {
  const { getByText, getClass } = render(Badge, {data: badge1});
  const actions = document.getElementsByClassName('actions')[0];

  expect(actions.children.length === 2);

  const deleteButton = actions.children[0];
  const shareButton = actions.children[1];

  const details = document.getElementsByClassName('details');

  expect(details.children.length === 2);

  const awardedDate = details.children[0];
  const awardedBy = details.children[1];

  expect(deleteButton);
  expect(shareButton);
  expect(details);
  expect(awardedDate);
  expect(awardedBy);
});

test('should render badge2', () => {
  const { getByText } = render(Badge, {data: badge2});
  const details = document.getElementsByClassName('details');

  expect(details.children.length === 3);

  const awardedDate = details.children[0];
  const expirationDate = details.children[1];
  const awardedBy = details.children[2];

  expect(awardedDate);
  expect(expirationDate);
  expect(awardedBy);
});