import ProfileCard from "./components/ProfileCard";
import LinkButton from "./components/LinkButton";
import BookingSection from "./components/BookingSection";

function App() {
  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <ProfileCard />

        <div className="mt-6">
          <LinkButton title="Our Farming Methods" url="#" />
          <LinkButton title="Wholesale Orders" url="#" />
          <LinkButton title="Contact the Farm" url="#" />
          <LinkButton title="Add us on Instagram" url="#" />
        </div>

        <BookingSection />

      </div>
    </div>
  )
}

export default App