import { RouterModule } from '@angular/router';
import { fireEvent, render, screen } from '@testing-library/angular';
import { AppRoutingModule } from './../../app-routing.module';
import { GithubComponent } from './../github/github.component';
import { HeaderComponent } from './header.component';
describe('HeaderComponent', () => {

    beforeEach(async () => {
        await render(HeaderComponent, {
            declarations: [
                GithubComponent
            ],
            imports: [
                AppRoutingModule,
                RouterModule
            ]
        });
    });

    describe('when user not logged', () => {
        it('should show button Login Github', async () => {
            expect(screen.getByText('Login Github'));
        });

        it('should open github window when click in button login', () => {
            window.open = jest.fn();
            fireEvent.click(screen.getByText('Login Github'));
            expect(window.open).toBeCalled();

        });

        it(('shouldnt show avatar image'), () => {
            const containerImg = document.querySelector('#user-avatar');
            expect(containerImg).toBeNull();
        });

        it(('shouldnt show user name'), () => {
            expect(screen.queryByText('User Fake')).toBeNull();
        });

    });

    describe('when user logged', () => {

        beforeAll(async () => {
            const userFake = {
                username: 'User Fake',
                avatar: 'https://avatar-fake.png',
                id: 'id-fake'
            };
            localStorage.setItem('userInfo', JSON.stringify(userFake));

        });

        it('shouldnt show button Login Github', () => {
            expect(screen.queryByText('Login Github')).toBeNull();
        });

        it('should show name user', () => {
            expect(screen.getByText('User Fake'));
        });

        it('should show avatar image', () => {
            const containerImg = document.querySelector('#user-avatar');
            expect(containerImg.getAttribute('src')).toEqual('https://avatar-fake.png');
        });

    });


});
