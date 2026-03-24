import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BookingSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const timeSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

  // helper function to reset everything when closing the booking section
  const toggleBooking = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      // Reset everything when closing
      setDate(null);
      setTime(null);
      setName("");
      setEmail("");
      setIsBooked(false);
    }
  };

  return (
    // reset the booking section after clicking
    <div className="mt-6 bg-white p-4 rounded-xl shadow-sm border-2 border-green-200">
      <button 
        onClick={toggleBooking}
        className="w-full text-center font-bold text-green-800"
      >
        {isOpen ? "Close Booking" : "Book a Farm Tour"}
      </button>
      
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-green-100 flex flex-col items-center">
          
          {/* Hide the calendar and times if they are already booked */}
          {!isBooked && (
            <>
              <p className="text-sm text-gray-600 mb-3 text-center">
                Select a date to secure your fresh, local lettuce supply:
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

              {date && (
                <div className="w-full mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="text-sm font-medium text-center mb-3 text-green-800">
                    Available times for {date.toDateString()}:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
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

              {/* Contact Form - Only shows after picking a time */}
              {date && time && (
                <div className="mt-6 w-full animate-in fade-in zoom-in duration-300 space-y-4 text-left bg-green-50 p-4 rounded-xl border border-green-100">
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-green-900 font-semibold">Full Name</Label>
                    {/* CONTROLLED INPUT: value is tied to state, onChange updates the state */}
                    <Input 
                      id="name" 
                      placeholder="Your Name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}  // instantly update react state
                      className="bg-white border-green-200"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-green-900 font-semibold">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="bg-white border-green-200"
                    />
                  </div>

                  {/* button only works if name and email are NOT empty */}
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl mt-4"
                    disabled={name.trim() === "" || email.trim() === ""} // removes blank spaces
                    onClick={() => setIsBooked(true)}
                  >
                    Confirm Booking
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Success Screen after isBooked is true after clicking the button */}
          {isBooked && (
            <div className="w-full text-center py-8 animate-in zoom-in duration-500">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">You're all set, {name}!</h3>
              <p className="text-gray-600">
                We will see you on <span className="font-semibold text-green-800">{date.toDateString()}</span> at <span className="font-semibold text-green-800">{time}</span>.
              </p>
              <p className="text-sm text-gray-500 mt-4">A confirmation email has been sent to {email}.</p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}