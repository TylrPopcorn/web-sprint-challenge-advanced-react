// Write your tests here
import React from 'react';
import { render, fireEvent, screen } from "@testing-library-react";

import userEvent from '@testing-library/user-event'
const queryOptions = { exact: false }
const waitForOptions = { timeout: 100 }

import AppClass from "./AppClass";

test('sanity', () => {
  expect(true).toBe(true)
})

test("App renders", () => {
  render(<AppClass />)
})

test("input exist/works", () => {
  render(<AppClass />)

  const up = document.querySelector('#up')
  fireEvent.click(up)
  const left = document.querySelector('#left')
  fireEvent.click(left)
  const submit = document.querySelector('#submit')

  const emailField = screen.getByLabelText(/type email/i)
  userEvent.type(emailField, "test@yahoo.com")
  expect(emailField).toHaveTextContent("test@yahoo.com")

  fireEvent.click(submit)
  await screen.findByText('test win #32', queryOptions, waitForOptions)
  expect(email.value).toBeFalsy()
})

