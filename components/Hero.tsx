import { Search } from "lucide-react"

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Find Your Perfect Rental Property</h1>
        <p className="text-lg md:text-xl mb-8 text-primary-foreground/80">
          Thousands of properties for rent in your area
        </p>
        <div className="max-w-2xl mx-auto">
          <form className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <input
              type="text"
              placeholder="Enter city, neighborhood, or address"
              className="flex-grow px-4 py-3 rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-accent text-foreground w-full"
            />
            <button
              type="submit"
              className="bg-accent text-accent-foreground px-6 py-3 rounded-md sm:rounded-l-none hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent flex items-center justify-center transition-colors w-full sm:w-auto"
            >
              <Search className="mr-2" />
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

