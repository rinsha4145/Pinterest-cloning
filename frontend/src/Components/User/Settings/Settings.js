import React from "react";
import { Outlet, Link } from "react-router-dom";

function Settings() {

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-1/4 p-6">
        <ul className="space-y-4">
          <li>
            <Link
              to="/settings/editprofile"
              className="text-gray-700 hover:text-blue-500"
            >
              Edit profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings/account-settings"
              className="text-gray-700 hover:text-blue-500"
            >
              Account management
            </Link>
          </li>
          <li>
            <Link to="" className="text-gray-700 hover:text-blue-500">
              Profile visibility
            </Link>
          </li>
          <li>
            <Link to="" className="text-gray-700 hover:text-blue-500">
              Tune your home feed
            </Link>
          </li>
          <li>
            <Link to="" className="text-gray-700 hover:text-blue-500">
              Claimed accounts
            </Link>
          </li>
          <li>
            <Link to="" className="text-gray-700 hover:text-blue-500">
              Social permissions
            </Link>
          </li>
          <li>
            <Link to="" className="text-gray-700 hover:text-blue-500">
              Notifications
            </Link>
          </li>
          <li>
            <Link to="" className="text-gray-700 hover:text-blue-500">
              Privacy and data
            </Link>
          </li>
          <li>
            <Link to="" className="text-gray-700 hover:text-blue-500">
              Security
            </Link>
          </li>
          <li>
            <Link to="" className="text-gray-700 hover:text-blue-500">
              Branded Content
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* The <Outlet> renders the nested routes' content */}
        <Outlet />
      </main>
    </div>
  );
}

export default Settings;
