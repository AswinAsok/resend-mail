'use client'
import React, { useState } from 'react'

function isInputNamedElement(
  e: Element
): e is HTMLInputElement {
  return 'value' in e && 'name' in e;
}

function FormPage() {

  const [state, setState] = useState<string>('')

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData: Record<string, string> = {};

    Array.from(e.currentTarget.elements).filter(isInputNamedElement).forEach(field => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });

    setState('loading');

    await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: formData.name,
        email: formData.email,
        number: formData.number
      })
    })

    setState('success');
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-screen h-screen items-center justify-center '>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required placeholder='name' />
      <label htmlFor="number"></label>
      <input type="tel" id="number" name="number" required placeholder='phone no' />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required placeholder='email' />
      <button type="submit" disabled={state === 'loading'}>
        Send
      </button>
    </form>
  )
}

export default FormPage
