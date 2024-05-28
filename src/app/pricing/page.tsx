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
            <h2 className="text-xl font-semibold mb-4">Free</h2>
            <p className="text-gray-700 mb-4">For small side projects</p>
            <ul className="text-gray-600">
              <li>5 PDFs per month</li>
              <li>5 pages per pdf</li>
              <li>4MB size limit</li>
            </ul>
          </div>

          {/* Pricing Column 2 */}
          <div className="bg-white rounded-lg shadow-md p-8 mx-4 border border-purple-600">
            <h2 className="text-xl font-semibold mb-4">Enterprise</h2>
            <p className="text-gray-700 mb-4">For Institutions and Organizations</p>
            <ul className="text-gray-600">
              <li>Unlimited PDFs uploads</li>
              <li>Unlimited pages per PDF</li>
              <li>500MB size limit</li>
            </ul>
          </div>

          {/* Pricing Column 3 */}
          <div className="bg-white rounded-lg shadow-md p-8 ml-4 border border-purple-600">
            <h2 className="text-xl font-semibold mb-4">Professional</h2>
            <p className="text-gray-700 mb-4">For study and Research</p>
            <ul className="text-gray-600">
              <li>50 PDFs per month</li>
              <li>25 pages per pdf</li>
              <li>16MB size limit</li>
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
