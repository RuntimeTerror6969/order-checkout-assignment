export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
          404 Error
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Invalid Merchant ID received
        </p>
        <div className="mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please check the URL or contact support
          </p>
        </div>
      </div>
    </div>
  );
}
