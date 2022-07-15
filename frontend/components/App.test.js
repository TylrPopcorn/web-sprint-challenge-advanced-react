// Write your tests here
import React from 'react';
import { render, screen } from "@testing-library-react";

import userEvent from '@testing-library/user-event'

import AppClass from "./AppClass";

test('sanity', () => {
  expect(true).toBe(false)
})

test("App renders", () => {
  render(<AppClass />)
})

test("input exist/works", () => {
  render(<AppClass />)

  const emailField = screen.getByLabelText(/type email/i)
  userEvent.type(emailField, "test@yahoo.com")
  expect(emailField).toHaveTextContent("test@yahoo.com")
}) 