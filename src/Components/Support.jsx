import image from "../assets/close-up-doctor-with-stethoscope.jpg";

const Support = () => {
  return (
    <section data-aos="zoom-in" data-aos-duration="6000" className="healthcare-support-section bg-white min-h-screen flex items-center justify-center px-6 md:px-20">
      <div className="max-w-7xl w-full">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-500">
          Expert Healthcare Support & Easy Consultations
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src={image}
              alt="Online Consultation"
              className="w-full h-110 rounded shadow-lg"
            />
          </div>

          <div className="text-gray-700">
            <p className="mb-6 text-lg">
              At MedExCare, we go beyond medicine sales. Our platform provides
              you with access to expert advice from certified healthcare
              professionals. Whether you have questions about your medications,
              dosage, or health concerns, help is just a click away.
            </p>

            <ul className="list-disc list-inside space-y-3 mb-6">
              <li>24/7 online chat with licensed pharmacists and doctors</li>
              <li>Submit your health queries and get quick, reliable answers</li>
              <li>
                Get personalized medicine recommendations based on your profile
              </li>
              <li>
                Secure and confidential communication for your peace of mind
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;



