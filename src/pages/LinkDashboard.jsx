import ProfileCard from "../components/ProfileCard";
import LinkButton from "../components/LinkButton";
import BookingSection from "../components/BookingSection";
import '../index.css';

export default function LinkDashboard(){
  // mock data for linktree part
  const studioLinks = [
    { id: 1, title: "Visit my website!", url: "#" },
    { id: 2, title: "Visit my Instagram page", url: "#" },
    { id: 3, title: "Visit my TikTok page", url: "#" },
    { id: 4, title: "WhatsApp me for more info!", url: "#" }
  ];

  const studioProfile = {
    name: "Studio Name",
    description: "A brief description of the studio."
  };

  // mock data for booking part
  const serviceOptions = [
    "Sports Photoshoot", 
    "wedding Photoshoot", 
    "Magazine Photobooth Rental"
  ];

  const timeSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]; // Maybe need buisness logic like linktree at backend

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-md">
        
        <ProfileCard 
          title={studioProfile.name}
          description={studioProfile.description}
        />

        <div className="mt-6">
          {studioLinks.map((link) => (
            <LinkButton 
              key={link.id}
              title={link.title}
              url={link.url}
            />
          ))}
        </div>

        <BookingSection 
          serviceOptions={serviceOptions}
          timeSlots={timeSlots}
        />

      </div>
    </div>
  )
}