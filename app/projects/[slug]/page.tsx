import React, { Suspense } from "react";
import Link from "next/link";
import Footer from "../../components/Footer";
import ProjectVideoPlayer from "../../components/ProjectVideoPlayer";
import ProjectHero from "../../components/ProjectHero";

// Allow blocking route for Next.js 16 Partial Prefetching / PPR
export const instant = false;

interface Collaborator {
  role: string;
  name: string;
}

interface ProjectDetail {
  id: string;
  title: string;
  displayTitle?: string;
  location: string;
  area: string;
  dateCompleted: string;
  collaborators: Collaborator[];
  heroImage: string;
  paragraphs: string[];
  youtubeId: string;
}

const PROJECT_DETAILS_DATABASE: Record<string, ProjectDetail> = {
  "base-eleven": {
    id: "base-eleven",
    title: "Base Eleven\nConvention Center",
    displayTitle: "Base Eleven Convention Center",
    location: "Pala, Kottayam",
    area: "75,000 sq.ft",
    dateCompleted: "2024",
    collaborators: [
      { role: "Architecture", name: "Mindscape Architects" },
      { role: "Structural Engineer", name: "Felix Varkeykunju" },
      { role: "Lighting", name: "Spaces Lighting" },
    ],
    heroImage: "/live-projects/base-eleven-4k.png",
    paragraphs: [
      "The Base Eleven Convention Centre in Pala, Kottayam, stands as a modern architectural landmark, thoughtfully designed to elevate event experiences. Spanning 75,000 square feet, the venue seamlessly blends contemporary design with traditional influences, offering a versatile space for corporate meetings, cultural programs, and grand celebrations.",
      "The architecture is defined by its flowing, curved forms and intricate parametric elements, creating a striking visual presence. A well-planned central courtyard serves as a focal point, linking different spaces effortlessly while providing an open area for guests to interact.",
      'One of the most distinctive aspects of the project is the integration of an ancestral home, the "Tharavadu." This traditional Kerala-style house, constructed with wooden structures and a clay-tiled roof, has been carefully restored and incorporated into the overall design. The surrounding nutmeg plantation has been transformed into a scenic event space, enriching the setting with cultural significance.',
      "The convention centre offers 11 main event spaces, including three large halls, a banquet hall, and a boardroom. The largest hall accommodates up to 1,300 guests, making it suitable for large-scale gatherings, while smaller halls cater to more intimate events. The outdoor spaces are equally well-considered, featuring an amphitheater with multiple levels, a pavilion, and meticulously landscaped lawns.",
      "Architectural details such as the curved ACP roof borders and parametric design elements enhance the centre's contemporary yet contextually relevant appeal. The design achieves a careful balance between modern infrastructure, accessibility, and cultural sensitivity, resulting in a space that is both functional and visually compelling.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "ojas-24": {
    id: "ojas-24",
    title: "OJAS 24",
    displayTitle: "OJAS 24",
    location: "Shoolagiri, Tamil Nadu",
    area: "3,470 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Earth & Debris Architects" },
      { role: "Structural Engineer", name: "Native Foundations" },
      { role: "Landscape", name: "Grove Studio" },
    ],
    heroImage: "/live-projects/ojas-24-hd.jpg",
    paragraphs: [
      "Inside a 3,470 sq.ft Weekend Home Built from Earth and Debris nestled within a mango grove, where architecture and landscape grow as one.",
      "Designed as an eco-conscious retreat, OJAS 24 blends rammed earth techniques with salvaged stone masonry, creating thermal comfort amidst Shoolagiri's tropical climate.",
      "The layout prioritizes passive ventilation with courtyards that frame ancient mango trees, allowing living spaces to seamlessly dissolve into the surrounding topography.",
    ],
    youtubeId: "PHgGsJIZ4V4",
  },
  "the-palagiri-house": {
    id: "the-palagiri-house",
    title: "The Palagiri House",
    displayTitle: "The Palagiri House",
    location: "Kochi, Kerala",
    area: "9,000 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Studio Tropical" },
      { role: "Structural Engineer", name: "Apex Consultants" },
      { role: "Interiors", name: "Curated Living" },
    ],
    heroImage: "/live-projects/the-palagiri-house-hd.png",
    paragraphs: [
      "A 9,000 Sq. Ft. Urban Tropical Residence in Kochi built in just 18 months, redefining density and green living.",
      "The residence employs cantilevered balconies, vertical timber louvers, and cascading greenery that shields interior sanctuaries from harsh sunlight while maintaining deep connections to nature.",
    ],
    youtubeId: "go-M-I1bcRI",
  },
  "the-skewed-house": {
    id: "the-skewed-house",
    title: "The Skewed House",
    displayTitle: "The Skewed House",
    location: "Palakkad, Kerala",
    area: "3,861 Sq. Ft.",
    dateCompleted: "2014",
    collaborators: [
      { role: "Architecture", name: "LIJO RENY Architects" },
      { role: "Structural Engineer", name: "Design Spectrum" },
    ],
    heroImage: "/live-projects/the-skewed-house-hd.png",
    paragraphs: [
      "A 3,861 Sq. Ft. Home that still defines contemporary tropical living in Palakkad.",
      "Skewed volumetric geometry breaks conventional symmetry, capturing winds while directing visual lines toward lush internal landscaped courts.",
    ],
    youtubeId: "_-rdxmVObTc",
  },
  "the-observatory": {
    id: "the-observatory",
    title: "The Observatory",
    location: "Nilgiris, Tamil Nadu",
    area: "3,000 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Hillscape Architects" },
      { role: "Structural Engineer", name: "Ridge Engineering" },
    ],
    heroImage: "/live-projects/the-observatory-hd.png",
    paragraphs: [
      "Inside a 3,000 Sqft Conservatory Home in Nilgiris Where the Hill Meets the Heart.",
      "Framing misty hillside vistas through expansive glazing, The Observatory embraces sloping terrain with stone terraces and cozy pitched timber roofs.",
    ],
    youtubeId: "4hyK0dt2feI",
  },
  "robusta-ranch": {
    id: "robusta-ranch",
    title: "Robusta Ranch",
    location: "Yercaud, Tamil Nadu",
    area: "9,000 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Estate Design Studio" },
      { role: "Structural Engineer", name: "Hilltop Structures" },
    ],
    heroImage: "/live-projects/robusta-ranch-hd.png",
    paragraphs: [
      "Inside a 9,000 Sq. Ft. Ranch Crafted for Luxury Living at Yercaud's Most Iconic Estate.",
      "A seamless blend of horse stables, riders' clubhouse, and luxury residential hospitality, constructed using locally quarried stone and exposed steel trusses.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "kaizen": {
    id: "kaizen",
    title: "Kaizen",
    location: "Kochi, Kerala",
    area: "2,280 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Urban Density Lab" },
      { role: "Structural Engineer", name: "Kochi Structural Works" },
    ],
    heroImage: "/live-projects/kaizen-hd.png",
    paragraphs: [
      "Inside a 4-Cent Corner Plot Home in Kochi Where Design Embraces Density.",
      "An exercise in efficient spatial planning, Kaizen maximizes natural daylight through a three-story central light well while maintaining absolute urban privacy.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "whispers-of-the-wild": {
    id: "whispers-of-the-wild",
    title: "Whispers of the Wild",
    location: "Yercaud, Tamil Nadu",
    area: "2,400 Sq. Ft.",
    dateCompleted: "2022",
    collaborators: [
      { role: "Architecture", name: "Nature Blended Studios" },
      { role: "Structural Engineer", name: "Timber & Stone" },
    ],
    heroImage: "/live-projects/whispers-of-the-wild-hd.png",
    paragraphs: [
      "Inside a 2,400 Sq.ft. Nature-Blended Weekend Home in the Hills of Yercaud, Tamil Nadu.",
      "Designed as a family sanctuary, this mountain retreat weaves living quarters around existing fruit trees with minimal excavation.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "into-the-wild": {
    id: "into-the-wild",
    title: "Into The Wild",
    location: "Mettupalayam, Tamil Nadu",
    area: "1,450 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Fold Architecture" },
      { role: "Structural Engineer", name: "Sustainable Vaults" },
    ],
    heroImage: "/live-projects/into-the-wild-hd.png",
    paragraphs: [
      "Inside 1,450 Sq.Ft Self-Sustaining Home in the Wild of Tamil Nadu, Built Without Columns.",
      "Utilizing catenary brick vaults and solar-powered off-grid living systems, this farmhouse achieves structural purity and zero-carbon resilience.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "square-foot": {
    id: "square-foot",
    title: "Square Foot",
    location: "Bangalore, Karnataka",
    area: "6,000 Sq. Ft.",
    dateCompleted: "2024",
    collaborators: [
      { role: "Architecture", name: "Spatial Experience Co." },
      { role: "Lighting", name: "Lumen Design Studio" },
    ],
    heroImage: "/live-projects/square-foot-hd.png",
    paragraphs: [
      "Inside 6,000 Sq. Ft. Square Foot's Home-Like Experience Center in Bengaluru.",
      "Transforming commercial retail into a warm, domestic exploration of textures, wood floorings, and curated architectural mockups.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "elsas-farmhouse": {
    id: "elsas-farmhouse",
    title: "Elsa’s FarmHouse",
    location: "Thrissur, Kerala",
    area: "1,950 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Rustic Atelier" },
      { role: "Interiors", name: "Provencal Living" },
    ],
    heroImage: "/live-projects/elsas-farmhouse-hd.png",
    paragraphs: [
      "A 2,000 Sqft. French Farmhouse-Inspired Apartment in Thrissur.",
      "Sage green cabinetry, exposed wooden beams, and handcrafted terracotta details introduce timeless pastoral European warmth into a suburban Kerala residence.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "blr-brewing-co": {
    id: "blr-brewing-co",
    title: "BLR Brewing Co.",
    location: "Whitefield, Bangalore",
    area: "40,000 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Brewscape Architects" },
      { role: "Landscape", name: "Botanical Spaces" },
    ],
    heroImage: "/live-projects/blr-brewing-co-hd.png",
    paragraphs: [
      "BLR Brewing Co., Bengaluru: A 40,000 Sq.Ft. Restaurant & Brewpub Designed Around Nature.",
      "Centered on koi ponds, water cascades, and lush tropical foliage, this microbrewery crafts an immersive open-air oasis within the bustling tech corridor.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "the-crimped-roof-house": {
    id: "the-crimped-roof-house",
    title: "The Crimped Roof House",
    location: "Kottayam, Kerala",
    area: "6,800 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Origami Studio" },
      { role: "Structural Engineer", name: "Valley Engineering" },
    ],
    heroImage: "/live-projects/the-crimped-roof-house-hd.png",
    paragraphs: [
      "A Contemporary Family Home Embracing Generational Living - The Crimped Roof House.",
      "An origami-like folded roof profile deflects heavy monsoon rains while shaping dynamic double-height volumes in the communal living core.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "ameer-residence": {
    id: "ameer-residence",
    title: "Ameer Residence",
    location: "Vadakara, Kerala",
    area: "7,000 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Minimalism Studio" },
      { role: "Structural Engineer", name: "Coastal Engineering" },
    ],
    heroImage: "/live-projects/ameer-residence-hd.png",
    paragraphs: [
      "Inside 7,000 Sq.Ft Contemporary Home Where Tradition Meets Modern Minimalism.",
      "Laterite stone elements and slatted screens establish privacy from the coastal highway while framing tranquil garden patios.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "house-of-bushra": {
    id: "house-of-bushra",
    title: "House of Bushra",
    location: "Kasaragod, Kerala",
    area: "9,810 Sq. Ft.",
    dateCompleted: "2024",
    collaborators: [
      { role: "Architecture", name: "Heritage Contemporary" },
      { role: "Landscape", name: "Verdant Design" },
    ],
    heroImage: "/live-projects/house-of-bushra-hd.png",
    paragraphs: [
      "Inside 8,500 Sqft Family Home Where Architecture Meets Landscape in Kerala.",
      "Extending along a gentle hill slope, multiple pavilions connect via open verandas, ensuring multi-generational comfort and abundant natural cross-breezes.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "zikr": {
    id: "zikr",
    title: "ZIKR",
    location: "Palakkad, Kerala",
    area: "3,683 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Quiet Spaces Studio" },
      { role: "Structural Engineer", name: "Palakkad Structures" },
    ],
    heroImage: "/live-projects/zikr-hd.png",
    paragraphs: [
      "A 3,600 sq.ft. Courtyard Home in Palakkad Blending Kerala Tradition with Modern Comfort.",
      "Clean white geometry and a central pool court create an oasis of tranquility amidst the intense heat of the Palakkad gap.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "bemerii": {
    id: "bemerii",
    title: "Bemerii - Concept Store",
    location: "Kochi, Kerala",
    area: "780 Sq. Ft.",
    dateCompleted: "2024",
    collaborators: [
      { role: "Architecture", name: "Cubist Design Lab" },
      { role: "Lighting", name: "Neon & Shadow" },
    ],
    heroImage: "/live-projects/bemerii-hd.png",
    paragraphs: [
      "Bemerii's cafe transforms 2.5 cents into a bold, modular Cubist space redefining ice cream retail design.",
      "Stainless steel modules, sculptural counters, and raw concrete finishes produce an unexpected, artistic culinary atmosphere.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
  "the-box-house": {
    id: "the-box-house",
    title: "The Box House",
    location: "Kochi, Kerala",
    area: "9,500 Sq. Ft.",
    dateCompleted: "2023",
    collaborators: [
      { role: "Architecture", name: "Geometric Living" },
      { role: "Structural Engineer", name: "Urban Frame Consultants" },
    ],
    heroImage: "/live-projects/the-box-house-hd.png",
    paragraphs: [
      "The Box House is located in a busy residential area in Edappally, Kerala. Its name comes from the rectangular shapes used in the design.",
      "Stacked cubic geometries create sheltered courtyards and deep shadow lines, establishing an insulated, serene microclimate within an urban neighborhood.",
    ],
    youtubeId: "6vXEY3sTzS4",
  },
};

export function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS_DATABASE).map((slug) => ({ slug }));
}

async function ProjectDetailsContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Match or fallback to Base Eleven
  const project =
    PROJECT_DETAILS_DATABASE[slug] ||
    PROJECT_DETAILS_DATABASE["base-eleven"];

  return (
    <div className="min-h-screen bg-white text-black font-['Helvetica_Neue',Helvetica,Arial,sans-serif] selection:bg-[#34C25C] selection:text-black">
      {/* ---------------- SECTION 1: DRAMATIC 140VH HERO WITH SCROLL ZOOM EFFECT ---------------- */}
      <ProjectHero
        title={project.title}
        displayTitle={project.displayTitle}
        heroImage={project.heroImage}
        location={project.location}
        area={project.area}
        dateCompleted={project.dateCompleted}
        collaborators={project.collaborators}
        hasBakedInOverlay={false}
      />

      {/* ---------------- BREADCRUMB / BACK NAV ---------------- */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-2">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-medium text-neutral-500 hover:text-black transition-colors group cursor-pointer"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* ---------------- SECTION 2: EDITORIAL ARCHITECTURAL STORY ---------------- */}
      <section className="py-16 sm:py-24 px-6 sm:px-10">
        <div className="max-w-[840px] mx-auto">
          <div className="space-y-7 sm:space-y-9 text-[16px] sm:text-[18px] md:text-[18.5px] text-neutral-800 leading-[1.8] sm:leading-[1.85] font-normal tracking-[-0.005em]">
            {project.paragraphs.map((p, idx) => (
              <p key={idx} className="text-justify sm:text-left">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: YOUTUBE VIDEO SECTION WITH GENEROUS BREATHING ROOM ---------------- */}
      {project.youtubeId && (
        <section className="max-w-[1000px] mx-auto px-6 sm:px-10 pb-28 sm:pb-40">
          <div className="w-full">
            <ProjectVideoPlayer
              youtubeId={project.youtubeId}
              title={project.title}
            />
          </div>
        </section>
      )}

      {/* ---------------- SITE FOOTER ---------------- */}
      <Footer />
    </div>
  );
}

export default function SingleProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        </div>
      }
    >
      <ProjectDetailsContent params={params} />
    </Suspense>
  );
}
