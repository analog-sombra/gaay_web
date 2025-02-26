export default function Hero() {
  return (
    <section className="bg-green-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to the GAAY App Portal
        </h1>
        <p className="text-xl mb-8">
          Empowering farmers and revolutionizing cattle management
        </p>
        <div className="w-4/6 aspect-video mx-auto">
          <iframe
            src="https://www.youtube.com/embed/7VPXppeYYj8"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
