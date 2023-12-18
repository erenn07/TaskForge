import { render, screen } from '@testing-library/react';

import Dashboard from './components/pages/Dashboard';

test('renders learn react link', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
