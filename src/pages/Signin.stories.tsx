import { Meta, StoryObj } from '@storybook/react';
import { SignIn } from "./Signin";
import { within, userEvent, waitFor} from '@storybook/testing-library'
import { rest } from 'msw';
import {expect} from '@storybook/jest'

export default {
    title: 'Pages/Sign in',
    component: SignIn,
    args: {},
    argTypes: {},
    parameters: {
      msw: {
        handlers: [
          rest.post('/sessions', (req, res, ctx) => {
            return res(ctx.json({
              message: 'Login realizado!'
            }))
          })
        ],
      }
    }
} as Meta

export const Default: StoryObj = {
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'rafael@gmail.com')
    userEvent.type(canvas.getByPlaceholderText('********'), '12345678')

    userEvent.click(canvas.getByRole('button'))

    await waitFor(() => {
      return expect(canvas.getByText('Login Realizado!')).toBeInTheDocument()
    })
  }
}