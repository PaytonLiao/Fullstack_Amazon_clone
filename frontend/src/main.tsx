import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import "./index.css"
import App from "./App.tsx"
import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from "./pages/HomePage.tsx"
import ProductPage from "./pages/ProductPage.tsx"
import { HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { StoreProvider } from "./Stores.tsx"
import CartPage from "./pages/CartPage.tsx"
import SigninPage from "./pages/SigninPage.tsx"
import SignupPage from "./pages/SignupPage.tsx"
import ShippingAddressPage from "./pages/ShippingAddressPage.tsx"
import PaymentMethodPage from "./pages/PaymentMethodPage.tsx"
import ProtectedRouter from "./components/ProtectedRoute.tsx"
import PlaceOrderPage from "./pages/PlaceOrderPage.tsx"
import OrderPage from "./pages/OrderPage.tsx"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import OrderHistoryPage from "./pages/OrderHistoryPage.tsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="" element={<ProtectedRouter />}>
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="order/:id" element={<OrderPage />} />
        <Route path="orderhistory" element={<OrderHistoryPage />} />
      </Route>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
    </Route>
  )
)

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <PayPalScriptProvider
        options={{
          clientId:
            "ARIUWoYy4StblvLHRPao1fdNFHY1fdqmsxgt5s6U2UASxdVo16czqozw0Qm5i3CyRbuswiQUEP_7_QnI",
        }}
        deferLoading={true}
      >
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </StrictMode>
)
