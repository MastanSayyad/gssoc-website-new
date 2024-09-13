import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const PopupBanner = ({ onClose }) => {
  const [selectedTimer, setSelectedTimer] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [timeLeft, setTimeLeft] = useState({
    ca: { hours: "00", minutes: "00", seconds: "00", days: "0" },
    paandmentor: { hours: "00", minutes: "00", seconds: "00", days: "0" },
    contributor: { hours: "00", minutes: "00", seconds: "00", days: "0" },
  });
  const [currentEvent, setCurrentEvent] = useState("Campus Ambassador");
  
  const timerDigits = [
    ...selectedTimer.hours.split(""),
    ...selectedTimer.minutes.split(""),
    ...selectedTimer.seconds.split(""),
  ];
  
  const calculateTimeLeft = (target) => {
    const now = new Date();
    const distance = target - now;
    
    if (distance < 0) return { hours: "00", minutes: "00", seconds: "00", days: "0" };
    
    const totalDays = String(Math.floor(distance / (1000 * 60 * 60 * 24)));
    const totalHours = String(
      Math.floor(distance / (1000 * 60 * 60))
    ).padStart(2, "0");
    const minutes = String(
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    const seconds = String(
      Math.floor((distance % (1000 * 60)) / 1000)
    ).padStart(2, "0");

    return { hours: totalHours, minutes, seconds, days: totalDays };
  };
  
  useEffect(() => {
    const targetDates = {
      ca: new Date(2024, 8, 13, 18, 0, 0),
      paandmentor: new Date(2024, 8, 14, 18, 0, 0),
      contributor: new Date(2024, 8, 15, 18, 0, 0),
    };
  
    const interval = setInterval(() => {
      const now = new Date();
  
      const caTimeLeft = calculateTimeLeft(targetDates.ca);
      const paAndMentorTimeLeft = calculateTimeLeft(targetDates.paandmentor);
      const contributorTimeLeft = calculateTimeLeft(targetDates.contributor);
  
      setTimeLeft({
        ca: caTimeLeft,
        paandmentor: paAndMentorTimeLeft,
        contributor: contributorTimeLeft,
      });
  
      if (targetDates.ca - now > 0) {
        setSelectedTimer(caTimeLeft);
        setCurrentEvent("Campus Ambassador");
      }
      else if (targetDates.paandmentor - now > 0) {
        setSelectedTimer(paAndMentorTimeLeft);
        setCurrentEvent("Project Admin & Mentor");
      } 
      else if (targetDates.contributor - now > 0) {
        setSelectedTimer(contributorTimeLeft);
        setCurrentEvent("Contributor");
      } 
      else {
        setCurrentEvent("Registrations Open");
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg relative shadow-lg text-center animate-fadeIn">
        <Image 
          src="/favicon.ico" 
          layout="fill" 
          objectFit="cover" 
          alt="GSSOC Logo" 
          className="opacity-10 clip-sharp-rotated"
          draggable="false"
        />
        <button onClick={onClose} className="absolute top-2 right-6 text-gray-500 hover:text-gray-800 h-7 w-7 text-2xl">
          &times;
        </button>
        <div>
          {currentEvent === "Registrations Open" ? (
            <h1 className="text-4xl font-normal text-center text-[#f57d33] max-[400px] mt-20 mb-16 w-full max-w-3xl m-auto">
            Registrations are now open 🎉
            <div className="flex justify-center items-center mt-8">
              <Link href="/registration">
                <a className="bg-[#f57d33] text-white px-6 py-2 rounded-lg text-xl font-bold">
                  Visit here
                </a>
              </Link>
            </div>
          </h1>) : 
          (
          <h1 className="text-2xl font-normal text-center max-[400px] mt-10 mb-16 w-full max-w-3xl m-auto">
            <h1 className="text-4xl font-bold text-[#f57d33] mb-8">GSSoC&apos;24 Extended is here!</h1>
            <span className="font-bold text-[#f57d33]">
              Are you excited?
            </span>{" "}
            The countdown to become a{" "}
            <span className="font-bold text-[#f57d33]">
              {currentEvent}
            </span>{" "}
            with us has started!
          </h1>
          )}
          <div className="flex gap-6 max-sm:gap-3 max-sm:mt-20 items-center">
            {timerDigits.map((digit, index) => (
              <div className="flex flex-col justify-center items-center gap-3" key={index}>
                <div className="flex justify-center items-center gap-4">
                  <div className="relative">
                    <div className="bg-[#f57d33] w-24 h-24 max-sm:w-12 max-sm:h-12 max-[400px]:h-10 max-[400px]:w-10 border-[#f57d33] z-20 border-2 rounded-xl flex items-center justify-center"></div>
                    <div className="bg-white absolute bottom-2 right-2 z-10 w-24 h-24 max-sm:w-12 max-sm:h-12 max-[400px]:h-10 max-[400px]:w-10 border-[#f57d33] border-2 rounded-xl">
                      <span className="text-black text-2xl max-sm:font-semibold font-bold flex justify-center items-center h-full">
                        {digit}
                      </span>
                    </div>
                  </div>
                  {index % 2 !== 0 && index !== timerDigits.length - 1 && (
                    <div className="flex flex-col gap-4">
                      <div className="bg-[#f57d33] w-4 h-4 max-sm:w-2 max-sm:h-2 rounded-full"></div>
                      <div className="bg-[#f57d33] w-4 h-4 max-sm:w-2 max-sm:h-2 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center flex justify-around items-center w-full mt-6 max-w-3xl m-auto font-normal text-[#676767] text-2xl">
            <span>Hours</span>
            <span>Mins</span>
            <span>Seconds</span>
          </div>
          <div className="mt-10">
          {selectedTimer.days > 0 ? (
            <div className="flex justify-center items-center">
              <Link href="/registration">
                <a className="bg-[#f57d33] text-white px-6 py-2 rounded-lg text-xl font-bold">
                  Register here
                </a>
              </Link>
            </div>
          ) : null}
          </div>
          <div className="mt-8">
            {timeLeft.paandmentor.days > 0 ? (
              <p className="text-gray-500">
              Days left for Project Admin & Mentor registration: {timeLeft.paandmentor.days}
            </p>
              ) : 
              null
            }
            {timeLeft.contributor.days > 0 ? (
              <p className="text-gray-500">
              Days left for Contributor registration: {timeLeft.contributor.days}
            </p>
            ) : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupBanner;