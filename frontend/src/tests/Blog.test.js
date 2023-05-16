import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Blog from '../components/Blog';
import Blogs from '../components/Blogs';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AddBlog from '../components/AddBlog';
import { sendRequest } from '../helpers/sendRequest';
import UserBlogs from '../components/UserBlogs';
import BlogDetail from '../components/BlogDetail';

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


describe('Add Blog', () => {
    test('renders AddBlog component', () => {
        render(<MemoryRouter><AddBlog /></MemoryRouter>);
    })

    test('handles form submission', () => {
        render(<MemoryRouter><AddBlog /></MemoryRouter>);

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test title' } });
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test description' } });
        fireEvent.change(screen.getByLabelText('ImageURL'), { target: { value: 'http://example.com/image.jpeg' } });

        jest.spyOn(axios, 'post').mockResolvedValue({ data: 'Test data' });


        fireEvent.click(screen.getByText('Submit'));

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8000/api/blog/add', {
            title: 'Test title',
            description: 'Test description',
            image: 'http://example.com/image.jpeg',
            user: localStorage.getItem('userId')
        });
    });

    test('fails with invalid URL', () => {
        render(<MemoryRouter><AddBlog /></MemoryRouter>);

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test title' } });
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test description' } });
        fireEvent.change(screen.getByLabelText('ImageURL'), { target: { value: 'invalid url' } });

        jest.spyOn(axios, 'post').mockRejectedValue(new Error('Network error: Something went wrong'));

        fireEvent.click(screen.getByText('Submit'));

        waitFor(() => {
            expect(console.log('"Invalid image URL"'));
        });
    });
});

describe('sendRequest', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mock function calls after each test
    });


    test('sends request with valid inputs', async () => {
        const mockData = 'Test data';
        axios.post.mockResolvedValueOnce({ data: mockData });

        // Mock localStorage.getItem
        Storage.prototype.getItem = jest.fn(() => 'mockUserId');

        const inputs = {
            title: 'Test title',
            description: 'Test description',
            imageURL: 'http://example.com/image.jpg',
        };

        const expectedRequestBody = {
            title: 'Test title',
            description: 'Test description',
            image: 'http://example.com/image.jpg',
            user: 'mockUserId',
        };

        const result = await sendRequest(inputs);

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8000/api/blog/add',
            expectedRequestBody
        );

        expect(result).toBe(mockData);
    });


    test('throws error with invalid image URL', async () => {
        const inputs = {
            title: 'Test title',
            description: 'Test description',
            imageURL: 'invalid url',
        };

        await expect(sendRequest(inputs)).rejects.toThrowError('Invalid image URL');

        expect(axios.post).not.toHaveBeenCalled();
    });
});

describe('UserBlogs', () => {
    it('fetches and displays user and blogs data', async () => {
        const fakeData = {
            user: {
                name: 'Test User',
                blogs: [
                    {
                        _id: '1',
                        title: 'Test Blog 1',
                        description: 'Test Description 1',
                        image: 'Test Image URL 1',
                    },
                    {
                        _id: '2',
                        title: 'Test Blog 2',
                        description: 'Test Description 2',
                        image: 'Test Image URL 2',
                    },
                ],
            },
        };

        // mock the axios.get function
        axios.get.mockResolvedValueOnce({ data: fakeData });

        const { getByText } = render(<MemoryRouter><UserBlogs /></MemoryRouter>);

        // Use the asynchronous version of waitFor to handle the promise and await the mock response
        await waitFor(() => getByText('Test Blog 1'));
        await waitFor(() => getByText('Test Blog 2'));

        // Check if the data is displayed
        expect(getByText('Test Blog 1')).toBeInTheDocument();
        expect(getByText('Test Blog 2')).toBeInTheDocument();
    });

    it('does not display blogs if there are none', async () => {
        const fakeData = {
            user: {
                name: 'Test User',
                blogs: [],
            },
        };

        // mock the axios.get function
        axios.get.mockResolvedValueOnce({ data: fakeData });

        const { queryByText } = render(<UserBlogs />);

        // Use the asynchronous version of waitFor to handle the promise and await the mock response
        await waitFor(() => queryByText('Test User'));

        // Check if no blogs are displayed
        expect(queryByText('Test Blog 1')).not.toBeInTheDocument();
        expect(queryByText('Test Blog 2')).not.toBeInTheDocument();
    });
});

const blogData = {
    blog: {
        title: 'Test Blog 1',
        description: 'Test Description 1',
    },
};

