export const typeENUM = [
  { id: 1, text: "Mədən" },
  { id: 2, text: "Quyu" },
  { id: 3, text: "Park" }
]
export const AttestationType = [
  { id: 1, text: "İşçi" },
  { id: 2, text: "Nəqliyyat vasitəsi" },
]
export const FuelCategory = [
  { id: 1, text: "Dizel" },
  { id: 2, text: "Benzin" },
]

export const enumText = (list, id) => list.find((item) => item.id === id)?.text;
