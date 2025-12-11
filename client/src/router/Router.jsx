import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dash/Dashboard";
import Main from "../layout/Main/Main";
import RequestOrganizer from "../pages/RequestOrganizer/RequestOrganizer";
import About from "../pages/about/About";
import Events from "../pages/allEvents/Events";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Booking from "../pages/bookings/Booking";
import Contact from "../pages/contact/Contact";
import CustomEvent from "../pages/customEvent/CustomEvent";
import DashboardHome from "../pages/dashboard/Home/DashboardHome";
import OrganizerRequest from "../pages/dashboard/OrganizerRequest/OrganizerRequest";
import DashboardAdminHome from "../pages/dashboard/admin/Home/DashboardAdminHome";
import AddEvent from "../pages/dashboard/admin/events/AddEvent";
import UpdateEvent from "../pages/dashboard/admin/events/UpdateEvent";
import Settings from "../pages/dashboard/admin/settings/Settings";
import Profile from "../pages/dashboard/profile/Profile";
import ErrorPage from "../pages/error/ErrorPage";
import EventDetails from "../pages/eventDetails/EventDetails";
import Home from "../pages/home/Home";
import PaymentPage from "../pages/payment/PaymentPage";
import Portfolio from "../pages/portfolio/Portfolio";
import Schedule from "../pages/schedule/Schedule";
import Shop from "../pages/shop/Shop";
import Cart from "../pages/dashboard/userDashboard/cart/cart";
import UserBookings from "../pages/dashboard/userDashboard/userBookings/UserBookings";
import Wishlist from "../pages/dashboard/userDashboard/wishlist/Wishlist";
import AllEvents from "../pages/dashboard/admin/events/AllEvents";
import AllUsers from "../pages/dashboard/admin/users/AllUsers";
import EditUser from "../pages/dashboard/admin/users/EditUser";
import MyCart from "../pages/shop/MyCart";
import AddProduct from "../pages/dashboard/admin/shop/AddProduct";
import AllProducts from "../pages/dashboard/admin/shop/AllProducts";
import ShopOrders from "../pages/dashboard/admin/shop/ShopOrders";
import CustomEventDashboard from "../pages/dashboard/CustomEvent/CustomEventDashboard";
import CustomEventBooking from "../pages/dashboard/userDashboard/CustomEventBook/CustomEventBooking";
import PaymentHistory from "../pages/dashboard/userDashboard/payment/PaymentHistory";
import Mails from "../pages/dashboard/admin/mails/Mails";
import CustomEventUser from "../pages/dashboard/CustomEvent/CustomEventUser";
import BookedTickets from "../pages/dashboard/admin/events/BookedTickets";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFail from "../pages/payment/PaymentFail";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/booking", element: <Booking /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/portfolio", element: <Portfolio /> },
      { path: "/schedule", element: <Schedule /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/events", element: <Events /> },
      { path: "/event-details/:_id", element: <EventDetails /> },
      { path: "/shop", element: <Shop /> },
      { path: "/create-your-event", element: <CustomEvent /> },
      { path: "/payment/:_id", element: <PaymentPage /> },
      { path: "/payment/success/:tranId", element: <PaymentSuccess /> },
      { path: "/payment/fail/:transId", element: <PaymentFail /> },
      { path: "/request-organizer", element: <RequestOrganizer /> },
      { path: "/my-cart", element: <MyCart /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "/dashboard/user", element: <DashboardHome /> },
      { path: "/dashboard/custom-event-booking", element: <CustomEventBooking /> },
      {
        path: "add-event",
        element: <AddEvent />,
      },
      {
        path: "edit-event/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:8080/event/${params.id}`),
        element: <UpdateEvent />,
      },
      { path: "settings", element: <Settings /> },
      { path: "profile", element: <Profile /> },
      { path: "organizer-request", element: <OrganizerRequest /> },
      { path: "custom-event-request", element: <CustomEventDashboard /> },
      { path: "admin", element: <DashboardAdminHome /> },
      { path: "wishList", element: <Wishlist /> },
      { path: "customEvent", element: <CustomEventUser /> },
      { path: "my-bookings", element: <UserBookings /> },
      { path: "payment-history", element: <PaymentHistory /> },
      { path: "cart", element: <Cart /> },
      { path: "all-users", element: <AllUsers /> },
      {
        path: "edit-user/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:8080/user/${params.id}`, {
            method: "POST",
          }),
        element: <EditUser />,
      },
      { path: "events", element: <AllEvents /> },
      { path: "booked-tickets", element: <BookedTickets /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "products", element: <AllProducts /> },
      { path: "product-orders", element: <ShopOrders /> },
      { path: "all-mails", element: <Mails /> },
    ],
  },
]);

export default Router;
