import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center text-white">
      <div className="text-center mt-16">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Simon
        </h1>
        <p className="mt-4 text-2xl">Do What Simon Says...</p>
      </div>
      <div className="mt-12 text-center space-y-2 text-xl">
        <p>Follow the pattern of lights and sounds</p>
        <p>for as long as you can...if you can!</p>
      </div>
      <div className="mt-16">
        <Link
          href="/game"
          className="inline-block px-12 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-full text-xl shadow-lg hover:shadow-xl transition duration-300"
        >
          ::Play::
        </Link>
      </div>
    </div>
  );
}
