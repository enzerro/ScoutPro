export interface Player {
  id: string
  name: string
  age: number
  nationality: string
  nationalityFlag: string
  club: string
  clubLogo: string
  position: "forward" | "midfielder" | "defender" | "goalkeeper"
  height: number
  weight: number
  foot: "Left" | "Right" | "Both"
  contractUntil: string
  marketValue: string
  image: string
  stats: {
    pace: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
  }
  seasonStats: {
    appearances: number
    goals: number
    assists: number
    cleanSheets: number
    rating: number
  }
  history: {
    season: string
    club: string
    appearances: number
    goals: number
    assists: number
  }[]
}

export const defaultPlayers: Player[] = [
  {
    id: "1",
    name: "Lamine Yamal",
    age: 17,
    nationality: "Spain",
    nationalityFlag: "ES",
    club: "FC Barcelona",
    clubLogo: "BAR",
    position: "forward",
    height: 180,
    weight: 72,
    foot: "Left",
    contractUntil: "2030",
    marketValue: "180M",
    image: "/players/lamine-yamal.jpg",
    stats: { pace: 93, shooting: 78, passing: 82, dribbling: 90, defending: 32, physical: 62 },
    seasonStats: { appearances: 42, goals: 12, assists: 18, cleanSheets: 0, rating: 8.2 },
    history: [
      { season: "2024/25", club: "FC Barcelona", appearances: 42, goals: 12, assists: 18 },
      { season: "2023/24", club: "FC Barcelona", appearances: 50, goals: 7, assists: 10 },
    ],
  },
  {
    id: "2",
    name: "Jude Bellingham",
    age: 21,
    nationality: "England",
    nationalityFlag: "GB",
    club: "Real Madrid",
    clubLogo: "RMA",
    position: "midfielder",
    height: 186,
    weight: 78,
    foot: "Right",
    contractUntil: "2029",
    marketValue: "150M",
    image: "/players/jude-bellingham.jpg",
    stats: { pace: 78, shooting: 83, passing: 80, dribbling: 85, defending: 68, physical: 82 },
    seasonStats: { appearances: 38, goals: 19, assists: 8, cleanSheets: 0, rating: 8.0 },
    history: [
      { season: "2024/25", club: "Real Madrid", appearances: 38, goals: 19, assists: 8 },
      { season: "2023/24", club: "Real Madrid", appearances: 42, goals: 23, assists: 11 },
      { season: "2022/23", club: "Borussia Dortmund", appearances: 42, goals: 14, assists: 7 },
    ],
  },
  {
    id: "3",
    name: "Florian Wirtz",
    age: 21,
    nationality: "Germany",
    nationalityFlag: "DE",
    club: "Bayer Leverkusen",
    clubLogo: "LEV",
    position: "midfielder",
    height: 176,
    weight: 70,
    foot: "Right",
    contractUntil: "2027",
    marketValue: "130M",
    image: "/players/florian-wirtz.jpg",
    stats: { pace: 82, shooting: 80, passing: 87, dribbling: 89, defending: 42, physical: 64 },
    seasonStats: { appearances: 40, goals: 15, assists: 16, cleanSheets: 0, rating: 8.1 },
    history: [
      { season: "2024/25", club: "Bayer Leverkusen", appearances: 40, goals: 15, assists: 16 },
      { season: "2023/24", club: "Bayer Leverkusen", appearances: 49, goals: 18, assists: 20 },
    ],
  },
  {
    id: "4",
    name: "Erling Haaland",
    age: 24,
    nationality: "Norway",
    nationalityFlag: "NO",
    club: "Manchester City",
    clubLogo: "MCI",
    position: "forward",
    height: 194,
    weight: 88,
    foot: "Left",
    contractUntil: "2034",
    marketValue: "200M",
    image: "/players/erling-haaland.jpg",
    stats: { pace: 89, shooting: 94, passing: 65, dribbling: 80, defending: 45, physical: 88 },
    seasonStats: { appearances: 36, goals: 28, assists: 5, cleanSheets: 0, rating: 8.3 },
    history: [
      { season: "2024/25", club: "Manchester City", appearances: 36, goals: 28, assists: 5 },
      { season: "2023/24", club: "Manchester City", appearances: 31, goals: 27, assists: 5 },
      { season: "2022/23", club: "Manchester City", appearances: 35, goals: 36, assists: 8 },
    ],
  },
  {
    id: "5",
    name: "Gavi",
    age: 20,
    nationality: "Spain",
    nationalityFlag: "ES",
    club: "FC Barcelona",
    clubLogo: "BAR",
    position: "midfielder",
    height: 173,
    weight: 68,
    foot: "Right",
    contractUntil: "2030",
    marketValue: "90M",
    image: "/players/gavi.jpg",
    stats: { pace: 76, shooting: 68, passing: 84, dribbling: 83, defending: 72, physical: 74 },
    seasonStats: { appearances: 28, goals: 5, assists: 9, cleanSheets: 0, rating: 7.5 },
    history: [
      { season: "2024/25", club: "FC Barcelona", appearances: 28, goals: 5, assists: 9 },
      { season: "2023/24", club: "FC Barcelona", appearances: 15, goals: 2, assists: 4 },
    ],
  },
  {
    id: "6",
    name: "William Saliba",
    age: 23,
    nationality: "France",
    nationalityFlag: "FR",
    club: "Arsenal",
    clubLogo: "ARS",
    position: "defender",
    height: 192,
    weight: 85,
    foot: "Right",
    contractUntil: "2028",
    marketValue: "110M",
    image: "/players/william-saliba.jpg",
    stats: { pace: 78, shooting: 38, passing: 68, dribbling: 62, defending: 88, physical: 84 },
    seasonStats: { appearances: 35, goals: 2, assists: 1, cleanSheets: 14, rating: 7.8 },
    history: [
      { season: "2024/25", club: "Arsenal", appearances: 35, goals: 2, assists: 1 },
      { season: "2023/24", club: "Arsenal", appearances: 38, goals: 3, assists: 1 },
    ],
  },
  {
    id: "7",
    name: "Jamal Musiala",
    age: 21,
    nationality: "Germany",
    nationalityFlag: "DE",
    club: "Bayern Munich",
    clubLogo: "BAY",
    position: "midfielder",
    height: 183,
    weight: 72,
    foot: "Both",
    contractUntil: "2029",
    marketValue: "120M",
    image: "/players/jamal-musiala.jpg",
    stats: { pace: 81, shooting: 78, passing: 82, dribbling: 91, defending: 38, physical: 66 },
    seasonStats: { appearances: 41, goals: 14, assists: 11, cleanSheets: 0, rating: 7.9 },
    history: [
      { season: "2024/25", club: "Bayern Munich", appearances: 41, goals: 14, assists: 11 },
      { season: "2023/24", club: "Bayern Munich", appearances: 38, goals: 12, assists: 8 },
    ],
  },
  {
    id: "8",
    name: "Giorgi Mamardashvili",
    age: 23,
    nationality: "Georgia",
    nationalityFlag: "GE",
    club: "Liverpool",
    clubLogo: "LIV",
    position: "goalkeeper",
    height: 197,
    weight: 90,
    foot: "Right",
    contractUntil: "2030",
    marketValue: "45M",
    image: "/players/giorgi-mamardashvili.jpg",
    stats: { pace: 42, shooting: 18, passing: 55, dribbling: 28, defending: 22, physical: 78 },
    seasonStats: { appearances: 30, goals: 0, assists: 1, cleanSheets: 12, rating: 7.4 },
    history: [
      { season: "2024/25", club: "Liverpool", appearances: 30, goals: 0, assists: 1 },
      { season: "2023/24", club: "Valencia", appearances: 37, goals: 0, assists: 0 },
    ],
  },
  {
    id: "9",
    name: "Alejandro Garnacho",
    age: 20,
    nationality: "Argentina",
    nationalityFlag: "AR",
    club: "Napoli",
    clubLogo: "NAP",
    position: "forward",
    height: 180,
    weight: 72,
    foot: "Left",
    contractUntil: "2029",
    marketValue: "60M",
    image: "/players/alejandro-garnacho.jpg",
    stats: { pace: 90, shooting: 74, passing: 68, dribbling: 84, defending: 34, physical: 68 },
    seasonStats: { appearances: 32, goals: 9, assists: 7, cleanSheets: 0, rating: 7.2 },
    history: [
      { season: "2024/25", club: "Napoli", appearances: 32, goals: 9, assists: 7 },
      { season: "2023/24", club: "Manchester United", appearances: 50, goals: 10, assists: 5 },
    ],
  },
  {
    id: "10",
    name: "Josko Gvardiol",
    age: 22,
    nationality: "Croatia",
    nationalityFlag: "HR",
    club: "Manchester City",
    clubLogo: "MCI",
    position: "defender",
    height: 185,
    weight: 82,
    foot: "Left",
    contractUntil: "2029",
    marketValue: "85M",
    image: "/players/josko-gvardiol.jpg",
    stats: { pace: 80, shooting: 52, passing: 72, dribbling: 70, defending: 84, physical: 82 },
    seasonStats: { appearances: 38, goals: 5, assists: 3, cleanSheets: 10, rating: 7.3 },
    history: [
      { season: "2024/25", club: "Manchester City", appearances: 38, goals: 5, assists: 3 },
      { season: "2023/24", club: "Manchester City", appearances: 47, goals: 7, assists: 1 },
    ],
  },
  {
    id: "11",
    name: "Bukayo Saka",
    age: 23,
    nationality: "England",
    nationalityFlag: "GB",
    club: "Arsenal",
    clubLogo: "ARS",
    position: "forward",
    height: 178,
    weight: 72,
    foot: "Left",
    contractUntil: "2028",
    marketValue: "140M",
    image: "/players/bukayo-saka.jpg",
    stats: { pace: 86, shooting: 82, passing: 83, dribbling: 87, defending: 52, physical: 70 },
    seasonStats: { appearances: 34, goals: 14, assists: 12, cleanSheets: 0, rating: 8.0 },
    history: [
      { season: "2024/25", club: "Arsenal", appearances: 34, goals: 14, assists: 12 },
      { season: "2023/24", club: "Arsenal", appearances: 47, goals: 20, assists: 14 },
    ],
  },
  {
    id: "12",
    name: "Pedri",
    age: 22,
    nationality: "Spain",
    nationalityFlag: "ES",
    club: "FC Barcelona",
    clubLogo: "BAR",
    position: "midfielder",
    height: 174,
    weight: 63,
    foot: "Right",
    contractUntil: "2030",
    marketValue: "100M",
    image: "/players/pedri.jpg",
    stats: { pace: 72, shooting: 68, passing: 90, dribbling: 88, defending: 64, physical: 60 },
    seasonStats: { appearances: 36, goals: 6, assists: 10, cleanSheets: 0, rating: 7.8 },
    history: [
      { season: "2024/25", club: "FC Barcelona", appearances: 36, goals: 6, assists: 10 },
      { season: "2023/24", club: "FC Barcelona", appearances: 24, goals: 3, assists: 5 },
    ],
  },
]
