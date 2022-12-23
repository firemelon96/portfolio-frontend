import React from "react";

function ErrorPage() {
  return (
    <div>
      <div className="h-screen flex items-center justify-center bg-primary">
        <div className="flex gap-4 text-6xl text-semibold">
          <h1 className="text-tertiary">404</h1>
          <h1 className="text-fourth">Page Not found</h1>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
