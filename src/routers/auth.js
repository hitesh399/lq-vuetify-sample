import Login from '@/views/Auth'
import ForgotPassword from '@/views/Auth/ForgotPassword'
import ResetPassword from '@/views/Auth/ResetPassword'
import VerifyEmailOrMobile from '@/views/Auth/Verify'
import OTPVerify from '@/views/Auth/Verify/Otp'
import Parent from '@/views/ParentRouteView'

export const AuthRoutes = [
    {
        path: '/',
        name: 'login',
        title: 'Login',
        component: Login,
        hidden: true,
        meta: { isPublic: true },
    },
    {
        path: 'forgot-password',
        name: 'forgotpassword',
        title: 'Forgot Password',
        component: ForgotPassword,
        hidden: true,
        meta: { isPublic: true },
    },
    {
        path: 'reset-password',
        name: 'resetpassword',
        title: 'ResetPassword',
        component: ResetPassword,
        hidden: true,
        meta: { isPublic: true }
    },
    {
        path: 'verify',
        title: 'Email or Mobile verification',
        component: Parent,
        hidden: true,
        children: [
            {
                path: '/',
                name: 'verify.email_or_mobile',
                hidden: true,
                meta: { heading: 'Email or Mobile Verification', isPublic: true },
                component: VerifyEmailOrMobile,
            },
            {
                path: 'otp',
                name: 'verify.otp',
                hidden: true,
                meta: { heading: 'OTP or Email link Verify', isPublic: true },
                component: OTPVerify
            }
        ]
    }
]