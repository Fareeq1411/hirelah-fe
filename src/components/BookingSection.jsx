import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BookingSection({serviceOptions, timeSlots}) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState(null);  
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  // Helper function to reset all booking states when closing the booking section
  const toggleBooking = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setService(null);
      setDate(null);
      setTime(null);
      setName("");
      setEmail("");
      setIsBooked(false);
    }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow-sm border-2 border-green-200">
      <button 
        onClick={toggleBooking}
        className="w-full text-center font-bold text-green-800"
      >
        {isOpen ? "Close Booking" : "Book with Us"}
      </button>
      
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-green-100 flex flex-col items-center">
          
          {!isBooked && (
            <>
              {/* CHOOSE service */}
              <div className="w-full mb-6 animate-in fade-in duration-300">
                <p className="text-sm text-gray-600 mb-3 text-center">
                  What would you like to book?
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {serviceOptions.map((option) => (
                    <Button
                      key={option}
                      variant={service === option ? "default" : "outline"}
                      className={service === option ? "bg-green-700 hover:bg-green-800" : "text-green-800 border-green-200 hover:bg-green-50"}
                      onClick={() => {
                        setService(option);
                        // resets date and time if user changes service after already selecting them (ensures they go through the flow again to prevent mismatched bookings)
                        setDate(null);
                        setTime(null);
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* CHOOSE at date in calendar (Only shows if a service is selected) */}
              {service && (
                <div className="w-full flex flex-col items-center animate-in slide-in-from-top-4 fade-in duration-300">
                  <p className="text-sm font-medium text-center mb-3 text-green-800 border-t border-green-100 pt-4 w-full">
                    Select a date for your {service}:
                  </p>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      setTime(null); 
                    }}
                    className="rounded-md border border-green-100 bg-white shadow-sm"
                  />
                </div>
              )}

              {/* CHOOSE Time Slots */}
              {date && (
                <div className="w-full mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="text-sm font-medium text-center mb-3 text-green-800">
                    Available times for {date.toDateString()}:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={time === slot ? "default" : "outline"}
                        className={time === slot ? "bg-green-700 hover:bg-green-800" : "text-green-800 border-green-200 hover:bg-green-50"}
                        onClick={() => setTime(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* contact information */}
              {date && time && (
                <div className="mt-6 w-full animate-in fade-in zoom-in duration-300 space-y-4 text-left bg-green-50 p-4 rounded-xl border border-green-100">
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-green-900 font-semibold">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Jane Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="bg-white border-green-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-green-900 font-semibold">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="jane@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="bg-white border-green-200"
                    />
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl mt-4"
                    disabled={name.trim() === "" || email.trim() === ""}
                    onClick={() => setIsBooked(true)}
                  >
                    Confirm Booking
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Success Screen */}
          {isBooked && (
            <div className="w-full text-center py-8 animate-in zoom-in duration-500">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">You're all set, {name}!</h3>
              <p className="text-gray-600">
                Your <span className="font-semibold text-green-800">{service}</span> is booked for <span className="font-semibold text-green-800">{date.toDateString()}</span> at <span className="font-semibold text-green-800">{time}</span>.
              </p>
              <p className="text-sm text-gray-500 mt-4">A confirmation email has been sent to {email}.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}