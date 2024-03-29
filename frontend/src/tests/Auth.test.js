import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Auth from '../components/Auth';
import { useNavigate } from "react-router-dom";


jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Auth', () => {
    let mockStore;
    beforeEach(() => {
        mockStore = {
            getState: () => ({ auth: {} }),
            dispatch: jest.fn(),
            subscribe: jest.fn(),
        };
    });

    it('updates the form values on change', () => {
        const { getByPlaceholderText } = render(
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Auth />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(getByPlaceholderText('Email'), {
            target: { value: 'test@test.com' },
        });
        fireEvent.change(getByPlaceholderText('Password'), {
            target: { value: 'password' },
        });

        expect(getByPlaceholderText('Email').value).toBe('test@test.com');
        expect(getByPlaceholderText('Password').value).toBe('password');
    });


    it('toggles between signup and login', () => {
        const { getByText } = render(
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Auth />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(getByText('Change to Signup'));
        expect(getByText('Signup')).toBeInTheDocument();
        expect(getByText('Change to Login')).toBeInTheDocument();

        fireEvent.click(getByText('Change to Login'));
        expect(getByText('Login')).toBeInTheDocument();
        expect(getByText('Change to Signup')).toBeInTheDocument();
    });

    it('makes a post request to the correct login endpoint on form submission', async () => {
        axios.post.mockResolvedValueOnce({ data: { user: { _id: '1234' } } });

        const { getByPlaceholderText, getByText } = render(
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Auth />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(getByPlaceholderText('Email'), {
            target: { value: 'test@test.com' },
        });
        fireEvent.change(getByPlaceholderText('Password'), {
            target: { value: 'password' },
        });

        fireEvent.click(getByText('Submit'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/user/login', {
                email: 'test@test.com',
                password: 'password',
            });
        });
    });

    it('makes a post request to the correct signup endpoint on form submission', async () => {
        axios.post.mockResolvedValueOnce({ data: { user: { _id: '1234' } } });

        const { getByPlaceholderText, getByText } = render(
            <Provider store={mockStore}>
                <BrowserRouter>
                    <Auth />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(getByText('Change to Signup'));

        fireEvent.change(getByPlaceholderText('Name'), {
            target: { value: 'tester' },
        });
        fireEvent.change(getByPlaceholderText('Email'), {
            target: { value: 'test@test.com' },
        });
        fireEvent.change(getByPlaceholderText('Password'), {
            target: { value: 'password' },
        });

        fireEvent.click(getByText('Submit'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/user/signup', {
                name: 'tester',
                email: 'test@test.com',
                password: 'password',
            });
        });
    });
});
