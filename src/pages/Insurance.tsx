
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, FileCheck, Bell } from "lucide-react";

const Insurance = () => {
  const policies = [
    {
      id: 1,
      name: "Family Health Insurance",
      status: "Active",
      premium: "$299/month",
      nextPayment: "2025-05-15",
      coverage: "$500,000",
    },
    {
      id: 2,
      name: "Dental Coverage",
      status: "Active",
      premium: "$49/month",
      nextPayment: "2025-05-01",
      coverage: "$25,000",
    },
  ];

  const claims = [
    {
      id: 1,
      date: "2025-03-15",
      type: "Hospital Stay",
      amount: "$5,000",
      status: "Approved",
    },
    {
      id: 2,
      date: "2025-02-28",
      type: "Prescription",
      amount: "$150",
      status: "Processing",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Insurance Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your insurance policies and claims
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Active Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div
                    key={policy.id}
                    className="p-4 border rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{policy.name}</h3>
                      <span className="text-green-500 font-medium">
                        {policy.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Premium: {policy.premium}</p>
                      <p>Coverage: {policy.coverage}</p>
                      <p>Next Payment: {policy.nextPayment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Recent Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claims.map((claim) => (
                  <div
                    key={claim.id}
                    className="p-4 border rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{claim.type}</h3>
                      <span
                        className={`font-medium ${
                          claim.status === "Approved"
                            ? "text-green-500"
                            : "text-orange-500"
                        }`}
                      >
                        {claim.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Date: {claim.date}</p>
                      <p>Amount: {claim.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
