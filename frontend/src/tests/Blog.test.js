import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog';
import { MemoryRouter } from 'react-router-dom';

test('renders the blog title', () => {
    const blogProps = {
        title: 'Test Blog Title',
        description: 'Test Blog Description',
        imageURL: 'test-image.jpg',
        userName: 'Test User',
        isUser: false,
        id: '123',
    };

    render(
        <MemoryRouter>
            <Blog {...blogProps} />
        </MemoryRouter>
    );

    const titleElement = screen.getByText(/Test Blog Title/i);
    expect(titleElement).toBeInTheDocument();
});