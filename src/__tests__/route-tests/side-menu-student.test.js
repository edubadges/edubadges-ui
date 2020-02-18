import '@testing-library/jest-dom/extend-expect'

import {fireEvent, render} from '@testing-library/svelte'

import Student from '../../routes/student/Main.svelte'

it('should render inner component', async () => {
  const { getByText, getByClassName } = render(Student);

  const backPackButton = getByText('backpack');

  await fireEvent((backPackButton).click);

  const backpackHeader = getByText('Your achievements');

  expect(backpackHeader).toBeInTheDocument();

  const badgeRequestButton = getByText('Badge requests');

  await fireEvent((badgeRequestButton).click);

  const badgeRequestText = getByText('BadgeRequests');

  expect(badgeRequestText).toBeInTheDocument();
});
