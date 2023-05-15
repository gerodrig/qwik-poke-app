import { component$ } from '@builder.io/qwik';
import {Form, routeAction$, zod$, z} from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$((data, {cookie, redirect})=> {
    const {email, password} = data;

    //Typeorm Prisma
    if(email !== '' && password !== '') {
        cookie.set('jwt', 'dfsasfdlfasdjk', {secure: true, path: '/dashboard'});
        
        redirect(302, '/');
        return {
            success: true,
            message: 'Login success',
            jwt: 'dfsasfdlfasdjk'
        }
    }

}, zod$({
    email: z.string().email('Not valid format email'),
    password: z.string().min(6, 'Password must be at least 6 characters')
}));

export default component$(() => {

    const action = useLoginUserAction();

    return (
        <Form action={action} class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 mt-5">
        <div class="relative">
            <input class="mb-3 focus:placeholder-transparent placeholder-gray-200 h-10 w-full border-b-2 border-gray-300 text-gray-600 focus:outline-none focus:border-red-400 transition-all" name="email" type="text" placeholder="Email address" />
            <label class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm" for="email">Email Address</label>
        </div>
        <div class="relative">
            <input class="mb-3 focus:placeholder-transparent placeholder-gray-200 h-10 w-full border-b-2 border-gray-300 text-gray-600 focus:outline-none focus:border-red-400 transition-all" id="password" name="password" type="password" placeholder="Password" />
            <label class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm" for="password">Password</label>
        </div>
        <div class="relative">
            <button class="bg-red-500 text-white rounded-md px-2 py-1 w-full hover:bg-red-700 transition-all">Log in</button>
        </div>


        <code class="block whitespace-pre overflow-scroll text-sm w-80">
            { JSON.stringify( action.value, undefined , 2 ) }
        </code>
    </Form>
    );
});

// .not-valid {
//     @apply border-red-500 text-red-400;
// }