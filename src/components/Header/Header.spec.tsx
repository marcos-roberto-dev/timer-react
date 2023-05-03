import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '.'

vi.mock('react-router-dom')

describe('<Header/>', () => {
  it('should render a component', () => {
    render(<Header />)
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'logo')
  })
})
