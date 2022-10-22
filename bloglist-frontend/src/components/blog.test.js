import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author', ()=>{
    const blog = {
        title: "the one and only",
        author: "Badur"
    }
    render (<Blog blog={blog} />)
    
    const element = screen.getByAltText("the one and only")
    expect(element).toBeDefined()
})