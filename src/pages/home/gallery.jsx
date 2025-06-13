
export default function Gallery() {
  const images = [
    { id: 1, url: "https://zbsvsutfimwxtndxamge.supabase.co/storage/v1/object/public/gallery//gallery1.jpg", alt: "Studio Monitor" },
    { id: 2, url: "https://zbsvsutfimwxtndxamge.supabase.co/storage/v1/object/public/gallery//gallery2.jpg", alt: "Microphone Setup" },
    { id: 3, url: "https://zbsvsutfimwxtndxamge.supabase.co/storage/v1/object/public/gallery//gallery3.jpg", alt: "Audio Interface" },
    { id: 4, url: "https://zbsvsutfimwxtndxamge.supabase.co/storage/v1/object/public/gallery//gallery4.jpg", alt: "DJ Mixer" },
    { id: 5, url: "https://zbsvsutfimwxtndxamge.supabase.co/storage/v1/object/public/gallery//gallery5.jpg", alt: "Recording Setup" },
    { id: 6, url: "https://zbsvsutfimwxtndxamge.supabase.co/storage/v1/object/public/gallery//gallery6.jpg", alt: "Headphones" },
  ];

  return (
    <div className="min-h-screen bg-primary px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-accent mb-10">🎧</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((img) => (
          <div
            key={img.id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-200"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4 text-center text-gray-600 text-sm">{img.alt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery () {
    return(
        <div>
            <h1>Gallery</h1>        
        </div>
    )
}

