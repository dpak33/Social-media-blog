import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Auth from '../components/Auth';

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

    it('makes a post request to the correct endpoint on form submission', async () => {
        axios.post.mockResolvedValueOnce({ data: {} });

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


});
