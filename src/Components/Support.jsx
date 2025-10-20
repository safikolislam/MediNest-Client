import image from "../assets/close-up-doctor-with-stethoscope.jpg";

const Support = () => {
  return (
    
    <section data-aos="fade-up" data-aos-duration="1000" className=" py-20 px-6 md:px-20 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-green-700 leading-tight">
          Expert Healthcare Support 
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="zoom-in" data-aos-duration="1200">
            <img
              src={image}
              alt="Online Doctor Consultation"
              className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>

          <div className="text-gray-800">
            <p className="mb-8 text-lg md:text-xl leading-relaxed">
              At MedExCare, we go beyond medicine sales. Our platform provides
              you with access to expert advice from certified healthcare
              professionals. Whether you have questions about your medications,
              dosage, or health concerns, help is just a click away.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">&#10003;</span>
                <p className="text-gray-700 text-base md:text-lg">
                  <span className="font-semibold">24/7 Online Chat:</span> Connect with licensed pharmacists and doctors anytime, anywhere.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">&#10003;</span>
                <p className="text-gray-700 text-base md:text-lg">
                  <span className="font-semibold">Quick & Reliable Answers:</span> Submit your health queries and get fast, professional responses.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">&#10003;</span>
                <p className="text-gray-700 text-base md:text-lg">
                  <span className="font-semibold">Personalized Recommendations:</span> Receive custom medicine and wellness advice based on your profile.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-xl">&#10003;</span>
                <p className="text-gray-700 text-base md:text-lg">
                  <span className="font-semibold">Secure & Confidential:</span> All communication is encrypted to ensure your privacy.
                </p>
              </li>
            </ul>

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;



