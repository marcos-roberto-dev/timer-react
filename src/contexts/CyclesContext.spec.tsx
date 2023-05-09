import { render } from '@testing-library/react'
import { CyclesContextProvider } from './CyclesContext'
import { ReactNode } from 'react'

describe('CycleContext', () => {
  it('test cycles context provider', () => {
    const wrapper = ({ children }: { children?: ReactNode }) => (
      <CyclesContextProvider>{children}</CyclesContextProvider>
    )

    const { getByTestId } = render(<div data-testid="fake-component" />, {
      wrapper,
    })
    const component = getByTestId('fake-component')
    expect(component).toBeInTheDocument()
  })
})
