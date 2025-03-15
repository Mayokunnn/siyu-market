import { Link } from "react-router-dom";

const PaymentSuccess = () => {
    return (
        <div className="p-4 w-full h-full flex flex-col gap-3 items-center justify-content">
          <h1 className="text-4xl font-bold">Payment Successful!</h1>
          <p>Thank you for your purchase.</p>
          <Link to={"/"} className="p-3 bg-blue-700 rounded text-white font-semibold">Go Home</Link>
        </div>
      );
}

export default PaymentSuccess;