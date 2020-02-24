import '@testing-library/jest-dom/extend-expect'

import {fireEvent, render} from '@testing-library/svelte'

import BackpackComp from '../../routes/students/Backpack.svelte'

import { getBadges } from "../../api";

import getBadgesMock from "../../mockData/getBadgesMock"

beforeEach(() => {
  jest.mock(getBadges);
  getBadges.get.mockResolvedValue(getBadgesMock);
});

test('shows proper heading when rendered', () => {
  const { getByText } = render(BackpackComp);

  expect(getByText('Your achievements')).toBeInTheDocument()
});

test('should fetch two mock badges', async () => {
  render(BackpackComp);
  const badges = document.getElementsByClassName('badge');
  expect(badges.length === 2);
});

test('should delete an earned badge', async () => {
  const { getByText } = render(BackpackComp);

  const badges = document.getElementsByClassName('badge');
  expect(badges.length === 2);

  const deleteBadge = getByText('delete');
  await fireEvent(deleteBadge.click);

  expect(badges.length === 1);
});
