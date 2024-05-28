import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { checkSubscription } from "@/lib/subscription";
import Link from "next/link";
import React from "react";

const PricingPage = () => {
  // Authenticate the user
  const authenticateUser = async () => {
    const { userId } = await auth();
    if (!userId) {
      redirect("/sign-in");
    }
    return userId;
  };

  // Check subscription status
  const checkProSubscription = async () => {
    const isPro = await checkSubscription();
    return isPro;
  };

  // Render pricing information based on subscription status
  const renderPricingInfo = async () => {
    const userId = await authenticateUser();
    const isPro = await checkProSubscription();

    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold mb-4">Choose a Plan</h1>
          <p className="text-lg text-gray-700">
            Select the plan that best fits your needs and unlock premium features.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Pricing Column 1 */}
          <div className="bg-white rounded-lg shadow-md p-8 mr-4 border border-purple-600">
            <h2 className="text-xl font-semibold mb-4">Basic Plan</h2>
            <p className="text-gray-700 mb-4">Access to essential features</p>
            <ul className="text-gray-600">
              <li>Chat with PDF</li>
              <li>Limited PDF uploads</li>
              <li>Standard support</li>
            </ul>
          </div>

          {/* Pricing Column 2 */}
          <div className="bg-white rounded-lg shadow-md p-8 mx-4 border border-purple-600">
            <h2 className="text-xl font-semibold mb-4">Pro Plan</h2>
            <p className="text-gray-700 mb-4">Unlock advanced features</p>
            <ul className="text-gray-600">
              <li>Chat with PDF</li>
              <li>Unlimited PDF uploads</li>
              <li>Priority support</li>
            </ul>
          </div>

          {/* Pricing Column 3 */}
          <div className="bg-white rounded-lg shadow-md p-8 ml-4 border border-purple-600">
            <h2 className="text-xl font-semibold mb-4">Enterprise Plan</h2>
            <p className="text-gray-700 mb-4">Tailored solutions for teams</p>
            <ul className="text-gray-600">
              <li>Chat with PDF</li>
              <li>Customizable features</li>
              <li>Dedicated account manager</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 flex justify-center items-center">
      <div className="max-w-3xl">{renderPricingInfo()}</div>
    </div>
  );
};

export default PricingPage;
