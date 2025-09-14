import React, { useRef, useState, useEffect } from 'react';
import Images1 from '../assets/images4.png';
import Images2 from '../assets/Images_side_views.PNG';
import Images3 from '../assets/images_side.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import '../index.css';

// ✅ Import Chatbot
import SupportBot from "../components/SupportBot";

const Hero = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const [showBot, setShowBot] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ✅ Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down → show bot
        setShowBot(true);
      } else {
        // scrolling up → hide bot
        setShowBot(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const imageList = [Images1, Images2, Images3];

  return (
    <>
      {/* Swiper Section */}
      <div className="bg-gray-500">
        <div className="mx-auto w-full relative">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
          >
            {imageList.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Slide ${index + 1}`} width="100%" />
              </SwiperSlide>
            ))}

            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20" />
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </div>
        {/* Backdrop blur bar */}
        <div className="wrapper w-full h-8 bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 absolute -bottom-12" />
      </div>

      {/* Malayalam Introduction */}
      <div>
        <p className="px-4 py-12 text-lg text-justify font-noto">
          കോട്ടയം ജില്ലയ്ക്കാകെ അഭിമാനം പകരുന്ന സാങ്കേതിക വിദ്യാഭ്യാസ സ്ഥാപനമായ ഗവൺമെൻറ് ടെക്നിക്കൽ ഹൈസ്കൂൾ പാലാ 1961-ലാണ് സ്ഥാപിതമായത്. മീനച്ചിലാറിന്റെ തീരത്ത് മുത്തോലി ഗ്രാമപഞ്ചായത്ത് അഞ്ചാം വാർഡിൽ ആരെയും ആകർഷിക്കുന്ന രീതിയിൽ പൂഞ്ഞാർ ഏറ്റുമാനൂർ സ്റ്റേറ്റ് ഹൈവേയ്ക്ക് സമീപം തലയുയർത്തി നിൽക്കുന്ന വിദ്യാലയമാണ് Govt. THS, Pala. പ്രകൃതിരമണീയത തുളുമ്പി നിൽക്കുന്ന വിശാലമായ ക്യാമ്പസ് ആണ് ഈ സ്കൂളിൽ ഉള്ളത്.
        </p>
      </div>

      {/* Introduction Section */}
      <div className="mt-4">
        <h1 className="text-4xl font-bold text-center mb-6">Introduction</h1>

        {/* Local Video Display */}
        <div className="flex justify-center px-4 mt-4">
          <div className="relative w-full max-w-[1600px] rounded-2xl border-[6px] border-indigo-500 shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden">
            <video
              className="w-full h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] object-cover"
              src="/videos/intro.mp4"
              autoPlay
              muted
              loop
              controls
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="mt-14">
        <h1 className="text-4xl font-bold text-center">About US</h1>
        <p className="px-4 py-4 text-lg text-justify">
          Government Technical High School Pala, a technical educational institution that brings pride to the entire Kottayam district, was established in 1961. Govt. THS, Pala is a school that stands tall and attractively on the banks of Meenachilar, near the Poonjar-Ettumanoor State Highway in the 5th ward of Mutholi Grama Panchayat. The school has a spacious campus surrounded by natural beauty.
        </p>

        {/* Extracurricular Activities */}
        <h2 className="px-4 py-2 font-bold text-lg md:text-2xl underline">Extracurricular Activities</h2>
        <p className="px-4 py-6 text-lg text-justify">
          Pala Govt. THS organizes a very attractive exhibition, which is part of the application of technology, at regular intervals. This exhibition, which introduces the students' creations and various machine operations to the common people, other students and teachers, will lead the students into the vast world of technology by holding their hands. More than a thousand students from various schools in Kottayam district came to watch the TECHNICAL EXPO named "Mikav". The exhibition became a proclamation of the enviable progress achieved by the students of Pala THS in technology. Boys and girls who have passed the 7th standard can apply for admission to the 8th standard. A maximum of 105 students will be admitted to the 8th standard. If applications are received above 105, admission will be given on the basis of the 7th standard entrance examination. The children here participate in the state sports festival and art festival.
        </p>

        {/* Physical Facilities */}
        <h2 className="px-4 py-2 font-bold text-lg md:text-2xl underline">Physical Facilities</h2>
        <p className="px-4 py-6 text-lg text-justify">
          Currently, 213 students are studying in this school in seven branches. The workshop equipped with modern machinery ensures excellent job training for the students. The school has a large, fully air-conditioned computer lab. A spacious library with thousands of books will further instill the reading habit of the students. The list of school facilities is long, such as an open library, an auditorium, a spacious playground, etc., which are completely managed by the students to make the most of even the short time during the study breaks.
        </p>

        {/* Management Section */}
        <h2 className="px-4 py-2 font-bold text-lg md:text-2xl underline">Management</h2>
        <div className="border-t border-gray-600 pt-4">
          <p className="px-4 py-6 text-lg">It is operated under the Department of Technology, Government of Kerala.</p>
        </div>

        {/* Guide Section */}
        <h2 className="px-4 py-2 font-bold text-lg md:text-2xl underline">Guide</h2>
        <div className="border-t border-gray-600 pt-4 px-4">
          <p className="mb-4 text-lg">Visit us at:</p>
          <p className="text-gray-700 mb-4 py-3">
            Mutholi, Puliyannur P.O., 686573, Kottayam District, Kerala, India
          </p>

          <div className="w-auto h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Govt. THS Pala Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.8382611411756!2d76.69699917550943!3d9.71121897732775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0623a2b1fd1f09%3A0x7b3a4a94bdfb46f4!2sGovernment%20Technical%20High%20School%2C%20Pala!5e0!3m2!1sen!2sin!4v1692973192297!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* ✅ Floating Chatbot with scroll hide/show */}
      {showBot && (
        <div className="fixed bottom-4 right-4 z-50 transition-opacity duration-300">
          <SupportBot />
        </div>
      )}
    </>
  );
};

export default Hero;
