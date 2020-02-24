import '@testing-library/jest-dom/extend-expect'

import { render } from '@testing-library/svelte'

import Profile from '../../routes/students/Profile.svelte'
import { getProfile } from "../../api";
import getStudentProfileMock from "../../mockData/getStudentProfileMock";

test('should render inner component', async () => {
  jest.mock(getProfile);
  getProfile.get.mockResolvedValue(getStudentProfileMock);

  const { getByText } = render(Profile);

  expect(getByText('student1@diy.surfconext.nl')).toBeInTheDocument()
});
