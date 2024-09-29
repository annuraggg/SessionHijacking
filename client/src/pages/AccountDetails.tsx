import { Edit } from "lucide-react";
import { useState } from "react";
import {
  FaUser,
  FaCreditCard,
  FaEnvelope,
  FaPhone,
  FaChartLine,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

interface User {
  username: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  branch: {
    branchName: string;
    branchCode: string;
    address: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  transactions: {
    transactionId: string;
    date: string;
    description: string;
    type: string;
    amount: number;
  }[];
}

const AccountDetails = ({
  user,
  setSignedIn,
}: {
  user: User;
  setSignedIn: (signedIn: boolean) => void;
}) => {
  const [showBalance, setShowBalance] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [email, setEmail] = useState(user.contact.email);
  const [phone, setPhone] = useState(user.contact.phone);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const logout = () => {
    localStorage.removeItem("sessionId");
    setSignedIn(false);
  };

  const saveContact = () => {
    setEditOpen(false);
    const userCopy = { ...user };
    userCopy.contact.email = email;
    userCopy.contact.phone = phone;

    axios
      .post("http://localhost:5000/auth/update-contact", { user: userCopy })
      .then(() => {
        toast.success("Contact updated successfully");
      })
      .catch((err) => {
        toast.error("Failed to update contact");
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <header className="bg-blue-800 text-white p-4">
          <h1 className="text-2xl font-semibold">Bhai Ka Bank</h1>
          <p className="text-sm">Welcome, {user.username}</p>
        </header>

        <nav className="bg-gray-200 p-4">
          <ul className="flex space-x-4 text-sm">
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Account Summary
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Fund Transfer
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Bill Payments
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Fixed Deposits
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Credit Cards
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-red-600 hover:underline"
                onClick={logout}
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>

        <main className="p-6">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold text-gray-600 mb-2">
                  Account Details
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <FaCreditCard className="mr-2 text-blue-600" />
                    <span className="font-medium">Account Number:</span>
                    <span className="ml-2">{user.accountNumber}</span>
                  </li>
                  <li className="flex items-center">
                    <FaUser className="mr-2 text-blue-600" />
                    <span className="font-medium">Account Type:</span>
                    <span className="ml-2">{user.accountType}</span>
                  </li>
                  <li className="flex items-center">
                    <FaChartLine className="mr-2 text-blue-600" />
                    <span className="font-medium">Balance:</span>
                    <span className="ml-2 relative">
                      {showBalance ? (
                        formatCurrency(user.balance)
                      ) : (
                        <span className="blur-sm select-none">
                          {formatCurrency(999999.99)}
                        </span>
                      )}
                      <button
                        className="ml-2 text-xs text-blue-600 hover:underline"
                        onClick={() => setShowBalance(!showBalance)}
                      >
                        {showBalance ? "Hide" : "Show"}
                      </button>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold text-gray-600 mb-2">
                  Branch Information
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">Branch Name:</span>{" "}
                    {user.branch.branchName}
                  </li>
                  <li>
                    <span className="font-medium">Branch Code:</span>{" "}
                    {user.branch.branchCode}
                  </li>
                  <li>
                    <span className="font-medium">Address:</span>{" "}
                    {user.branch.address}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Recent Transactions
            </h2>
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {user.transactions.map((transaction) => (
                  <tr key={transaction.transactionId} className="border-b">
                    <td className="p-2">{formatDate(transaction.date)}</td>
                    <td className="p-2">{transaction.description}</td>
                    <td className="p-2">{transaction.type}</td>
                    <td
                      className={`p-2 text-right ${
                        transaction.type === "Credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-right">
              <a href="#" className="text-blue-600 hover:underline text-sm">
                View All Transactions
              </a>
            </div>
          </section>

          <section>
            <div className="flex gap-3 items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Contact Information
              </h2>
              <Edit
                size={16}
                className="hover:text-lime-700 transition-colors cursor-pointer"
                onClick={() => setEditOpen(true)}
              />
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-600" />
                <span className="font-medium">Email:</span>
                <span
                  className="ml-2"
                  dangerouslySetInnerHTML={{ __html: user.contact.email }}
                ></span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-blue-600" />
                <span className="font-medium">Phone:</span>
                <span className="ml-2">{user.contact.phone}</span>
              </li>
            </ul>
          </section>
        </main>

        <footer className="bg-gray-200 p-4 text-center text-sm text-gray-600">
          <p>&copy; 2024 Bhai Ka Bank. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-600 hover:underline mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-600 hover:underline mx-2">
              Terms of Service
            </a>
            <a href="#" className="text-blue-600 hover:underline mx-2">
              Contact Us
            </a>
          </div>
        </footer>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>
              Update your email and phone number.
              <br />
              <br />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-4 mt-5 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-300 mt-4"
                onClick={saveContact}
              >
                Update
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountDetails;
