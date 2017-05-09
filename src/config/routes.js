import Public from '../public/PublicWrapper';
import Amount from '../public/Amount';
import PaymentMethod from '../public/PaymentMethod';
import PersonalInfo from '../public/PersonalInfo';
import Review from '../public/Review';
import Success from '../public/Success';

const routes = [
  {
    path: '/',
    component: Public,
    routes: [
      {
        path: '/amount',
        component: Amount,
      },
      {
        path: '/personal-info',
        component: PersonalInfo,
      },
      {
        path: '/payment-method',
        component: PaymentMethod,
      },
      {
        path: '/review',
        component: Review,
      },
      {
        path: '/success',
        component: Success,
      }
    ]
  }
];

export default routes;
