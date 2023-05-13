import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Blog from '../components/Blog';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';


jest.mock('axios');

axios.delete.mockResolvedValue({ data: {} });


afterEach(() => {
    jest.restoreAllMocks();
});

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

test('renders edit and delete buttons when isUser is true', () => {
    const blogProps = {
        title: 'Test Blog Title',
        description: 'Test Blog Description',
        imageURL: 'test-image.jpg',
        userName: 'Test User',
        isUser: true,
        id: '123',
    };

    render(
        <MemoryRouter>
            <Blog {...blogProps} />
        </MemoryRouter>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
});


test('renders the blog image', async () => {
    const blogProps = {
        title: 'Test Blog Title',
        description: 'Test Blog Description',
        imageURL: 'test-image.jpg',
        userName: 'Test User',
        isUser: false,
        id: '123',
    };


    global.fetch = jest.fn(() => Promise.resolve({}));

    render(
        <MemoryRouter>
            <Blog {...blogProps} />
        </MemoryRouter>
    );


    await waitFor(() => expect(global.fetch).toHaveBeenCalled());


    expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/' + blogProps.imageURL,
        expect.objectContaining({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
    );
});

test('does not render edit and delete buttons when isUser is false', () => {
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

    const editButton = screen.queryByRole('button', { name: /edit/i });
    const deleteButton = screen.queryByRole('button', { name: /delete/i });

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
});


test('delete blog post', async () => {
    const blogProps = {
        title: 'Test Blog Title',
        description: 'Test Blog Description',
        imageURL: 'test-image.jpg',
        userName: 'Test User',
        isUser: true,
        id: '123',
    };

    axios.delete.mockResolvedValue({});

    render(
        <MemoryRouter>
            <Blog {...blogProps} />
        </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(axios.delete).toHaveBeenCalledWith(`http://localhost:8000/api/blog/${blogProps.id}`);
});






