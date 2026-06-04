import { ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const steps = [
  {
    label: "BAG",
    path: "/checkout/bag",
  },
  {
    label: "PAYMENT",
    path: "/checkout/payment",
  },
];

const CheckoutHeader = () => {
  const location = useLocation();

  const currentStep = steps.findIndex(
    (step) => location.pathname === step.path
  );

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-wide"
        >
          SAVANA
        </Link>

        {/* Steps */}
        <div className="hidden md:flex items-center gap-6">
          {steps.map((step, index) => (
            <div
              key={step.label}
              className="flex items-center"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`
                    text-sm
                    font-semibold
                    tracking-wider
                    ${
                      index <= currentStep
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  `}
                >
                  {step.label}
                </span>

                <div
                  className={`
                    mt-2
                    h-[2px]
                    w-16
                    ${
                      index <= currentStep
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }
                  `}
                />
              </div>

              {index !== steps.length - 1 && (
                <div className="w-12 h-[2px] bg-gray-300 mx-3 mt-1" />
              )}
            </div>
          ))}
        </div>

        {/* Secure */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <ShieldCheck
            size={18}
            className="text-green-600"
          />
          <span className="uppercase tracking-wider">
            100% Secure
          </span>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;