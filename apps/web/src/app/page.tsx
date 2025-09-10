import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto py-12">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            AI Auction Platform
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience the future of auctions with AI-powered digital humans hosting live streams
          </p>
        </div>

        <div className="text-center">
          <div className="space-x-4">
            <Link 
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Sign In
            </Link>
            <Link 
              href="/signup"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Current Auctions</h2>
          <div className="text-center text-gray-500">
            <p>Loading auction sessions...</p>
            <p className="mt-4">
              <Link href="/admin" className="text-primary hover:underline">
                Admin Dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}