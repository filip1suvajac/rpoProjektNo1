type Member = {
  id: number;
  name: string;
  surname: string;
  image: string; 
};

const teamMembers: Member[] = [
  { id: 1, name: "Filip", surname: "Suvajac", image: "/src/assets/team/slika3.jpeg" },
  { id: 2, name: "Enej", surname: "Kacijan", image: "/src/assets/team/slika4.jpeg" },
  { id: 3, name: "Niko", surname: "Ogrizek", image: "/src/assets/team/slika5.jpeg" },
  { id: 4, name: "Anastasija", surname: "Jakšić", image: "/src/assets/team/slika6.jpeg" },
  { id: 5, name: "Niko", surname: "Tomac", image: "/src/assets/team/slika7.jpeg" },
  { id: 6, name: "Anastasija", surname: "Lukarova", image: "/src/assets/team/slika8.png" },
  { id: 7, name: "Luka", surname: "Manfreda", image: "/src/assets/team/slika9.jpeg" },
  { id: 8, name: "Dragan", surname: "Tanchev", image: "/src/assets/team/slika2.png" },
  { id: 9, name: "Luka", surname: "Meklin", image: "/src/assets/team/slika2.png" },
  { id: 10, name: "Matija", surname: "Dukaric", image: "/src/assets/team/slika2.png" },
  { id: 11, name: "Teona", surname: "Mehandjiska", image: "/src/assets/team/slika1.jpeg" },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-[#1A2C38] text-white ">
      <div className="max-w-[80%] py-10 mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">Člani Skupine</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.map(member => (
          <div
            key={member.id}
            className="relative group bg-[#0F212E] rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={member.image}
              alt={`${member.name} ${member.surname}`}
              className="w-full h-60 object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-lg font-semibold">{member.name} {member.surname}</span>
            </div>
          </div>
        ))}
      </div>
    </div></div>
  );
}
